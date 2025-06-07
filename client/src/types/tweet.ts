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
  user: Pick<User, "id" | "first_name" | "last_name" | "nickname" | "avatar_url"> & {
    following_count: number;
    follower_count: number;
  };
  statistics: TweetStatistics;
  created_at: string;
  updated_at: string;
};

export type TweetStatisticsFromServer = {
  tweet_id: Tweet["id"];
  statistics: TweetStatistics;
};

type Reactions = "like" | "dislike" | "retweet" | "share";

export type TweetReactions = Record<Reactions, boolean>;
