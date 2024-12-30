import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const ratingApi = createApi({
  reducerPath: "ratingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://quvna.dominantsoftdevelopment.uz/", // Replace with the actual base URL
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFiftyAllUc: builder.query({
      query: () => "/rating/fiftyAllUc",
    }),
    getFiftyAllSteam: builder.query({
      query: () => "/rating/fiftyAllSteam",
    }),
    getFiftyAllML: builder.query({
      query: () => "/rating/fiftyAllML",
    }),
  }),
});

export const {
  useGetFiftyAllUcQuery,
  useGetFiftyAllSteamQuery,
  useGetFiftyAllMLQuery,
} = ratingApi;
