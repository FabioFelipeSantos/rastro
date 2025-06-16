import { useCallback, useEffect, useState, type FC } from "react";

import { WidgetsContainerStyles, WidgetBox } from "./styles";
import { Input } from "../../form/Input";
import { useAppSelector } from "../../../store/hooks";
import { allTweets } from "../../../store/reducers/tweetSlice";
import type { Tweet } from "../../../types/tweet";
import { useNavigate } from "react-router-dom";

export const Widgets: FC = () => {
  const navigate = useNavigate();
  const tweets = useAppSelector(allTweets);
  const [randomUser, setRandomUser] = useState<Tweet["user"] | null>(null);

  const selectRandomUser = useCallback(() => {
    if (tweets && tweets.length > 0) {
      const randomIndex = Math.floor(Math.random() * tweets.length);
      setRandomUser(tweets[randomIndex].user);
    }
  }, [tweets]);

  useEffect(() => {
    selectRandomUser();
    const intervalId = setInterval(
      () => {
        selectRandomUser();
      },
      5 * 60 * 1000,
    );
    return () => clearInterval(intervalId);
  }, [tweets, selectRandomUser]);

  const handleFollowClick = (id: Tweet["user"]["id"]) => {
    navigate(`/main/profile/${id}`);
  };

  return (
    <WidgetsContainerStyles>
      <WidgetBox>
        <Input
          type="search"
          placeholder="Buscar no Twitter"
        />
      </WidgetBox>

      <WidgetBox>
        <h3>O que está acontecendo</h3>
        <p>#ReactDev</p>
        <p>#TypeScriptÉVida</p>
      </WidgetBox>

      {randomUser && (
        <WidgetBox>
          <h3>Quem seguir</h3>
          <p onClick={() => handleFollowClick(randomUser.id)}>
            {randomUser.first_name} · @{randomUser.nickname}
          </p>
        </WidgetBox>
      )}
    </WidgetsContainerStyles>
  );
};
