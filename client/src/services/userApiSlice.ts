import type { ProfileUpdate, UserCreate, UserLogin } from "../types/user";
import { apiSlice } from "./apiSlice";
import type {
  UpdateUserProfileResponse,
  UserListResponse,
  UserLoginServerResponse,
  UserProfileResponse,
  UserResponse,
  AllFollowingUsersResponse,
  FollowAnUserResponse,
  UnfollowAnUserResponse,
} from "./types/user";
import { getHeader } from "../utils/getHeader";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserListResponse, void>({
      query: () => "/users/",
    }),
    getLoggedUser: builder.query<UserResponse, string>({
      query: (token) => ({
        url: "/users/me/",
        method: "GET",
        headers: getHeader(token),
      }),
    }),
    addNewUser: builder.mutation<UserResponse, UserCreate>({
      query: (newUser) => ({
        url: "/users/",
        method: "POST",
        body: newUser,
      }),
    }),
    userLogin: builder.mutation<UserLoginServerResponse, UserLogin>({
      query: (user) => ({
        url: "/auth/login/",
        method: "POST",
        body: {
          username_or_email: user.nickname_or_email,
          password: user.password,
        },
      }),
    }),
    userProfile: builder.query<UserProfileResponse, { token: string; userId: string }>({
      query: ({ token, userId }) => ({
        url: `/users/${userId}/profile/`,
        method: "GET",
        headers: getHeader(token),
      }),
    }),
    updateProfile: builder.mutation<UpdateUserProfileResponse, { token: string; updateInfo: ProfileUpdate }>({
      query: ({ token, updateInfo }) => {
        const isFormData = updateInfo instanceof FormData;

        return {
          url: "/users/profile/",
          method: "PUT",
          headers: getHeader(token, isFormData),
          body: updateInfo,
        };
      },
    }),
    getFollowingUsers: builder.query<AllFollowingUsersResponse, string>({
      query: (token) => ({
        url: "/users/following/",
        method: "GET",
        headers: getHeader(token),
      }),
    }),
    followAnUser: builder.mutation<FollowAnUserResponse, { token: string; userId: string }>({
      query: ({ token, userId }) => ({
        url: `/users/follow/${userId}/`,
        method: "POST",
        headers: getHeader(token),
      }),
    }),
    unfollowAnUser: builder.mutation<UnfollowAnUserResponse, { token: string; userId: string }>({
      query: ({ token, userId }) => ({
        url: `/users/unfollow/${userId}/`,
        method: "POST",
        headers: getHeader(token),
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUserLoginMutation,
  useGetLoggedUserQuery,
  useUserProfileQuery,
  useUpdateProfileMutation,
  useGetFollowingUsersQuery,
  useFollowAnUserMutation,
  useUnfollowAnUserMutation,
} = userApiSlice;

export type AA = ReturnType<typeof useGetUsersQuery>;
