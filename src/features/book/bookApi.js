import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../../app/apiUrls';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/books` }),
  endpoints: (builder) => ({

    getBooks: builder.query({
      query: () => ({
        url: '/',
        method: 'GET'
      }),
      providesTags: ['Book'],
    }),

    getBook: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET'
      }),
      providesTags: ['Book'],
    }),
    
    addBook: builder.mutation({
      query: ({ body, token }) => ({
        url: '/',
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      }),
      invalidatesTags: ['Book'],
    }),
    
    updateBook: builder.mutation({
      query: ({ id, body, token }) => ({
        url: `/${id}`, 
        method: 'PATCH',
        body,  
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      }),
      invalidatesTags: ['Book'],
    }),

    removeBook: builder.mutation({
      query: ({ id, token }) => ({
        url: `/${id}`,  
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      }),
      invalidatesTags: ['Book'],
    }),

  }),
})

export const { 
  useGetBooksQuery, 
  useAddBookMutation, 
  useRemoveBookMutation, 
  useGetBookQuery, 
  useUpdateBookMutation 
} = bookApi;
