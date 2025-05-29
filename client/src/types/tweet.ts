import type { User } from "./user";

export type TweetStatistics = {
  likes: number;
  re_tweets: number;
  dislikes: number;
  shares: number;
};

export type TweetCreate = {
  text: string;
};

export type Tweet = {
  id: number;
  text: string;
  user: Pick<User, "id" | "nickname" | "first_name" | "last_name" | "email">;
  statistics: TweetStatistics;
  created_at: string;
  updated_at: string;
};

export type TweetStatisticsFromServer = {
  tweet_id: Tweet["id"];
  statistics: TweetStatistics;
};
