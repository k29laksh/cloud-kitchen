"use client"

import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserData {
  userId: string;
  name?: string;
  email?: string;
}

export const authApi = createApi({
  reducerPath: 'User',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),

  tagTypes: ['User'], 

  endpoints: (builder) => ({
    // Login mutation
    login: builder.mutation<User, LoginData>({
      query: (data) => ({
        url: `/customerLogin`,
        method: 'POST',
        body: data,
      }),
    }),

    // Register mutation
    register: builder.mutation<User, RegisterData>({
      query: (data) => ({
        url: `customerRegister`,
        method: 'POST',
        body: data,
      }),
    }),

    // Fetch all users query
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: '/getAllUsers',
      }),
      providesTags: [{ type: 'User', id: 'LIST' }], // Provide tags with 'id'
      keepUnusedDataFor: 5,
    }),

    // Delete a user mutation
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }], // Invalidate the 'User' list
    }),

    // Update user mutation
    updateUser: builder.mutation<void, UpdateUserData>({
      query: (data) => ({
        url: `/${data.userId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }], // Invalidate the 'User' list to refetch users
    }),
  }),
});

// Export hooks for each API call
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = authApi;
