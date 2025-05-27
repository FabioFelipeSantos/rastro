import type { User, UserCreate, UserLogin } from "../types/user";
import { apiSlice } from "./apiSlice";
import { type UserListResponse, type UserLoginServerResponse, type UserResponse } from "./types/user";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users/",
      transformResponse(res: UserListResponse) {
        return res.data;
      },
    }),
    getLoggedUser: builder.query<User, string>({
      query: (token) => ({
        url: "/users/me/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse(res: UserResponse) {
        return res.data;
      },
    }),
    addNewUser: builder.mutation<User, UserCreate>({
      query: (newUser) => ({
        url: "/users/",
        method: "POST",
        body: newUser,
      }),
      transformResponse(res: UserResponse) {
        return res.data;
      },
    }),
    userLogin: builder.mutation<string, UserLogin>({
      query: (user) => ({
        url: "/auth/login/",
        method: "POST",
        body: {
          username_or_email: user.nickname_or_email,
          password: user.password,
        },
      }),
      transformResponse(res: UserLoginServerResponse) {
        return res.data.access;
      },
    }),
  }),
});

export const { useGetUsersQuery, useAddNewUserMutation, useUserLoginMutation, useGetLoggedUserQuery } = userApiSlice;
