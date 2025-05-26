import { configureStore, type ThunkAction, type Action } from "@reduxjs/toolkit";

import userReducer from "./reducers/user/userSlice";
import themeReducer from "./reducers/themeSlice";
import authReducer from "./reducers/user/authSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
    auth: authReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
