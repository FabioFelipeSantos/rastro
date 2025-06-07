import { useEffect, useState, type FC } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getCachedRetweetsByTweetId, addRetweetToCache, setCachedRetweets } from "../../store/reducers/tweetSlice";
import { tokenFromState } from "../../store/reducers/user/authSlice";
import { useGetAllAssociatedTweetsQuery } from "../../services/tweetApiSlice";
import { executeQuery } from "../../utils/apiResponse";
import { TweetCard } from "../TweetCard";
import { TweetForm } from "../TweetForm";
import { LoadingOverlay, Spinner } from "../../pages/Signup/styles";
import { openModal } from "../../store/reducers/modalSlice";
import type { Tweet } from "../../types/tweet";
import { NoRetweetsMessage, RetweetHeader, RetweetsContainer } from "./styles";

type RetweetsListProps = {
  tweetId: number;
};

export const RetweetsList: FC<RetweetsListProps> = ({ tweetId }) => {
  const [isSubmittingRetweet, setIsSubmittingRetweet] = useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector(tokenFromState);

  const cachedRetweets = useAppSelector((state) => getCachedRetweetsByTweetId(state, tweetId));

  const { data, isLoading, isError, error } = useGetAllAssociatedTweetsQuery(
    { token: token!, tweetId, type: "retweet" },
    {
      skip: !!cachedRetweets,
    },
  );

  useEffect(() => {
    if (data && !cachedRetweets) {
      try {
        const retweets = executeQuery<Tweet[]>({
          data,
          isLoading,
          isError,
          isSuccess: !!data,
          error,
        });

        if (retweets) {
          dispatch(setCachedRetweets({ tweetId, retweets }));
        }
      } catch (err) {
        console.error("Erro ao processar retweets:", err);
        const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";
        dispatch(
          openModal({
            title: "Erro ao carregar retweets",
            content: errorMessage,
          }),
        );
      }
    }
  }, [data, cachedRetweets, tweetId, isLoading, isError, error, dispatch]);

  const retweetsToShow = cachedRetweets || [];

  const handleNewRetweet = (newRetweet: Tweet) => {
    dispatch(
      addRetweetToCache({
        parentTweetId: tweetId,
        newRetweet,
      }),
    );
    setIsSubmittingRetweet(false);
  };

  if (isLoading && !cachedRetweets) {
    return (
      <RetweetsContainer>
        <LoadingOverlay style={{ borderRadius: 0 }}>
          <Spinner />
        </LoadingOverlay>
      </RetweetsContainer>
    );
  }

  return (
    <RetweetsContainer>
      <RetweetHeader>Retweets {retweetsToShow.length > 0 && `(${retweetsToShow.length})`}</RetweetHeader>

      <div className="retweet-form">
        <TweetForm
          parentTweetId={tweetId}
          onSubmitSuccess={handleNewRetweet}
          isSubmitting={isSubmittingRetweet}
          setIsSubmitting={setIsSubmittingRetweet}
          placeholder="Adicione seu comentário a este tweet..."
        />
      </div>

      {retweetsToShow.length > 0 ? (
        retweetsToShow.map((retweet) => (
          <TweetCard
            key={retweet.id}
            tweet={retweet}
            isRetweet={true}
          />
        ))
      ) : (
        <NoRetweetsMessage>Ainda não há retweets para este tweet. Seja o primeiro a comentar!</NoRetweetsMessage>
      )}
    </RetweetsContainer>
  );
};
