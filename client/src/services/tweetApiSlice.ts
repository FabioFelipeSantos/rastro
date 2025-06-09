import type { Tweet, TweetCreate } from "../types/tweet";
import { apiSlice } from "./apiSlice";
import type { TweetListResponse, TweetReactionsResponse, TweetResponse, TweetStatisticsResponse } from "./types/tweet";
import { getHeader } from "../utils/getHeader";

export type TweetActionsArgs = {
  token: string;
  tweet_id: number;
  action: "like" | "dislike" | "share" | "retweet";
};

export type RetweetArgs = {
  token: string;
  tweetId: Tweet["id"];
  newTweet: TweetCreate;
};

enum RemovingActions {
  like = "unlike",
  dislike = "remove-dislike",
  retweet = "remove-retweet",
  share = "remove-share",
}

export const tweetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTweets: builder.query<TweetListResponse, string>({
      query: (token: string) => ({
        url: "/tweets",
        method: "GET",
        headers: getHeader(token),
      }),
    }),
    addTweet: builder.mutation<TweetResponse, { newTweet: TweetCreate; token: string }>({
      query: ({ newTweet, token }) => ({
        url: "/tweets/",
        method: "POST",
        headers: getHeader(token),
        body: newTweet,
      }),
    }),
    sendATweetAction: builder.mutation<TweetStatisticsResponse, TweetActionsArgs>({
      query: ({ token, tweet_id, action }) => ({
        url: `/tweets/${tweet_id}/${action}/`,
        method: "POST",
        headers: getHeader(token),
      }),
    }),
    removeTweetAction: builder.mutation<TweetStatisticsResponse, TweetActionsArgs>({
      query: ({ token, tweet_id, action }) => ({
        url: `tweets/${tweet_id}/${RemovingActions[action]}/`,
        method: "POST",
        headers: getHeader(token),
      }),
    }),
    reactionsByUser: builder.query<TweetReactionsResponse, { tweetId: number; token: string }>({
      query: ({ tweetId, token }) => ({
        url: `/tweets/${tweetId}/reacted-by-user`,
        method: "GET",
        headers: getHeader(token),
      }),
    }),
    getAllTweets: builder.query<TweetListResponse, string>({
      query: (token) => ({
        url: "/tweets/all/",
        method: "GET",
        headers: getHeader(token),
      }),
    }),
    getAllAssociatedTweets: builder.query<
      TweetListResponse,
      { token: string; tweetId: number; type?: "retweet" | "share" }
    >({
      query: ({ token, tweetId, type }) => ({
        url: `/tweets/${tweetId}/associated-tweets${type ? `?type=${type}` : ""}`,
        method: "GET",
        headers: getHeader(token),
      }),
    }),
    addRetweet: builder.mutation<TweetResponse, RetweetArgs>({
      query: ({ token, tweetId, newTweet }) => ({
        url: `/tweets/${tweetId}/retweet/`,
        method: "POST",
        headers: getHeader(token),
        body: newTweet,
      }),
    }),
  }),
});

export const {
  useGetTweetsQuery,
  useAddTweetMutation,
  useSendATweetActionMutation,
  useReactionsByUserQuery,
  useGetAllTweetsQuery,
  useGetAllAssociatedTweetsQuery,
  useAddRetweetMutation,
  useRemoveTweetActionMutation,
} = tweetApiSlice;
