import { useState, type FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import * as S from "./styles";
import { defaultValues, signupFormSchema, type SignupFormSchema } from "../../schema/signupFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddNewUserMutation, useUserLoginMutation } from "../../services/userApiSlice";
import { Input } from "../../components/form/Input";
import { ErrorMessage } from "../../components/form/ErrorMessage";
import { Button } from "../../components/Button";
import { executeMutation } from "../../utils/apiResponse";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/reducers/user/userSlice";
import { openModal } from "../../store/reducers/modalSlice";
import { login } from "../../store/reducers/user/authSlice";

export const Signup: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<SignupFormSchema>({ resolver: zodResolver(signupFormSchema), defaultValues, mode: "onBlur" });
  const [addNewUser] = useAddNewUserMutation();
  const [userLogin] = useUserLoginMutation();
  const dispatch = useAppDispatch();

  const passwordRegister = register("password");

  const onSubmit: SubmitHandler<SignupFormSchema> = async (formData) => {
    setIsSubmitting(true);

    try {
      const newUser = await executeMutation(addNewUser, formData);
      dispatch(setUser(newUser));
      const { access: token } = await executeMutation(userLogin, {
        nickname_or_email: newUser.nickname,
        password: formData.password,
      });
      dispatch(login(token));
      setIsSubmitting(false);
      // TODO: Tenho que fazer a volta com o navigate para a entrada do site dos twitters
      navigate("/main");
    } catch (e) {
      setIsSubmitting(false);
      if (e instanceof Error) {
        dispatch(openModal({ title: "Erro na criação", content: e.message }));
      } else {
        dispatch(
          openModal({ title: "Erro desconhecido", content: "Procure nosso time para tentar identificar o problema" }),
        );
      }
    }
  };

  return (
    <S.SignUpPageContainer>
      <S.LeftPanel>
        <S.BenefitsTextContainer>
          <h2>Junte-se à nossa comunidade!</h2>
          <ul>
            <li>Conecte-se com amigos e o mundo.</li>
            <li>Compartilhe suas ideias instantaneamente.</li>
            <li>Descubra as últimas notícias e tendências</li>
            <li>Personalize seu perfil e interaja.</li>
          </ul>
        </S.BenefitsTextContainer>

        <S.BackButtonContainer>
          <Button
            onClick={() => navigate(-1)}
            text="Voltar"
          />
        </S.BackButtonContainer>
      </S.LeftPanel>

      <S.RightPanel>
        <S.SignUpFormContainer>
          <h1>Criar Conta</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <S.FormField>
              <label htmlFor="first_name">Primeiro Nome</label>
              <Input
                {...register("first_name")}
                $isError={errors.first_name ? true : false}
                placeholder="Seu primeiro nome"
                id="first_name"
              />
              {errors.first_name && <ErrorMessage text={errors.first_name.message!} />}
            </S.FormField>

            <S.FormField>
              <label htmlFor="last_name">
                Sobrenome <span>(opcional!!)</span>
              </label>
              <Input
                {...register("last_name")}
                $isError={errors.last_name ? true : false}
                placeholder="Seu sobrenome"
                id="last_name"
              />
              {errors.last_name && <ErrorMessage text={errors.last_name.message!} />}
            </S.FormField>

            <S.FormField>
              <label htmlFor="nickname">Nickname</label>
              <Input
                {...register("nickname")}
                $isError={errors.nickname ? true : false}
                placeholder="Como você quer ser chamado"
                id="nickname"
              />
              {errors.nickname && <ErrorMessage text={errors.nickname.message!} />}
            </S.FormField>

            <S.FormField>
              <label htmlFor="email">Email</label>
              <Input
                {...register("email")}
                $isError={errors.email ? true : false}
                placeholder="seu_email@exemplo.com"
                id="email"
                type="email"
                autoComplete="email"
              />
              {errors.email && <ErrorMessage text={errors.email.message!} />}
            </S.FormField>

            <S.FormField>
              <label htmlFor="password">Senha</label>
              <Input
                {...passwordRegister}
                onChange={(e) => {
                  passwordRegister.onChange(e);
                  trigger("password");
                }}
                $isError={errors.password ? true : false}
                placeholder="Crie uma senha forte"
                id="password"
                type="password"
                autoComplete="new-password"
              />
              {errors.password && <ErrorMessage text={errors.password.message!.split("; ")} />}
            </S.FormField>

            <S.FormField>
              <label htmlFor="confirmation_password">Confirmar senha</label>
              <Input
                {...register("password_confirmation", {
                  validate: (value, data) => value === data.password_confirmation || "As senhas não coincidem",
                })}
                $isError={errors.password_confirmation ? true : false}
                placeholder="Repita sua senha"
                id="password_confirmation"
                type="password"
                autoComplete="new-password"
              />
              {errors.password_confirmation && <ErrorMessage text={errors.password_confirmation.message!} />}
            </S.FormField>

            <Button
              type="submit"
              text={isSubmitting ? "Criando..." : "Criar Conta"}
              primary
              disabled={isSubmitting}
            />
          </form>
        </S.SignUpFormContainer>
      </S.RightPanel>
      {isSubmitting && (
        <S.LoadingOverlay>
          <S.Spinner />
        </S.LoadingOverlay>
      )}
    </S.SignUpPageContainer>
  );
};
