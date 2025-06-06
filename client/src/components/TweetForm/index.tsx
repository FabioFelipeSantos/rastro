import { type FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "@mui/icons-material";

import * as S from "./styles";
import { tweetFormSchema, type TTweetForm, defaultTweetForm } from "../../schema/tweetFormSchema";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { tokenFromState } from "../../store/reducers/user/authSlice";
import { addTweet } from "../../store/reducers/tweetSlice";
import { useAddRetweetMutation, useAddTweetMutation } from "../../services/tweetApiSlice";
import { getBio } from "../../store/reducers/user/bioSlice";
import { TextArea } from "../form/TextArea";
import { ErrorMessage } from "../form/ErrorMessage";
import { IconButton } from "../IconButton";
import { getImageUrl } from "../../utils/getImageUrl";
import { executeMutation } from "../../utils/apiResponse";
import { openModal } from "../../store/reducers/modalSlice";
import { useNavigate } from "react-router-dom";
import { avatarPath } from "../../utils/getAvatarUrlPath";
import type { Tweet } from "../../types/tweet";

type TweetFormProps = {
  parentTweetId?: number;
  onSubmitSuccess?: (tweet: Tweet) => void;
  isSubmitting?: boolean;
  setIsSubmitting?: (isSubmitting: boolean) => void;
  placeholder?: string;
};

export const TweetForm: FC<TweetFormProps> = ({
  parentTweetId,
  onSubmitSuccess,
  isSubmitting = false,
  setIsSubmitting,
  placeholder = "O que está acontecendo?!",
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TTweetForm>({
    resolver: zodResolver(tweetFormSchema),
    defaultValues: defaultTweetForm,
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector(tokenFromState);
  const [addReTweet] = useAddRetweetMutation();
  const [addTweetToServer] = useAddTweetMutation();
  const userBio = useAppSelector(getBio);

  const onSubmit: SubmitHandler<TTweetForm> = async (data) => {
    if (!token) {
      dispatch(
        openModal({
          title: "Login",
          content: "Usuário não logado. Faça o login",
        }),
      );
      navigate("/login");
      return;
    }

    if (setIsSubmitting) {
      setIsSubmitting(true);
    }

    try {
      const newTweetText = data.text.trim();

      const payload = {
        newTweet: {
          text: newTweetText,
        },
        token: token,
      };

      let newTweet: Tweet;
      if (!parentTweetId) {
        newTweet = await executeMutation(addTweetToServer, payload);
      } else {
        const retweetPayload = {
          ...payload,
          tweetId: parentTweetId,
        };
        newTweet = await executeMutation(addReTweet, retweetPayload);
      }

      if (!parentTweetId) {
        dispatch(addTweet(newTweet));
      }

      if (onSubmitSuccess) {
        onSubmitSuccess(newTweet);
      }

      reset();
    } catch (error) {
      if (error instanceof Error) {
        dispatch(
          openModal({
            title: "Erro na criação",
            content: `Algum erro na criação do tweet. ${error.message}`,
          }),
        );
      } else {
        dispatch(
          openModal({
            title: "Erro desconhecido",
            content: "Algum erro desconhecido. Entre em contato conosco",
          }),
        );
      }
    } finally {
      if (setIsSubmitting) {
        setIsSubmitting(false);
      }
    }
  };

  const formContainerStyle = parentTweetId
    ? {
        borderBottom: "none",
        paddingTop: "8px",
        paddingBottom: "8px",
      }
    : {};

  return (
    <S.TweetFormContainer style={formContainerStyle}>
      {!parentTweetId && (
        <S.AvatarImageSmall
          onClick={() => navigate(`/main/profile/${userBio?.user?.id || ""}`)}
          src={
            userBio?.avatar?.file_path
              ? getImageUrl(userBio.avatar.file_path)
              : avatarPath(userBio?.user?.first_name || "U", userBio?.user?.last_name)
          }
          alt={`Avatar do usuário ${userBio?.user?.first_name || ""} ${userBio?.user?.last_name || ""}`}
        />
      )}

      <S.FormContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-area-container">
            <TextArea
              isFromParent={!!parentTweetId}
              placeholder={placeholder}
              {...register("text")}
              disabled={isSubmitting}
            />

            {errors.text && <ErrorMessage text={errors.text.message!} />}
          </div>

          <S.FormActions>
            <IconButton
              type="submit"
              disabled={isSubmitting}
            >
              <Send />
            </IconButton>
          </S.FormActions>
        </form>
      </S.FormContent>
    </S.TweetFormContainer>
  );
};
