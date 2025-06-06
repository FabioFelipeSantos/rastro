import { useState, useEffect, type FC } from "react";

import * as S from "./styles";
import { Button } from "../../components/Button";
import { TweetCard } from "../../components/TweetCard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { user } from "../../store/reducers/user/userSlice";
import { userTweets } from "../../store/reducers/tweetSlice";
import { getBio } from "../../store/reducers/user/bioSlice";
import { useParams } from "react-router-dom";
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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams<{ userId: string }>();

  const currentUser = useAppSelector(user);
  const currentUserBio = useAppSelector(getBio);
  const currentUserTweets = useAppSelector(userTweets);
  const token = useAppSelector(tokenFromState);

  useEffect(() => {
    async function fetchProfileData() {
      setIsLoading(true);
      try {
        if (currentUser.id === userId) {
          setUserProfile({
            user: currentUser,
            bio: currentUserBio,
            tweets: currentUserTweets,
          });
        } else {
          const response = await dispatch(
            userApiSlice.endpoints.userProfile.initiate({ token: token!, userId: userId! }),
          );
          const profileData = executeQuery(response);
          setUserProfile(profileData);
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
  }, [userId, currentUser, currentUserBio, currentUserTweets, token, dispatch]);

  if (isLoading) {
    return (
      <LoadingOverlay style={{ borderRadius: 0 }}>
        <Spinner />
      </LoadingOverlay>
    );
  }

  if (!userProfile) {
    return <p>Não foi possível carregar o perfil.</p>;
  }

  return (
    <>
      <S.ProfileHeaderContainer>
        {/* <S.ProfileBanner /> */}

        <S.ProfileAvatarContainer>
          <S.ProfileAvatar
            src={
              userProfile.bio.avatar
                ? getImageUrl(userProfile.bio.avatar.file_path)
                : avatarPath(userProfile.user.first_name, userProfile.user.last_name)
            }
            alt={`Foto do usuário ${userProfile.user.first_name}`}
          />
          {currentUser.id === userId && (
            <Button
              style={{ alignSelf: "flex-end" }}
              text="Editar Perfil"
            />
          )}
        </S.ProfileAvatarContainer>

        <S.ProfileInfo>
          <h2>{userProfile.user.first_name}</h2>
          <p>@{userProfile.user.nickname}</p>
          <p>{userProfile.bio.text}</p>
          <S.ProfileStats>
            <span>
              <strong>{userProfile.bio.user.following_count}</strong> Seguindo
            </span>
            <span>
              <strong>{userProfile.bio.user.follower_count}</strong> Seguidores
            </span>
          </S.ProfileStats>
        </S.ProfileInfo>
      </S.ProfileHeaderContainer>

      {userProfile.tweets && userProfile.tweets.length > 0 ? (
        userProfile.tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            fromProfile
          />
        ))
      ) : (
        <p>Este usuário ainda não publicou tweets.</p>
      )}
    </>
  );
};
