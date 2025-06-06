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
    following_count: 0,
    follower_count: 0,
  },
  created_at: "",
  updated_at: "",
};

const bioSlice = createSlice({
  name: "userBio",
  initialState,
  reducers: {
    setBio: (_, action: PayloadAction<UserBioAvatar>) => {
      const payload = action.payload;

      if (!payload.avatar || !payload.avatar.file_path || payload.avatar.file_path.trim() === "") {
        return {
          ...payload,
          avatar: {
            file_path: avatarPath(payload.user.first_name, payload.user.last_name),
          },
        };
      }

      return payload;
    },

    deleteAvatar: (state) => {
      state.avatar = {
        file_path: avatarPath(state.user.first_name, state.user.last_name),
      };
    },

    loggingOutUserBio: () => {
      return initialState;
    },
  },
  selectors: {
    getBio: (state) => state,
    getAvatar: (state) => state.avatar,
  },
});

export const { setBio, deleteAvatar, loggingOutUserBio } = bioSlice.actions;
export const { getBio, getAvatar } = bioSlice.selectors;
export default bioSlice.reducer;
