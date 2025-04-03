import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/apiUrls";


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/users` }),
  endpoints: (builder) => ({

    getUser: builder.query({
      query: (q) => ({
        url: `/${q.id}`,
        headers: {
          Authorization: `Bearer ${q.token}`  
        },
        method: 'GET'
      }),
      providesTags: ['User'],
    }),

    updateUser: builder.mutation({
      query: (q) => ({
        url: `/${q.id}`,
        body: q.body,
        headers: {
          Authorization: `Bearer ${q.token}`
        },
        method: 'PATCH'
      }),
      invalidatesTags: ['User'],
    }),

    loginUser: builder.mutation({
      query: (q) => ({
        url: '/login',
        body: q,
        method: 'POST'
      })
    }),
    registerUser: builder.mutation({
      query: (q) => ({
        url: '/register',
        body: q,
        method: 'POST'
      })
    })

  }),
})

export const { useLoginUserMutation, useRegisterUserMutation, useGetUserQuery, useUpdateUserMutation } = authApi;