import { TweetForm } from "../../components/TweetForm";
import { Login } from "../Login";

export const Users = () => {
  return (
    <>
      <h1>Users</h1>
      <Login />
      <TweetForm />
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
