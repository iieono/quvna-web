import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return window?.localStorage.getItem("token");
  }
  return null;
};

export const ratingApi = createApi({
  reducerPath: "ratingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://quvna.dominantsoftdevelopment.uz/",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    responseHandler: async (response) => {
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("image")) {
        return response.blob();
      }
      return response.json();
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
    getAttachment: builder.query<Blob, string>({
      query: (id) => ({
        url: `/attachment/${id}?view=inline`,
        responseType: "blob",
      }),
    }),
    uploadAttachment: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file); // Assuming 'file' is a Blob or File object

        return {
          url: "/attachment/upload?filePath=user-image",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useGetFiftyAllUcQuery,
  useGetFiftyAllSteamQuery,
  useGetFiftyAllMLQuery,
  useGetAttachmentQuery,
  useUploadAttachmentMutation,
} = ratingApi;
