import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return window?.localStorage.getItem("token");
  }
  return null;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://quvna.dominantsoftdevelopment.uz/", // Replace with your actual API base URL
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login", // Endpoint for login
        method: "POST",
        body: {
          phoneNumber: credentials.phoneNumber,
          password: credentials.password,
        },
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/api/auth/register", // Updated the endpoint path for registration
        method: "POST",
        body: {
          phoneNumber: userInfo.phoneNumber,
          email: userInfo.email,
          password: userInfo.password,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
        },
      }),
    }),
    getUserProfile: builder.query({
      query: (userId) => `/user/profile/${userId}`, // New route for getting user profile
    }),
    deleteUserAccount: builder.mutation({
      query: (id) => ({
        url: `/user/${id}/delete-account`, // DELETE account endpoint
        method: "DELETE",
      }),
    }),
    sendSms: builder.query({
      query: ({ phoneNumber, isForgot }) => ({
        url: `/api/auth/sms?phoneNumber=${encodeURIComponent(
          phoneNumber
        )}&isForgot=${isForgot}`,
        method: "GET",
      }),
    }),
    // Add additional endpoints here when you provide them
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserProfileQuery,
  useDeleteUserAccountMutation,
  useSendSmsQuery,
} = authApi;
