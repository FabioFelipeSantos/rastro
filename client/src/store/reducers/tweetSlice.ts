import { createSlice, createSelector, type PayloadAction } from "@reduxjs/toolkit";
import type { Tweet, TweetReactions } from "../../types/tweet";

type UserReactionsMap = Record<number, TweetReactions>;
type RetweetsMap = Record<number, Tweet[]>;

type ExpandedTweetInfo = {
  isExpanded: boolean;
  tweetId: number | null;
};

type TweetState = {
  userTweets: Tweet[];
  tweets: Tweet[];
  userReactions: UserReactionsMap;
  cachedRetweets: RetweetsMap;
  expandedTweet: ExpandedTweetInfo;
  retweetCacheCount: number;
};

const initialState: TweetState = {
  tweets: [],
  userTweets: [],
  userReactions: {},
  cachedRetweets: {},
  expandedTweet: {
    isExpanded: false,
    tweetId: null,
  },
  retweetCacheCount: 0,
};

const MAX_CACHED_RETWEET_ENTRIES = 100;

const tweetSlice = createSlice({
  name: "tweet",
  initialState,
  reducers: {
    setUserTweets: (state, action: PayloadAction<Tweet[]>) => {
      state.userTweets = action.payload;
    },
    setAllTweets: (state, action: PayloadAction<Tweet[]>) => {
      state.tweets = action.payload;
    },
    addTweet: (state, action: PayloadAction<Tweet>) => {
      state.userTweets.unshift(action.payload);
      state.tweets.unshift(action.payload);
    },
    addRetweet: (state, action: PayloadAction<Tweet>) => {
      state.userTweets.unshift(action.payload);
    },
    addStatisticTweet: (
      state,
      action: PayloadAction<{ id: Tweet["id"]; type: "likes" | "dislikes" | "re_tweets" | "shares" }>,
    ) => {
      const tweet = state.tweets.find((tweet) => tweet.id === action.payload.id);
      if (tweet) {
        tweet.statistics[action.payload.type]++;
      }

      const userTweet = state.userTweets.find((tweet) => tweet.id === action.payload.id);
      if (userTweet) {
        userTweet.statistics[action.payload.type]++;
      }

      Object.values(state.cachedRetweets).forEach((retweetList) => {
        const cachedTweet = retweetList.find((retweet) => retweet.id === action.payload.id);
        if (cachedTweet) {
          cachedTweet.statistics[action.payload.type]++;
        }
      });
    },
    removeStatisticTweet: (
      state,
      action: PayloadAction<{ id: Tweet["id"]; type: "likes" | "dislikes" | "re_tweets" | "shares" }>,
    ) => {
      const tweet = state.tweets.find((tweet) => tweet.id === action.payload.id);
      if (tweet) {
        tweet.statistics[action.payload.type] = Math.max(0, tweet.statistics[action.payload.type] - 1);
      }

      const userTweet = state.userTweets.find((tweet) => tweet.id === action.payload.id);
      if (userTweet) {
        userTweet.statistics[action.payload.type] = Math.max(0, userTweet.statistics[action.payload.type] - 1);
      }

      Object.values(state.cachedRetweets).forEach((retweetList) => {
        const cachedTweet = retweetList.find((retweet) => retweet.id === action.payload.id);
        if (cachedTweet) {
          cachedTweet.statistics[action.payload.type] = Math.max(0, cachedTweet.statistics[action.payload.type] - 1);
        }
      });
    },
    setUserReaction: (state, action: PayloadAction<{ tweetId: number; reactions: TweetReactions }>) => {
      const { tweetId, reactions } = action.payload;
      state.userReactions[tweetId] = reactions;
    },
    toggleUserReaction: (
      state,
      action: PayloadAction<{
        tweetId: number;
        reactionType: keyof TweetReactions;
        value: boolean;
      }>,
    ) => {
      const { tweetId, reactionType, value } = action.payload;

      if (!state.userReactions[tweetId]) {
        state.userReactions[tweetId] = {
          like: false,
          dislike: false,
          retweet: false,
          share: false,
        };
      }

      state.userReactions[tweetId][reactionType] = value;
    },
    setBulkUserReactions: (state, action: PayloadAction<UserReactionsMap>) => {
      state.userReactions = {
        ...state.userReactions,
        ...action.payload,
      };
    },
    setCachedRetweets: (state, action: PayloadAction<{ tweetId: number; retweets: Tweet[] }>) => {
      const { tweetId, retweets } = action.payload;

      if (Object.keys(state.cachedRetweets).length >= MAX_CACHED_RETWEET_ENTRIES) {
        state.cachedRetweets = {};
      }

      state.cachedRetweets[tweetId] = retweets;
      state.retweetCacheCount += 1;
    },
    toggleExpandRetweets: (state, action: PayloadAction<{ tweetId: number | null }>) => {
      const { tweetId } = action.payload;

      if (state.expandedTweet.tweetId === tweetId && state.expandedTweet.isExpanded) {
        state.expandedTweet = {
          isExpanded: false,
          tweetId: null,
        };
      } else {
        state.expandedTweet = {
          isExpanded: true,
          tweetId: tweetId,
        };
      }
    },
    addRetweetToCache: (state, action: PayloadAction<{ parentTweetId: number; newRetweet: Tweet }>) => {
      const { parentTweetId, newRetweet } = action.payload;

      if (state.cachedRetweets[parentTweetId]) {
        state.cachedRetweets[parentTweetId].unshift(newRetweet);
      } else {
        state.cachedRetweets[parentTweetId] = [newRetweet];
      }
    },
    loggingOutUserTweets: () => {
      return initialState;
    },
  },
  selectors: {
    userTweets: (state) => state.userTweets,
    allTweets: (state) => state.tweets,
    getUserReactions: (state) => state.userReactions,
    getCachedRetweetsByTweetId: (state, tweetId: number) => state.cachedRetweets[tweetId] || null,
    getExpandedTweetInfo: (state) => state.expandedTweet,
  },
});

export const {
  setUserTweets,
  setAllTweets,
  addTweet,
  addStatisticTweet,
  addRetweet,
  removeStatisticTweet,
  loggingOutUserTweets,
  setUserReaction,
  toggleUserReaction,
  setBulkUserReactions,
  setCachedRetweets,
  toggleExpandRetweets,
  addRetweetToCache,
} = tweetSlice.actions;

export const { allTweets, userTweets, getUserReactions, getCachedRetweetsByTweetId, getExpandedTweetInfo } =
  tweetSlice.selectors;

export const getUserReactionsByTweetId = createSelector(
  [getUserReactions, (_, tweetId: Tweet["id"]) => tweetId],
  (userReactions, tweetId) => {
    const DEFAULT_REACTIONS = {
      like: false,
      dislike: false,
      retweet: false,
      share: false,
    };

    return userReactions[tweetId] || DEFAULT_REACTIONS;
  },
);

export default tweetSlice.reducer;
