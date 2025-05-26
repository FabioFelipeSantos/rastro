import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../../../types/user";

const initialState: AuthState = {
  currentUser: {
    id: "",
    first_name: "",
    last_name: "",
    nickname: "",
    email: "",
    is_active: false,
    is_admin: false,
    role: "",
    created_at: "",
    updated_at: "",
  },
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
  selectors: {
    isAuthenticated: (state) => state.isAuthenticated,
  },
});

export const { login, logout } = authSlice.actions;
export const { isAuthenticated } = authSlice.selectors;

export default authSlice.reducer;
