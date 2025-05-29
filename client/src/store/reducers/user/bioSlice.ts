import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserBioAvatar } from "../../../types/user";
import { avatarPath } from "../../../utils/getAvatarUrlPath";

const initialState: UserBioAvatar = {
  id: 0,
  text: "",
  city: "",
  state: "",
  country: "",
  avatar: {
    file_path: "",
  },
  user: {
    id: "",
    first_name: "",
    last_name: "",
  },
  created_at: "",
  updated_at: "",
};

const bioSlice = createSlice({
  name: "userBio",
  initialState,
  reducers: {
    setBio: (_, action: PayloadAction<UserBioAvatar>) => {
      return action.payload;
    },
    deleteAvatar: (state) => {
      state.avatar = {
        file_path: avatarPath(state.user.first_name, state.user.last_name),
      };
    },
  },
  selectors: {
    getBio: (state) => state,
    getAvatar: (state) => state.avatar,
  },
});

export const { setBio, deleteAvatar } = bioSlice.actions;
export const { getBio, getAvatar } = bioSlice.selectors;
export default bioSlice.reducer;
