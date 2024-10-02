import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AdminLoginRequest, AdminLoginResponse ,AddCategoryRequest, FetchCategoriesResponse} from '../../interface/adminTypes/adminApiTypes';

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
    addCategory: builder.mutation<AddCategoryRequest, FormData>({
      query: (formData) => ({
        url: `/api/admin/categories`,
        method: 'POST',
        body: formData,
      
      }),
    }),
    fetchCategory:builder.query<FetchCategoriesResponse,void>({
      query:()=>({
        url:'api/admin/categories',
        method: 'GET'
      })
    }),
    updateCategory: builder.mutation<FetchCategoriesResponse, {id:string ; formData:FormData}>({
      query: ({ id, formData }) => ({
        url: `/api/admin/categories/${id}`,
        method: 'PUT',
        body: formData,
      }),
      
    }),
    
  }),
});

export const {
  useAdminLoginMutation,
  useFetchAllUsersQuery,
  useUpdateUserStatusMutation,
  useAddCategoryMutation,
  useFetchCategoryQuery,
  useUpdateCategoryMutation
} = adminApi;
