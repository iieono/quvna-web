import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return window?.localStorage.getItem("token");
  }
  return null;
};

export const checkApi = createApi({
  reducerPath: "checkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://quvna.dominantsoftdevelopment.uz/",
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
    check: builder.query({
      query: (type) => ({
        url: "/check",
        params: { type },
      }),
    }),
    checkByUserId: builder.query({
      query: (userId) => `/check/${userId}`,
    }),
    checkByOrderId: builder.query({
      query: (orderId) => `/check/get/${orderId}`,
    }),
    orderListByUserIdAndProductType: builder.query({
      query: ({ userId, productType }) =>
        `/order/list/${userId}?productType=${productType}`,
    }),
  }),
});

export const {
  useCheckQuery,
  useCheckByUserIdQuery,
  useCheckByOrderIdQuery,
  useOrderListByUserIdAndProductTypeQuery,
} = checkApi;
