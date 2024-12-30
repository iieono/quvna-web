import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ratingApi = createApi({
  reducerPath: 'ratingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://quvna.dominantsoftdevelopment.uz/', // Replace with the actual base URL
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token'); // Assuming authentication via token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFiftyAllUc: builder.query({
      query: () => '/rating/fiftyAllUc',
    }),
    getFiftyAllSteam: builder.query({
      query: () => '/rating/fiftyAllSteam',
    }),
    getFiftyAllML: builder.query({
      query: () => '/rating/fiftyAllML',
    }),
  }),
});

export const {
  useGetFiftyAllUcQuery,
  useGetFiftyAllSteamQuery,
  useGetFiftyAllMLQuery,
} = ratingApi;
