import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "../../../types/user";

const initialState: AuthState = {
  token: "",
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState["token"]>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  selectors: {
    isAuthenticated: (state) => state.isAuthenticated,
    tokenFromState: (state) => state.token,
  },
});

export const { login, logout } = authSlice.actions;
export const { isAuthenticated, tokenFromState } = authSlice.selectors;

export default authSlice.reducer;
