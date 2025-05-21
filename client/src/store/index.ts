import { configureStore, type ThunkAction, type Action } from "@reduxjs/toolkit";

import userSlice from "./reducers/user/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
