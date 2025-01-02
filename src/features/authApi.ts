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
    sendSms: builder.mutation({
      query: ({ phoneNumber, isForgat }) => {
        const phoneNumberWithoutSpaces = phoneNumber.replace(/\s+/g, "");

        // Construct the query string with parameters
        const urlParams = new URLSearchParams({
          phoneNumber: phoneNumberWithoutSpaces,
          isForgat: String(isForgat), // Convert boolean to string for URL
        }).toString();

        return {
          url: `/api/auth/sms?${urlParams}`, // Append parameters to URL
          method: "POST", // Keep as POST
        };
      },
    }),

    editUserProfile: builder.mutation({
      query: ({
        userId,
        firstName,
        lastName,
        gameID,
        playName,
        steamName,
        mobileLegendsName,
        attachmentId,
      }) => ({
        url: `/user/edit/${userId}`, // Edit user profile endpoint
        method: "PATCH", // Use PATCH method for partial updates
        body: {
          firstName,
          lastName,
          gameID,
          playName,
          steamName,
          mobileLegendsName,
          attachmentId,
        },
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
  useSendSmsMutation,
  useEditUserProfileMutation,
} = authApi;
