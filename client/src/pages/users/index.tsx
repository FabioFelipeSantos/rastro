import { useEffect, type ReactNode } from "react";
import { CircleLoader } from "react-spinners";

import { useGetTweetsQuery } from "../../services/tweetApiSlice";
import { useAppDispatch } from "../../store/hooks";
import { setTweets } from "../../store/reducers/tweetSlice";

export const Users = () => {
  const token = localStorage.getItem("token") as string;
  const { data: tweets, isSuccess, isLoading, isError } = useGetTweetsQuery(token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setTweets(tweets));
    }
  }, [tweets, isSuccess, dispatch]);

  let content: ReactNode;

  if (isLoading) {
    content = (
      <CircleLoader
        size={80}
        color="#42f"
      />
    );
  }

  if (isError) {
    content = <h2>Deu erro na requisição dos tweets</h2>;
  }

  if (isSuccess) {
    content = tweets.map((tweet) => (
      <div key={tweet.id}>
        <div>
          <h3>{tweet.user.nickname}</h3>
          <span>{tweet.user.email}</span>
        </div>
        <p>{tweet.text}</p>
      </div>
    ));
  }
  return (
    <>
      <h1>Users</h1>
      {content}
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
