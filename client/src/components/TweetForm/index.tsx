import { type FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TweetFormContainer } from "./styles";
import { tweetFormSchema, type TTweetForm, defaultTweetForm } from "../../schema/tweetFormSchema";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { user } from "../../store/reducers/user/userSlice";

export const TweetForm: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TTweetForm>({
    mode: "all",
    resolver: zodResolver(tweetFormSchema),
    defaultValues: defaultTweetForm,
  });

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(user);

  const onSubmit: SubmitHandler<TTweetForm> = (data) => {
    if (!currentUser) {
      alert("Faça o Login");
      return;
    }
  };

  return <TweetFormContainer></TweetFormContainer>;
};
