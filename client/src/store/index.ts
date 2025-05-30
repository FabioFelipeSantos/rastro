import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/user/userSlice";
import userBioReducer from "./reducers/user/bioSlice";
import themeReducer from "./reducers/themeSlice";
import authReducer from "./reducers/user/authSlice";
import tweetReducer from "./reducers/tweetSlice";
import modalReducer from "./reducers/modalSlice";
import { apiSlice } from "../services/apiSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    userBio: userBioReducer,
    theme: themeReducer,
    auth: authReducer,
    tweet: tweetReducer,
    modal: modalReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
