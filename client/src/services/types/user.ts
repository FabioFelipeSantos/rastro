import type { FollowingUserSliceState } from "../../store/reducers/user/userSlice";
import type { ProfileUpdateResponse, User, UserProfile, UserResponseLogin } from "../../types/user";
import type { ApiBaseResponse } from "./apiBaseResponse";

export interface UserResponse extends ApiBaseResponse {
  data: User | null;
}

export interface UserListResponse extends ApiBaseResponse {
  data: User[] | null;
}

export interface UserLoginServerResponse extends ApiBaseResponse {
  data: UserResponseLogin | null;
}

export interface UserProfileResponse extends ApiBaseResponse {
  data: UserProfile | null;
}

export interface UpdateUserProfileResponse extends ApiBaseResponse {
  data: ProfileUpdateResponse | null;
}

export interface AllFollowingUsersResponse extends ApiBaseResponse {
  data: FollowingUserSliceState[] | null;
}

export interface FollowAnUserResponse extends ApiBaseResponse {
  data: Record<"follower" | "followed", Pick<User, "id" | "nickname">> | null;
}

export interface UnfollowAnUserResponse extends ApiBaseResponse {
  data: Record<"unfollower" | "unfollowed", Pick<User, "id" | "nickname">> | null;
}
