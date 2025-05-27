import type { Tweet, TweetCreate } from "../types/tweet";
import { apiSlice } from "./apiSlice";
import type { TweetListResponse } from "./types/tweet";

export const tweetApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTweets: builder.query<Tweet[], string>({
      query: (token: string) => ({
        url: "/tweets",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse(res: TweetListResponse) {
        return res.data;
      },
    }),
    addTweet: builder.mutation<Tweet, TweetCreate>({
      query: (newTweet) => ({
        url: "/tweets/",
        method: "POST",
        // header''
      }),
    }),
  }),
});

export const { useGetTweetsQuery } = tweetApiSlice;
