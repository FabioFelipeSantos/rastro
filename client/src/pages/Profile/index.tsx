import { useState, useEffect, type FC } from "react";
import * as S from "./styles";
import { Button } from "../../components/Button";
import { TweetCard } from "../../components/TweetCard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { user } from "../../store/reducers/user/userSlice";
import {
  userTweets,
  viewedProfileTweets,
  setViewedProfileTweets,
  clearViewedProfileTweets,
} from "../../store/reducers/tweetSlice";
import { getBio } from "../../store/reducers/user/bioSlice";
import { useNavigate, useParams } from "react-router-dom";
import { userApiSlice } from "../../services/userApiSlice";
import { tokenFromState } from "../../store/reducers/user/authSlice";
import { openModal } from "../../store/reducers/modalSlice";
import { executeQuery } from "../../utils/apiResponse";
import type { UserProfile } from "../../types/user";
import { LoadingOverlay, Spinner } from "../Signup/styles";
import { getImageUrl } from "../../utils/getImageUrl";
import { avatarPath } from "../../utils/getAvatarUrlPath";

export const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userProfileInfo, setUserProfileInfo] = useState<{ user: UserProfile["user"]; bio: UserProfile["bio"] } | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams<{ userId: string }>();

  const currentUser = useAppSelector(user);
  const currentUserBio = useAppSelector(getBio);
  const token = useAppSelector(tokenFromState);

  const loggedInUserTweets = useAppSelector(userTweets);
  const profileTweets = useAppSelector(viewedProfileTweets);

  useEffect(() => {
    async function fetchProfileData() {
      setIsLoading(true);
      try {
        if (currentUser.id === userId) {
          setUserProfileInfo({
            user: currentUser,
            bio: currentUserBio,
          });
        } else {
          const response = await dispatch(
            userApiSlice.endpoints.userProfile.initiate({ token: token!, userId: userId! }),
          );
          const profileData = executeQuery<UserProfile>(response);

          setUserProfileInfo({ user: profileData.user, bio: profileData.bio });
          dispatch(setViewedProfileTweets(profileData.tweets));
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        const message = error instanceof Error ? error.message : "Erro desconhecido";
        dispatch(
          openModal({
            title: "Erro ao carregar perfil",
            content: `Não foi possível carregar os dados do perfil: ${message}`,
          }),
        );
      } finally {
        setIsLoading(false);
      }
    }

    if (userId) {
      fetchProfileData();
    } else {
      dispatch(
        openModal({
          title: "Sem usuário",
          content: "O ID do usuário não foi encontrado na URL.",
        }),
      );
      setIsLoading(false);
    }

    return () => {
      dispatch(clearViewedProfileTweets());
    };
  }, [userId, currentUser, currentUserBio, token, dispatch]);

  if (isLoading) {
    return (
      <LoadingOverlay style={{ borderRadius: 0 }}>
        <Spinner />
      </LoadingOverlay>
    );
  }

  if (!userProfileInfo) {
    return <p>Não foi possível carregar o perfil.</p>;
  }

  const tweetsToDisplay = currentUser.id === userId ? loggedInUserTweets : profileTweets;

  return (
    <>
      <S.ProfileHeaderContainer>
        <S.ProfileAvatarContainer>
          <S.ProfileAvatar
            src={
              userProfileInfo.bio.avatar
                ? getImageUrl(userProfileInfo.bio.avatar.file_path)
                : avatarPath(userProfileInfo.user.first_name, userProfileInfo.user.last_name)
            }
            alt={`Foto do usuário ${userProfileInfo.user.first_name}`}
          />
          {currentUser.id === userId && (
            <Button
              style={{ alignSelf: "flex-end" }}
              text="Editar Perfil"
              onClick={() => navigate(`/main/profile/${userId}/edit`)}
            />
          )}
        </S.ProfileAvatarContainer>

        <S.ProfileInfo>
          <h2>{userProfileInfo.user.first_name}</h2>
          <p>@{userProfileInfo.user.nickname}</p>
          <p>{userProfileInfo.bio.text}</p>
          <S.ProfileStats>
            <span>
              <strong>{userProfileInfo.bio.user.following_count}</strong> Seguindo
            </span>
            <span>
              <strong>{userProfileInfo.bio.user.follower_count}</strong> Seguidores
            </span>
          </S.ProfileStats>
        </S.ProfileInfo>
      </S.ProfileHeaderContainer>

      {tweetsToDisplay && tweetsToDisplay.length > 0 ? (
        tweetsToDisplay.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            fromProfile
          />
        ))
      ) : (
        <S.DefaultTweetsMessage>Este usuário ainda não publicou tweets.</S.DefaultTweetsMessage>
      )}
    </>
  );
};
