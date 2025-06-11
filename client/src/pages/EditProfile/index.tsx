import { useState, useEffect, useRef, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Edit } from "@mui/icons-material";

import * as S from "./styles";
import { Button } from "../../components/Button";
import { Input } from "../../components/form/Input";
import { TextArea } from "../../components/form/TextArea";
import { ErrorMessage } from "../../components/form/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { user, setUser } from "../../store/reducers/user/userSlice";
import { getBio, setBio } from "../../store/reducers/user/bioSlice";
import { tokenFromState } from "../../store/reducers/user/authSlice";
import { getImageUrl } from "../../utils/getImageUrl";
import { avatarPath } from "../../utils/getAvatarUrlPath";
import { openModal } from "../../store/reducers/modalSlice";
import { LoadingOverlay, Spinner } from "../Signup/styles";
import { useUpdateProfileMutation } from "../../services/userApiSlice";
import { executeMutation } from "../../utils/apiResponse";
import { editProfileSchema, type EditProfileSchema } from "../../schema/editProfileSchema";
import type { ProfileUpdate } from "../../types/user";
import { customZodResolver } from "../../schema/zodResolver";

export const EditProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentUser = useAppSelector(user);
  const currentUserBio = useAppSelector(getBio);
  const token = useAppSelector(tokenFromState);

  const [isLoading, setIsLoading] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [updateProfile] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileSchema>({
    resolver: customZodResolver(editProfileSchema),
    defaultValues: {
      first_name: currentUser.first_name,
      last_name: currentUser.last_name || undefined,
      nickname: currentUser.nickname,
      email: currentUser.email,
      bio: currentUserBio.text,
      avatar: undefined,
    },
  });

  useEffect(() => {
    if (currentUser.id !== userId) {
      dispatch(
        openModal({
          title: "Acesso negado",
          content: "Você não tem permissão para editar este perfil.",
        }),
      );
      navigate(`/main/profile/${userId}`);
    }
  }, [currentUser.id, userId, dispatch, navigate]);

  useEffect(() => {
    reset({
      first_name: currentUser.first_name,
      last_name: currentUser.last_name || undefined,
      nickname: currentUser.nickname,
      email: currentUser.email,
      bio: currentUserBio.text,
      password: "",
      password_confirmation: "",
    });

    if (currentUserBio.avatar && currentUserBio.avatar.file_path) {
      setPreviewAvatar(getImageUrl(currentUserBio.avatar.file_path));
    } else {
      setPreviewAvatar(avatarPath(currentUser.first_name, currentUser.last_name));
    }
  }, [currentUser, currentUserBio, reset]);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setAvatarFile(file);

      const objectUrl = URL.createObjectURL(file);
      setPreviewAvatar(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const onSubmit = async (data: EditProfileSchema) => {
    setIsLoading(true);

    try {
      let profileData: ProfileUpdate = {
        first_name: data.first_name,
        last_name: data.last_name || null,
        nickname: data.nickname,
        email: data.email,
        text: data.bio,
      };

      if (data.password && data.password.length > 0) {
        Object.assign(profileData, {
          password: data.password,
          password_confirmation: data.password_confirmation,
        });
      }

      if (avatarFile) {
        const formData = new FormData();

        Object.entries(profileData).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            formData.append(key, String(value));
          }
        });

        formData.append("avatar", avatarFile);

        profileData = formData;
      }

      const { user: updatedUser, bio: updatedBio } = await executeMutation(updateProfile, {
        token: token!,
        updateInfo: profileData,
      });

      if (updatedUser) {
        dispatch(setUser(updatedUser));
      }

      if (updatedBio) {
        dispatch(setBio(updatedBio));
      }

      dispatch(
        openModal({
          title: "Sucesso",
          content: "Seu perfil foi atualizado com sucesso!",
        }),
      );

      navigate(`/main/profile/${userId}`);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";

      dispatch(
        openModal({
          title: "Erro ao atualizar perfil",
          content: `Não foi possível atualizar seu perfil: ${errorMessage}`,
        }),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(`/main/profile/${userId}`);
  };

  return (
    <S.EditProfileContainer>
      <S.Title>Editar Perfil</S.Title>

      {isLoading && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <S.AvatarContainer>
          <S.AvatarImage
            src={previewAvatar || avatarPath(currentUser.first_name, currentUser.last_name)}
            alt="Avatar"
          />

          <S.EditIconContainer onClick={handleAvatarClick}>
            <Edit />
          </S.EditIconContainer>

          <S.FileInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </S.AvatarContainer>

        <S.FormSection>
          <S.FormSectionTitle>Biografia</S.FormSectionTitle>
          <S.FormField>
            <TextArea
              {...register("bio")}
              placeholder="Escreva algo sobre você"
            />
            {errors.bio && <ErrorMessage text={errors.bio.message!} />}
          </S.FormField>
        </S.FormSection>

        <S.FormSection>
          <S.FormSectionTitle>Informações Pessoais</S.FormSectionTitle>

          <S.FormField>
            <Input
              {...register("first_name")}
              id="first_name"
              placeholder="Nome"
            />
            {errors.first_name && <ErrorMessage text={errors.first_name.message!} />}
          </S.FormField>

          <S.FormField>
            <Input
              {...register("last_name")}
              id="last_name"
              placeholder="Sobrenome"
            />
            {errors.last_name && <ErrorMessage text={errors.last_name.message!} />}
          </S.FormField>

          <S.FormField>
            <Input
              {...register("email")}
              id="email"
              placeholder="Email"
              type="email"
            />
            {errors.email && <ErrorMessage text={errors.email.message!} />}
          </S.FormField>

          <S.FormField>
            <Input
              {...register("nickname")}
              id="nickname"
              placeholder="Nickname"
              autoComplete="username"
            />
            {errors.nickname && <ErrorMessage text={errors.nickname.message!} />}
          </S.FormField>
        </S.FormSection>

        <S.FormSection>
          <S.FormSectionTitle>Alteração de Senha</S.FormSectionTitle>

          <S.FormField>
            <Input
              {...register("password")}
              id="password"
              placeholder="Nova senha (deixe em branco para não alterar)"
              type="password"
              autoComplete="new-password"
            />
            {errors.password && <ErrorMessage text={errors.password.message!} />}
          </S.FormField>

          <S.FormField>
            <Input
              {...register("password_confirmation")}
              id="password_confirmation"
              placeholder="Confirmar nova senha"
              type="password"
              autoComplete="new-password"
            />
            {errors.password_confirmation && <ErrorMessage text={errors.password_confirmation.message!} />}
          </S.FormField>
        </S.FormSection>

        <S.ButtonContainer>
          <Button
            text="Cancelar"
            type="button"
            primary={false}
            onClick={handleCancel}
          />
          <Button
            text="Salvar Alterações"
            type="submit"
            primary
            disabled={isLoading}
          />
        </S.ButtonContainer>
      </form>
    </S.EditProfileContainer>
  );
};
