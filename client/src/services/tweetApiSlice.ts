import type { TweetCreate } from "../types/tweet";
import { apiSlice } from "./apiSlice";
import type { TweetListResponse, TweetResponse, TweetStatisticsResponse } from "./types/tweet";
import { getHeader } from "../utils/getHeader";

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
    sendATweetAction: builder.mutation<
      TweetStatisticsResponse,
      { token: string; action: "like" | "dislike" | "share" | "retweet" }
    >({
      query: ({ token, action }) => ({
        url: `/tweets/${action}/`,
        method: "POST",
        headers: getHeader(token),
      }),
    }),
  }),
});

export const { useGetTweetsQuery, useAddTweetMutation, useSendATweetActionMutation } = tweetApiSlice;
