import { useEffect, type FC } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { allTweets, setAllTweets, setBulkUserReactions } from "../../store/reducers/tweetSlice";
import { TweetForm } from "../../components/TweetForm";
import { TweetCard } from "../../components/TweetCard";
import { tweetApiSlice, useGetAllTweetsQuery } from "../../services/tweetApiSlice";
import { tokenFromState } from "../../store/reducers/user/authSlice";
import { executeQuery } from "../../utils/apiResponse";
import type { Tweet, TweetReactions } from "../../types/tweet";
import { openModal } from "../../store/reducers/modalSlice";
import { LoadingOverlay, Spinner } from "../Signup/styles";

export const MainTweet: FC = () => {
  const token = useAppSelector(tokenFromState);
  const dispatch = useAppDispatch();
  const tweetsFromStore = useAppSelector(allTweets);

  const { data: tweetsResponseData, isLoading, isError, isSuccess, error: queryError } = useGetAllTweetsQuery(token!);

  useEffect(() => {
    if (isSuccess && tweetsResponseData) {
      try {
        const processedTweets = executeQuery<Tweet[]>({
          data: tweetsResponseData,
          isLoading,
          isError,
          isSuccess,
          error: queryError,
        });
        dispatch(setAllTweets(processedTweets || []));
        if (processedTweets && processedTweets.length > 0) {
          dispatch(setAllTweets(processedTweets));

          const reactionsPromisesMap = processedTweets.reduce(
            (acc, tweet) => {
              if (Object.keys(acc).length < 20) {
                acc[tweet.id] = dispatch(
                  tweetApiSlice.endpoints.reactionsByUser.initiate({
                    token: token!,
                    tweetId: tweet.id,
                  }),
                ).then((result) => {
                  try {
                    return executeQuery<TweetReactions>(result);
                  } catch (e) {
                    console.error(`Erro ao carregar reações para tweet ${tweet.id}:`, e);
                    return null;
                  }
                });
              }
              return acc;
            },
            {} as Record<number, Promise<TweetReactions | null>>,
          );

          Promise.all(
            Object.entries(reactionsPromisesMap).map(async ([tweetId, promise]) => {
              const reactions = await promise;
              return reactions ? { tweetId: Number(tweetId), reactions } : null;
            }),
          ).then((results) => {
            const validReactions = results.filter(Boolean) as { tweetId: number; reactions: TweetReactions }[];
            const reactionsMap = validReactions.reduce(
              (acc, { tweetId, reactions }) => {
                acc[tweetId] = reactions;
                return acc;
              },
              {} as Record<number, TweetReactions>,
            );

            if (Object.keys(reactionsMap).length > 0) {
              dispatch(setBulkUserReactions(reactionsMap));
            }
          });
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        dispatch(openModal({ title: "Erro nos tweets", content: "Erro ao processar tweets: " + errorMessage }));
      }
    } else if (isError && queryError) {
      dispatch(
        openModal({
          title: "Erro ao buscar tweets",
          content: "Não foi possível carregar os tweets.",
        }),
      );
    }
  }, [dispatch, tweetsResponseData, isSuccess, isError, queryError, isLoading, token]);

  if (isLoading) {
    return (
      <LoadingOverlay style={{ borderRadius: 0 }}>
        <Spinner />
      </LoadingOverlay>
    );
  }

  return (
    <>
      <TweetForm />
      {tweetsFromStore && tweetsFromStore.length > 0 ? (
        tweetsFromStore.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
          />
        ))
      ) : (
        <p>Nenhum tweet para mostrar.</p>
      )}
    </>
  );
};
