import { useState, useEffect, type FC, type JSX, useCallback } from "react";
import { ReplyAll, ThumbUp, ThumbDown, Share, PersonAdd, PersonRemove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { type TweetReactions, type Tweet, type TweetStatisticsFromServer } from "../../types/tweet";
import * as S from "./styles";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { AvatarImageSmall } from "../TweetForm/styles";
import { getBio } from "../../store/reducers/user/bioSlice";
import { getImageUrl } from "../../utils/getImageUrl";
import { executeMutation, executeQuery } from "../../utils/apiResponse";
import {
  useReactionsByUserQuery,
  useSendATweetActionMutation,
  useRemoveTweetActionMutation,
  type TweetActionsArgs,
} from "../../services/tweetApiSlice";
import {
  addStatisticTweet,
  removeStatisticTweet,
  getUserReactionsByTweetId,
  setUserReaction,
  toggleUserReaction,
  getExpandedTweetInfo,
  toggleExpandRetweets,
} from "../../store/reducers/tweetSlice";
import { tokenFromState } from "../../store/reducers/user/authSlice";
import { openModal } from "../../store/reducers/modalSlice";
import { avatarPath } from "../../utils/getAvatarUrlPath";
import { RetweetsList } from "../RetweetsList";
import { addFollowingUser, followingUsers, removeFollowingUser } from "../../store/reducers/user/userSlice";
import { useFollowAnUserMutation, useUnfollowAnUserMutation } from "../../services/userApiSlice";

type TweetCardProps = {
  tweet: Tweet;
  isRetweet?: boolean;
  fromProfile?: boolean;
};

export const TweetCard: FC<TweetCardProps> = ({ tweet, isRetweet = false, fromProfile = false }) => {
  const navigate = useNavigate();
  const [isSendingAction, setIsSendingAction] = useState<boolean>(false);

  const token = useAppSelector(tokenFromState);
  const dispatch = useAppDispatch();
  const userBio = useAppSelector(getBio);
  const followedUsers = useAppSelector(followingUsers);
  const [sendTweetAction] = useSendATweetActionMutation();
  const [removeTweetAction] = useRemoveTweetActionMutation();
  const [followTheUser] = useFollowAnUserMutation();
  const [unfollowTheUser] = useUnfollowAnUserMutation();
  const [isTweetUserFollowedByLoggedUser, setIsTweetUserFollowedByLoggedUser] = useState<boolean>(
    followedUsers.filter((followed) => followed.user_id === tweet.user.id).length === 1,
  );

  const reactionsOnTweet = useAppSelector((state) => getUserReactionsByTweetId(state, tweet.id));

  const expandedTweetInfo = useAppSelector(getExpandedTweetInfo);
  const isExpanded = expandedTweetInfo.isExpanded && expandedTweetInfo.tweetId === tweet.id;
  const isTweetUserTheLoggedUser = tweet.user.id === userBio.user.id;

  const {
    data: reactionResponseData,
    isLoading: isLoadingReactions,
    isSuccess: isSuccessReactions,
    isError: isErrorReactions,
    error: reactionsError,
  } = useReactionsByUserQuery(
    {
      token: token!,
      tweetId: tweet.id,
    },
    {
      refetchOnMountOrArgChange: false,
      refetchOnFocus: false,
      refetchOnReconnect: false,
    },
  );

  useEffect(() => {
    setIsTweetUserFollowedByLoggedUser(
      followedUsers.filter((followed) => followed.user_id === tweet.user.id).length === 1,
    );
  }, [followedUsers, tweet.user.id]);

  useEffect(() => {
    if (isSuccessReactions && reactionResponseData) {
      try {
        const reactionsByUser = executeQuery<TweetReactions>({
          data: reactionResponseData,
          isLoading: isLoadingReactions,
          isError: isErrorReactions,
          isSuccess: isSuccessReactions,
          error: reactionsError,
        });

        if (reactionsByUser) {
          dispatch(
            setUserReaction({
              tweetId: tweet.id,
              reactions: reactionsByUser,
            }),
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          dispatch(
            openModal({
              title: "Erro de requisição",
              content: "Houve algum erro na requisição de verificação. " + error.message,
            }),
          );
        } else {
          dispatch(
            openModal({
              title: "Erro desconhecido",
              content: "Nos procure por mais informações e nos conte em detalhes o que está ocorrendo",
            }),
          );
        }
      }
    } else if (isErrorReactions && reactionsError) {
      const errorMessage =
        reactionsError instanceof Error ? reactionsError.message : "Erro ao carregar reações do usuário";

      dispatch(
        openModal({
          title: "Erro ao carregar reações",
          content: errorMessage,
        }),
      );
    }
  }, [
    reactionResponseData,
    isSuccessReactions,
    isErrorReactions,
    reactionsError,
    dispatch,
    isLoadingReactions,
    tweet.id,
  ]);

  const tweetActionsButtons: {
    action: TweetActionsArgs["action"];
    icon: JSX.Element;
    statisticCount: number;
    reacted: boolean;
    isRetweetButton?: boolean;
  }[] = [
    {
      action: "like",
      icon: <ThumbUp className="icon" />,
      statisticCount: tweet.statistics.likes,
      reacted: reactionsOnTweet.like,
    },
    {
      action: "dislike",
      icon: <ThumbDown className="icon" />,
      statisticCount: tweet.statistics.dislikes,
      reacted: reactionsOnTweet.dislike,
    },
    {
      action: "retweet",
      icon: <ReplyAll className="icon" />,
      statisticCount: tweet.statistics.re_tweets,
      reacted: reactionsOnTweet.retweet,
      isRetweetButton: true,
    },
    {
      action: "share",
      icon: <Share className="icon" />,
      statisticCount: tweet.statistics.shares,
      reacted: reactionsOnTweet.share,
    },
  ];

  const timeAgo = (tweetDate: string) => {
    const now = new Date();
    const seconds = Math.round(now.getTime() - new Date(tweetDate).getTime()) / 1000;
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) return `${Math.ceil(seconds)}s`;
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    return `${days}d`;
  };

  const handleExpandRetweets = useCallback(() => {
    dispatch(toggleExpandRetweets({ tweetId: tweet.id }));
  }, [dispatch, tweet.id]);

  const handleTweetAction = useCallback(
    async (tweet_id: Tweet["id"], action: TweetActionsArgs["action"]) => {
      if (action === "retweet") {
        handleExpandRetweets();
        return;
      }

      const applyingUserActionOnTweet = async (
        mutation: typeof removeTweetAction | typeof sendTweetAction,
        reactionValue: boolean,
      ) => {
        await executeMutation<TweetStatisticsFromServer, TweetActionsArgs>(mutation, {
          token: token!,
          tweet_id,
          action,
        });

        dispatch(
          toggleUserReaction({
            tweetId: tweet_id,
            reactionType: action,
            value: reactionValue,
          }),
        );

        if (reactionValue) {
          dispatch(
            addStatisticTweet({
              id: tweet_id,
              type: `${action}s`,
            }),
          );
        } else {
          dispatch(
            removeStatisticTweet({
              id: tweet_id,
              type: `${action}s`,
            }),
          );
        }
      };

      try {
        setIsSendingAction(true);

        const currentReactionState = reactionsOnTweet[action];

        if (!currentReactionState) {
          await applyingUserActionOnTweet(sendTweetAction, true);
        } else {
          await applyingUserActionOnTweet(removeTweetAction, false);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);

        dispatch(
          openModal({
            title: "Erro na ação",
            content: "Não foi possível executar esta ação: " + errorMessage,
          }),
        );
      } finally {
        setIsSendingAction(false);
      }
    },
    [dispatch, reactionsOnTweet, sendTweetAction, token, handleExpandRetweets, removeTweetAction],
  );

  const handleFollow = useCallback(async () => {
    try {
      const queryArgs = { token: token!, userId: tweet.user.id };
      if (isTweetUserFollowedByLoggedUser) {
        await executeMutation(unfollowTheUser, queryArgs);

        dispatch(removeFollowingUser(tweet.user.id));
      } else {
        await executeMutation(followTheUser, queryArgs);

        dispatch(addFollowingUser({ user_id: tweet.user.id, nickname: tweet.user.nickname }));
      }
    } catch (error) {
      console.log(error);
    }
  }, [
    isTweetUserFollowedByLoggedUser,
    unfollowTheUser,
    dispatch,
    followTheUser,
    token,
    tweet.user.id,
    tweet.user.nickname,
  ]);

  return (
    <>
      <S.TweetCardContainer $isRetweet={isRetweet}>
        {!fromProfile && (
          <AvatarImageSmall
            onClick={() => navigate(`/main/profile/${tweet.user.id}`)}
            src={
              tweet.user.avatar_url
                ? getImageUrl(tweet.user.avatar_url)
                : avatarPath(tweet.user.first_name, tweet.user.last_name)
            }
            alt={`Foto do usuário ${tweet.user.first_name} ${tweet.user.last_name || ""}`}
            style={isRetweet ? { width: "36px", height: "36px" } : undefined}
          />
        )}

        <S.TweetContent>
          <S.TweetHeader $isRetweet={isRetweet}>
            <strong>{tweet.user.first_name}</strong>

            <span>
              @{tweet.user.nickname} · {timeAgo(tweet.created_at)}
            </span>

            {!isTweetUserTheLoggedUser && (
              <S.FollowContainer $isRetweet={isRetweet}>
                <S.ActionButton
                  $isReacted={false}
                  onClick={handleFollow}
                >
                  {!isTweetUserFollowedByLoggedUser ? (
                    <PersonAdd className="follow-icon" />
                  ) : (
                    <PersonRemove className="follow-icon" />
                  )}
                </S.ActionButton>
              </S.FollowContainer>
            )}
          </S.TweetHeader>

          <S.TweetBody $isRetweet={isRetweet}>{tweet.text}</S.TweetBody>

          <S.TweetActions $isRetweet={isRetweet}>
            {tweetActionsButtons.map((tweetAction) => {
              if (tweetAction.action === "retweet" && isRetweet) return null;

              return (
                <S.ActionButton
                  key={tweetAction.action}
                  disabled={
                    isSendingAction || (userBio?.user?.id === tweet.user.id && !(tweetAction.action === "retweet"))
                  }
                  onClick={() => handleTweetAction(tweet.id, tweetAction.action)}
                  $isReacted={tweetAction.reacted}
                  $isRetweetButton={tweetAction.isRetweetButton}
                  $hasExpanded={tweetAction.isRetweetButton && isExpanded}
                >
                  {tweetAction.icon}
                  {tweetAction.statisticCount > 0 && tweetAction.statisticCount}
                </S.ActionButton>
              );
            })}
          </S.TweetActions>
        </S.TweetContent>
      </S.TweetCardContainer>

      {isExpanded && (
        <S.RetweetExpandContainer>
          <RetweetsList tweetId={tweet.id} />
        </S.RetweetExpandContainer>
      )}
    </>
  );
};
