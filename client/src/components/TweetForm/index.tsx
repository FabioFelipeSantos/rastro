import { type FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "@mui/icons-material";

import * as S from "./styles";
import { tweetFormSchema, type TTweetForm, defaultTweetForm } from "../../schema/tweetFormSchema";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { tokenFromState } from "../../store/reducers/user/authSlice";
import { addTweet } from "../../store/reducers/tweetSlice";
import { useAddTweetMutation } from "../../services/tweetApiSlice";
import { getBio } from "../../store/reducers/user/bioSlice";
import { TextArea } from "../form/TextArea";
import { ErrorMessage } from "../form/ErrorMessage";
import { IconButton } from "../IconButton";
import { getImageUrl } from "../../utils/getImageUrl";

export const TweetForm: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TTweetForm>({
    resolver: zodResolver(tweetFormSchema),
    defaultValues: defaultTweetForm,
  });

  const dispatch = useAppDispatch();
  const token = useAppSelector(tokenFromState);
  const [addTweetToServer] = useAddTweetMutation();
  const userBio = useAppSelector(getBio);

  const onSubmit: SubmitHandler<TTweetForm> = async (data) => {
    if (!token) {
      // TODO: Trocar para Modal
      alert("Faça o Login");
      return;
    }

    try {
      const newTweetText = data.text.trim();
      const newTweet = await addTweetToServer({ newTweet: { text: newTweetText }, token: token }).unwrap();
      dispatch(addTweet(newTweet));
      reset();
    } catch (error) {
      // TODO: Trocar para Modal
      alert(`Algum erro: ${error}`);
      return;
    }
  };

  return (
    <S.TweetFormContainer>
      {userBio.avatar.file_path && (
        <S.AvatarImageSmall
          src={getImageUrl(userBio.avatar.file_path)}
          alt={`Avatar do usuário ${userBio.user.first_name} ${userBio.user.last_name || ""}`}
        />
      )}

      <S.FormContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextArea
            placeholder="O que está acontecendo?!"
            {...register("text")}
          />

          {errors.text && <ErrorMessage text={errors.text.message!} />}

          <S.FormActions>
            {/* TODO: tenho que fazer os ícones de like, dislike, share e retweet */}
            {/* <div>Ícones de like, etc</div> */}
            <IconButton type="submit">
              <Send />
            </IconButton>
          </S.FormActions>
        </form>
      </S.FormContent>
    </S.TweetFormContainer>
  );
};
