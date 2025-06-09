import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { User } from "../../../types/user";

export type FollowingUserSliceState = { user_id: User["id"]; nickname: User["nickname"] };

type UserSliceState = {
  user: User;
  followingUsers: FollowingUserSliceState[];
};

const initialState: UserSliceState = {
  user: {
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
  },
  followingUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    loggingOutUser: (state) => {
      state.user = initialState.user;
      state.followingUsers = initialState.followingUsers;
    },
    setFollowingUsers: (state, action: PayloadAction<UserSliceState["followingUsers"]>) => {
      state.followingUsers = action.payload;
    },
    addFollowingUser: (state, action: PayloadAction<FollowingUserSliceState>) => {
      state.followingUsers.push(action.payload);
    },
    removeFollowingUser: (state, action: PayloadAction<User["id"]>) => {
      state.followingUsers = state.followingUsers.filter((followed) => followed.user_id !== action.payload);
    },
  },
  selectors: {
    user: (state) => state.user,
    followingUsers: (state) => state.followingUsers,
  },
});

export const { setUser, loggingOutUser, setFollowingUsers, addFollowingUser, removeFollowingUser } = userSlice.actions;
export const { user, followingUsers } = userSlice.selectors;

export default userSlice.reducer;
