import { getHeader } from "../utils/getHeader";
import { apiSlice } from "./apiSlice";
import type { UserBioResponse } from "./types/userBio";

export const userBioApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserBio: builder.query<UserBioResponse, string>({
      query: (token: string) => ({
        url: "/bio/",
        method: "GET",
        headers: getHeader(token),
      }),
    }),
  }),
});

export const { useGetUserBioQuery } = userBioApiSlice;
