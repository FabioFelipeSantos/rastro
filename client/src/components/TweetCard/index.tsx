import { type FC } from "react";
import { ReplyAll } from "@mui/icons-material";

import type { Tweet } from "../../types/tweet";
import * as S from "./styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { AvatarImageSmall } from "../TweetForm/styles";
import { getBio } from "../../store/reducers/user/bioSlice";
import { getImageUrl } from "../../utils/getImageUrl";

import { useSendATweetActionMutation } from "../../services/tweetApiSlice";
import { tokenFromState } from "../../store/reducers/user/authSlice";

type TweetCardProps = {
  tweet: Tweet;
};

export const TweetCard: FC<TweetCardProps> = ({ tweet }) => {
  const token = useAppSelector(tokenFromState);

  if (!token) {
    throw new Error("O usuário deve estar logado");
  }

  const dispatch = useAppDispatch();
  const userBio = useAppSelector(getBio);
  const [sendTweetAction, { isError }] = useSendATweetActionMutation();

  const timeAgo = (tweetDate: string) => {
    const now = new Date();
    const seconds = Math.round(now.getTime() - new Date(tweetDate).getTime()) / 1000;
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) return `${seconds}s`;
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const handleTweetAction = async (action: "like" | "dislike" | "retweet" | "share") => {
    const tweetActionStatistics = await sendTweetAction({ token, action }).unwrap();

    if (isError) {
      throw new Error(error.message);
    }
  };

  return (
    <S.TweetCardContainer>
      <AvatarImageSmall
        src={getImageUrl(userBio.avatar.file_path)}
        alt={`Foto do usuário ${userBio.user.first_name} ${userBio.user.last_name}`}
      />

      <S.TweetContent>
        <S.TweetHeader>
          <strong>{tweet.user.first_name}</strong>
          <span>
            @{tweet.user.nickname} · {timeAgo(tweet.created_at)}
          </span>
        </S.TweetHeader>

        <S.TweetBody>{tweet.text}</S.TweetBody>

        <S.TweetActions>
          <S.ActionButton>
            <ReplyAll />
            {tweet.statistics.re_tweets}
          </S.ActionButton>
        </S.TweetActions>
      </S.TweetContent>
    </S.TweetCardContainer>
  );
};
