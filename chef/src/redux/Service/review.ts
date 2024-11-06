"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/v1/food/review",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.userInfo?.access;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      console.log(token);
    }
    return headers;
  },
});

export const reviewApi = createApi({
  reducerPath: "reviewApi",

  baseQuery: baseQueryWithAuth,
  tagTypes: ["review"],

  endpoints: (builder) => ({
    // view all reviews
    getAllreviews: builder.query({
      query: (id) => `/review/${id}`,

      providesTags: [{ type: "review", id: "LIST" }],
    }),

    // create review
    createreview: builder.mutation({
      query: ({ id, content }) => ({
        url: `/reviews/${id}`,
        method: "POST",
        body: content,
      }),
      invalidatesTags: [{ type: "review", id: "LIST" }],
    }),

    deletereview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "review", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllreviewsQuery,
  useCreatereviewMutation,
  useDeletereviewMutation,
} = reviewApi;
