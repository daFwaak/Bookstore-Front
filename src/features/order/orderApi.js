import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/apiUrls";

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/orders` }),
  tagTypes: ['Order'],  // Define tag types for invalidation
  endpoints: (builder) => ({

    getOrders: builder.query({
      query: (token) => ({
        url: '/',
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },  // Consistent Authorization format
      }),
      providesTags: ['Order'],
    }),

    getOrderById: builder.query({
      query: ({ id, token }) => ({
        url: `/${id}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },  // Added token for security
      }),
      providesTags: ['Order'],
    }),

    getUserOrders: builder.query({
      query: ({ id, token }) => ({
        url: `/users/${id}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },  
      }),
      providesTags: ['Order'],
    }),

    createOrder: builder.mutation({
      query: ({ body, token }) => ({
        url: '/',
        method: 'POST',
        body,
        headers: { Authorization: `Bearer ${token}` },  
      }),
      invalidatesTags: ['Order'],  // Ensures orders update after creation
    }),

  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
} = orderApi;
