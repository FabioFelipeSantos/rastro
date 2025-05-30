import { useForm } from "react-hook-form";

import { executeQuery, executeMutation } from "../../utils/ApiResponse";
import { useUserLoginMutation, userApiSlice } from "../../services/userApiSlice";
import { userBioApiSlice } from "../../services/userBioApiSlice";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/reducers/user/authSlice";
import { setUser } from "../../store/reducers/user/userSlice";
import { setBio } from "../../store/reducers/user/bioSlice";

import { Input } from "../../components/form/Input";
import { Button } from "../../components/Button";
import type { UserLogin, UserResponseLogin } from "../../types/user";
import { useState } from "react";
import { openModal } from "../../store/reducers/modalSlice";

export const Login = () => {
  const [isSendingLogin, setIsSendingLogin] = useState<boolean>(false);
  // const [isErrorModal, setIsErrorModal] = useState<boolean>(false);

  const { register, handleSubmit, getValues } = useForm({
    mode: "all",
  });
  const [sendUserLogin] = useUserLoginMutation();

  const dispatch = useAppDispatch();

  const handleLogIn = async () => {
    setIsSendingLogin(true);
    const loginInfo = getValues() as UserLogin;

    try {
      const { access: token } = await executeMutation<UserResponseLogin, UserLogin>(sendUserLogin, {
        nickname_or_email: loginInfo.nickname_or_email,
        password: loginInfo.password,
      });
      localStorage.setItem("token", token);

      const resultGetUser = await dispatch(userApiSlice.endpoints.getLoggedUser.initiate(token));
      const user = executeQuery(resultGetUser);
      const resultGetUserBio = await dispatch(userBioApiSlice.endpoints.getUserBio.initiate(token));
      const userBio = executeQuery(resultGetUserBio);

      dispatch(login(token));
      dispatch(setUser(user));
      dispatch(setBio(userBio[0]));
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
    }
    setIsSendingLogin(false);
  };
  return (
    <>
      <h3>Login</h3>
      <form onSubmit={handleSubmit(handleLogIn)}>
        <label>
          <h3>Nickname ou Email</h3>
          <Input
            {...register("nickname_or_email", {
              required: { value: true, message: "O nickname ou email deve ser informado para o login" },
            })}
            value="juliana_2"
          />
        </label>
        <label>
          <h3>Senha</h3>
          <Input
            {...register("password", {
              required: { value: true, message: "O password deve ser informado para o login" },
            })}
            // value="1.aA+/*"
          />
        </label>
        <Button
          text="Login"
          type="submit"
          disabled={isSendingLogin}
        />
      </form>
    </>
  );
};

// let content: ReactNode;
// if (isLoading) {
//   content = (
//     <CircleLoader
//       color="#24711d"
//       loading
//       size={85}
//       speedMultiplier={1}
//     />
//   );
// }
