import type { Tweet } from "../../types/tweet";
import type { ApiBaseResponse } from "./apiBaseResponse";

export interface TweetListResponse extends ApiBaseResponse {
  data: Tweet[];
}

export interface TweetResponse extends ApiBaseResponse {
  data: Tweet;
}
