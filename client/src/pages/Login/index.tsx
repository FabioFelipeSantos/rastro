import { useForm } from "react-hook-form";

import { useUserLoginMutation } from "../../services/userApiSlice";
// import { userBioApiSlice } from "../../services/userBioApiSlice";
import { useAppDispatch } from "../../store/hooks";
import { login } from "../../store/reducers/user/authSlice";
// import { setUser } from "../../store/reducers/user/userSlice";
// import { setBio } from "../../store/reducers/user/bioSlice";

import { Input } from "../../components/form/Input";
import { Button } from "../../components/Button";
import type { UserLogin } from "../../types/user";

export const Login = () => {
  const { register, handleSubmit, getValues } = useForm({
    mode: "all",
  });
  const [userLogin, { isLoading }] = useUserLoginMutation();

  const dispatch = useAppDispatch();

  const handleLogIn = async () => {
    const loginInfo = getValues() as UserLogin;

    try {
      const result = await userLogin({
        nickname_or_email: loginInfo.nickname_or_email,
        password: loginInfo.password,
      }).unwrap();

      if (!result.data) {
        throw new Error(result.message);
      }

      const { access: token } = result.data;

      localStorage.setItem("token", token);

      // const user = await dispatch(userApiSlice.endpoints.getLoggedUser.initiate(token)).unwrap();
      // const userBio = await dispatch(userBioApiSlice.endpoints.getUserBio.initiate(token)).unwrap();

      dispatch(login(token));
      // dispatch(setUser(user));
      // dispatch(setBio(userBio));
    } catch (e) {
      console.log(e);
    }
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
