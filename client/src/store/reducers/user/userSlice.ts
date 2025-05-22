import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { User } from "../../../types/user";

const initialState: User = {
  id: "",
  first_name: "",
  last_name: "",
  nickname: "",
  email: "",
  role: "",
  is_active: true,
  is_admin: false,
  created_at: new Date().toLocaleString("pt-br"),
  updated_at: new Date().toLocaleString("pt-br"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state = action.payload;
    },
  },
  selectors: {
    user: (state) => state,
  },
});

export const { setUser } = userSlice.actions;
export const { user } = userSlice.selectors;

export default userSlice.reducer;
