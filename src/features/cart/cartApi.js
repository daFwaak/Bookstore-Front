import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/apiUrls";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/cart`,
    prepareHeaders: (headers, { getState }) => {
      const user = getState().userSlice.user; // Get user from Redux state
      if (user && user.token) {
        headers.set("Authorization", `Bearer ${user.token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCart: builder.query({ 
      query: () => ({ url: "/", method: "GET" })
    }),
    addToCart: builder.mutation({
      query: ({ userId, items }) => ({
        url: "/",
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ userId, items }), 
      }),
    }),
    
    updateCart: builder.mutation({
      query: ({ bookId, quantity }) => ({
        url: `/${bookId}`,
        method: "PATCH",
        body: { quantity },
      }),
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({ url: `/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
} = cartApi;
