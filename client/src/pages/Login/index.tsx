// import { type ReactNode } from "react";
import { useForm } from "react-hook-form";
// import { CircleLoader } from "react-spinners";

import { useUserLoginMutation, userApiSlice } from "../../services/userApiSlice";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/reducers/user/authSlice";
import { setUser } from "../../store/reducers/user/userSlice";
// import { login } from "../../store/reducers/user/authSlice";

import { Input } from "../../components/form/Input";
import { Button } from "../../components/Button";
import type { UserLogin } from "../../types/user";

export const Users = () => {
  const { register, handleSubmit, getValues } = useForm({
    mode: "all",
  });
  const [userLogin, { isLoading }] = useUserLoginMutation();

  const dispatch = useAppDispatch();

  const handleLogIn = async () => {
    const loginInfo = getValues() as UserLogin;

    try {
      const token = await userLogin({
        nickname_or_email: loginInfo.nickname_or_email,
        password: loginInfo.password,
      }).unwrap();
      console.log(token);
      localStorage.setItem("token", token);

      const user = await dispatch(userApiSlice.endpoints.getLoggedUser.initiate(token)).unwrap();

      dispatch(login(user));
      dispatch(setUser(user));
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <h1>Users</h1>
      <h2>Login</h2>
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
            value="1.aA+/*"
          />
        </label>
        <Button
          text="Login"
          type="submit"
          disabled={isLoading}
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
