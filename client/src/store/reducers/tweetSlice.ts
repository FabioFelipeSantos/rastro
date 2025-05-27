import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Tweet } from "../../types/tweet";

const initialState: Tweet[] = [];

const tweetSlice = createSlice({
  name: "tweets",
  initialState,
  reducers: {
    setTweets: (_, action: PayloadAction<Tweet[]>) => {
      return action.payload;
    },
    addTweet: (state, action: PayloadAction<Tweet>) => {
      state.push(action.payload);
    },
    addStatisticTweet: (
      state,
      action: PayloadAction<{ id: Tweet["id"]; type: "likes" | "dislikes" | "re_tweets" | "shares" }>,
    ) => {
      const tweet = state.find((tweet) => tweet.id === action.payload.id);

      if (tweet) {
        tweet.statistics[action.payload.type]++;
      }
    },
    removeStatisticTweet: (
      state,
      action: PayloadAction<{ id: Tweet["id"]; type: "likes" | "dislikes" | "re_tweets" | "shares" }>,
    ) => {
      const tweet = state.find((tweet) => tweet.id === action.payload.id);

      if (tweet) {
        tweet.statistics[action.payload.type]--;
      }
    },
  },
  selectors: {
    allTweets: (state) => state,
  },
});

export const { setTweets, addTweet, addStatisticTweet, removeStatisticTweet } = tweetSlice.actions;
export const { allTweets } = tweetSlice.selectors;
export default tweetSlice.reducer;
