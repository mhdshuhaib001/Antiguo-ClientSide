import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AdminLoginRequest, AdminLoginResponse } from '../../interface/adminTypes/adminApiTypes';
import { User } from '../../interface/userTypes/apiTypes';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8001',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    adminLogin: builder.mutation<AdminLoginResponse, AdminLoginRequest>({
      query: (loginData) => ({
        url: '/api/auth/admin-login',
        method: 'POST',
        body: loginData,
      }),
    }),
    fetchAllUsers: builder.query<any, void>({
      query: () => ({
        url: '/api/admin/get-user',
        method: 'GET',
      }),
    }),
    updateUserStatus: builder.mutation<any, { userId: string }>({
      query: ({ userId }) => ({
        url: `/api/admin/user-status`,
        method: 'POST',
        body: { userId },
      }),
    }),
  }),
});

export const { useAdminLoginMutation, useFetchAllUsersQuery, useUpdateUserStatusMutation } =
  adminApi;
