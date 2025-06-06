import { type FC, type ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { isAuthenticated, login, tokenFromState } from "../../store/reducers/user/authSlice";
import { userApiSlice } from "../../services/userApiSlice";
import { userBioApiSlice } from "../../services/userBioApiSlice";
import { tweetApiSlice } from "../../services/tweetApiSlice";
import { executeQuery } from "../../utils/apiResponse";
import { setUser } from "../../store/reducers/user/userSlice";
import { setBio } from "../../store/reducers/user/bioSlice";
import { setBulkUserReactions, setUserTweets } from "../../store/reducers/tweetSlice";
import { LoadingOverlay, Spinner } from "../../pages/Signup/styles";
import { openModal } from "../../store/reducers/modalSlice";
import { user as userSelector } from "../../store/reducers/user/userSlice";
import { getBio } from "../../store/reducers/user/bioSlice";
import { userTweets } from "../../store/reducers/tweetSlice";
import type { TweetReactions } from "../../types/tweet";

type PrivateRouteProps = {
  children: ReactNode;
};

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const tokenRedux = useAppSelector(tokenFromState);
  const isAuth = useAppSelector(isAuthenticated);
  const userData = useAppSelector(userSelector);
  const userBioData = useAppSelector(getBio);
  const userTweetsData = useAppSelector(userTweets);

  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const initializeUserData = async () => {
      setIsLoading(true);
      try {
        const tokenFromStorage = localStorage.getItem("token");

        if (!tokenRedux && !tokenFromStorage) {
          setIsLoading(false);
          return;
        }

        const token = tokenRedux || tokenFromStorage;
        if (!tokenRedux && token) {
          dispatch(login(token));
        }

        const needToLoadUserData = !userData?.id || userData.id === "";
        const needToLoadBioData = !userBioData?.id || userBioData.id === 0;
        const needToLoadTweetsData = !userTweetsData || userTweetsData.length === 0;

        if (needToLoadUserData || needToLoadBioData || needToLoadTweetsData) {
          const promises = [];

          if (needToLoadUserData) {
            promises.push(
              dispatch(userApiSlice.endpoints.getLoggedUser.initiate(token!)).then((result) => {
                const user = executeQuery(result);
                dispatch(setUser(user));
              }),
            );
          }

          if (needToLoadBioData) {
            promises.push(
              dispatch(userBioApiSlice.endpoints.getUserBio.initiate(token!)).then((result) => {
                const userBio = executeQuery(result);
                if (userBio && userBio.length > 0) {
                  dispatch(setBio(userBio[0]));
                }
              }),
            );
          }

          if (needToLoadTweetsData) {
            promises.push(
              dispatch(tweetApiSlice.endpoints.getTweets.initiate(token!)).then((result) => {
                const userTweets = executeQuery(result);
                dispatch(setUserTweets(userTweets));
                if (userTweets && userTweets.length > 0) {
                  const reactionsPromises = userTweets.map((tweet) =>
                    dispatch(
                      tweetApiSlice.endpoints.reactionsByUser.initiate({
                        token: token!,
                        tweetId: tweet.id,
                      }),
                    ).then((result) => {
                      try {
                        const reactions = executeQuery<TweetReactions>(result);
                        return { tweetId: tweet.id, reactions };
                      } catch (e) {
                        console.error(`Erro ao carregar reações para tweet ${tweet.id}:`, e);
                        return null;
                      }
                    }),
                  );

                  Promise.all(reactionsPromises).then((results) => {
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
              }),
            );
          }

          await Promise.all(promises);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        setAuthError(error instanceof Error ? error.message : "Erro desconhecido na autenticação");
        dispatch(
          openModal({
            title: "Erro de autenticação",
            content: "Não foi possível verificar sua autenticação. Por favor, faça login novamente.",
          }),
        );
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };

    initializeUserData();
  }, [dispatch, tokenRedux, userData, userBioData, userTweetsData]);

  if (isLoading) {
    return (
      <LoadingOverlay style={{ borderRadius: 0 }}>
        <Spinner />
      </LoadingOverlay>
    );
  }

  if (authError || !isAuth) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
};
