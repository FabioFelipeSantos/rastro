import type { UserCreate, UserLogin } from "../types/user";
import { apiSlice } from "./apiSlice";
import { type UserListResponse, type UserLoginServerResponse, type UserResponse } from "./types/user";
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
  }),
});

export const { useGetUsersQuery, useAddNewUserMutation, useUserLoginMutation, useGetLoggedUserQuery } = userApiSlice;

export type AA = ReturnType<typeof useGetUsersQuery>;
