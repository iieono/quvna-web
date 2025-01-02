import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const extrasApi = createApi({
  reducerPath: "extrasApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://quvna.dominantsoftdevelopment.uz/", // Replace with your actual API base URL
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); // Assuming localStorage is available
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getRegions: builder.query({
      query: () => "/region", // Endpoint to fetch all regions
    }),
    getRegionById: builder.query({
      query: (id) => `/region/${id}`, // Endpoint to fetch a specific region by ID
    }),
    getPrivacyPolicy: builder.query({
      query: () => "/doc/privacy-policy", // Endpoint to fetch the privacy policy
    }),
    getAdvertisements: builder.query({
      query: (type) => `/advertising/getAll?type=${type}`, // Endpoint to fetch advertisements by type
    }),
  }),
});

export const {
  useGetRegionsQuery,
  useGetRegionByIdQuery,
  useGetPrivacyPolicyQuery,
  useGetAdvertisementsQuery,
} = extrasApi;
