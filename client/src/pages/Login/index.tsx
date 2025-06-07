import { useEffect, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { AccountBox } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { executeQuery, executeMutation } from "../../utils/apiResponse";
import { useUserLoginMutation, userApiSlice } from "../../services/userApiSlice";
import { userBioApiSlice } from "../../services/userBioApiSlice";
import { tweetApiSlice } from "../../services/tweetApiSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { isAuthenticated, login, tokenFromState } from "../../store/reducers/user/authSlice";
import { setUser } from "../../store/reducers/user/userSlice";
import { setBio } from "../../store/reducers/user/bioSlice";
import { setUserTweets } from "../../store/reducers/tweetSlice";
import { openModal } from "../../store/reducers/modalSlice";
import { defaultValues, loginFormSchema, type LoginFormSchema } from "../../schema/loginFormSchema";
import { FormField, LoadingOverlay, Spinner } from "../Signup/styles";
import { ErrorMessage } from "../../components/form/ErrorMessage";

import * as S from "./styles";
import rastroLogo from "../../images/logo.png";
import { Input } from "../../components/form/Input";
import { Button } from "../../components/Button";
import type { UserLogin, UserResponseLogin } from "../../types/user";

export const Login = () => {
  const [isSendingLogin, setIsSendingLogin] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector(isAuthenticated);
  const token = useAppSelector(tokenFromState);

  const from = location.state?.from?.pathname || "/main";

  useEffect(() => {
    if (isAuth && token) {
      navigate(from, { replace: true });
    }
  }, [isAuth, token, navigate, from]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    mode: "onBlur",
    defaultValues,
    resolver: zodResolver(loginFormSchema),
  });

  const [sendUserLogin] = useUserLoginMutation();

  const handleLogIn: SubmitHandler<LoginFormSchema> = async (data) => {
    setIsSendingLogin(true);

    try {
      const { access: token } = await executeMutation<UserResponseLogin, UserLogin>(sendUserLogin, data);
      localStorage.setItem("token", token);

      const resultGetUser = await dispatch(userApiSlice.endpoints.getLoggedUser.initiate(token));
      const user = executeQuery(resultGetUser);
      const resultGetUserBio = await dispatch(userBioApiSlice.endpoints.getUserBio.initiate(token));
      const userBio = executeQuery(resultGetUserBio);
      const resultGetTweets = await dispatch(tweetApiSlice.endpoints.getTweets.initiate(token));
      const userTweets = executeQuery(resultGetTweets);

      dispatch(login(token));
      dispatch(setUser(user));
      dispatch(setBio(userBio[0]));
      dispatch(setUserTweets(userTweets));

      navigate(from, { replace: true });
    } catch (e) {
      if (e instanceof Error) {
        dispatch(
          openModal({
            title: "Erro no Login",
            content: e.message,
          }),
        );
      } else {
        dispatch(
          openModal({
            title: "Erro desconhecido no servidor ou no login",
            content: "Nos procure por mais informações e nos conte em detalhes o que está ocorrendo",
          }),
        );
      }
    } finally {
      setIsSendingLogin(false);
    }
  };

  return (
    <S.LoginPageContainer>
      <S.LoginLogoWrapper>
        <img
          src={rastroLogo}
          alt="Logo"
        />
      </S.LoginLogoWrapper>

      <S.LoginCardStyled>
        <S.UserIconWrapper>
          <AccountBox sx={{ fontSize: "60px" }} />
        </S.UserIconWrapper>

        <h2>Bem-vindo de volta!</h2>

        <form onSubmit={handleSubmit(handleLogIn)}>
          <FormField>
            <Controller
              name="nickname_or_email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="nickname_or_email"
                  placeholder="Seu nickname ou email"
                  autoComplete="username"
                />
              )}
            />
            {errors.nickname_or_email && <ErrorMessage text={errors.nickname_or_email.message!} />}
          </FormField>

          <FormField>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  placeholder="Sua senha"
                  type="password"
                  autoComplete="current-password"
                />
              )}
            />
            {errors.password && <ErrorMessage text={errors.password.message!} />}
          </FormField>

          <Button
            type="submit"
            primary
            fullWidth
            disabled={isSendingLogin}
            text={isSendingLogin ? "Entrando..." : "Login"}
            style={{ marginTop: "18px" }}
          />
        </form>

        <p>
          Não tem uma conta? <Link to="/signup">Crie uma aqui</Link>
        </p>
      </S.LoginCardStyled>

      {isSendingLogin && (
        <LoadingOverlay style={{ borderRadius: 0 }}>
          <Spinner />
        </LoadingOverlay>
      )}
    </S.LoginPageContainer>
  );
};
