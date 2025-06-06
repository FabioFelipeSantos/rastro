import type { Tweet, TweetReactions, TweetStatisticsFromServer } from "../../types/tweet";
import type { ApiBaseResponse } from "./apiBaseResponse";

export interface TweetListResponse extends ApiBaseResponse {
  data: Tweet[] | null;
}

export interface TweetResponse extends ApiBaseResponse {
  data: Tweet | null;
}

export interface TweetStatisticsResponse extends ApiBaseResponse {
  data: TweetStatisticsFromServer | null;
}

export interface TweetReactionsResponse extends ApiBaseResponse {
  data: TweetReactions | null;
}
