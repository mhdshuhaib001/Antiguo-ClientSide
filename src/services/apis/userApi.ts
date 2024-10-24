import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthRequest, AuthResponse } from '../../interface/userTypes/apiTypes';
import { getToken } from '../../utils/getHelper';
import { Address } from '../../interface/userTypes/apiTypes';
import { Category } from '../../interface/adminTypes/adminApiTypes';

export const ApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8001',
    credentials: 'include',
    prepareHeaders: (headers ) => {
      const token = getToken();

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    isBlocked: builder.query<boolean, void>({
      query: () => '/api/auth/isBlocked',
    }),
    signup: builder.mutation<AuthResponse, AuthRequest>({
      query: (signupData) => ({
        url: '/api/auth/signup',
        method: 'POST',
        body: signupData,
      }),
    }),
    sendOtp: builder.mutation<void, { email: string; otp: number }>({
      query: (otpData) => ({
        url: '/api/auth/send-otp',
        method: 'POST',
        body: otpData,
      }),
    }),
    login: builder.mutation<AuthResponse, AuthRequest>({
      query: (loginData) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: loginData,
      }),
    }),
    googleAuth: builder.mutation<AuthResponse, { idToken: string }>({
      query: (tokenData) => ({
        url: '/api/auth/google-auth',
        method: 'POST',
        body: tokenData,
      }),
    }),
    emailSend: builder.mutation<AuthResponse, { email: string }>({
      query: (emailData) => ({
        url: '/api/auth/forget-password-request',
        method: 'POST',
        body: emailData,
      }),
    }),
    forgetPassword: builder.mutation<AuthResponse, { token: string; newPassword: string }>({
      query: (newPasswordData) => ({
        url: '/api/auth/forget-password',
        method: 'POST',
        body: newPasswordData,
      }),
    }),
    addAddress: builder.mutation<AuthResponse, { address: Address }>({
      query: (addressData) => ({
        url: '/api/user/address',
        method: 'POST',
        body: addressData,
      }),
    }),
    updateAddress: builder.mutation<AuthResponse, { id: string; address: Address }>({
      query: ({ id, address }) => ({
        url: `/api/user/address/${id}`,
        method: 'PUT',
        body: address,
      }),
    }),
    deleteAddress: builder.mutation({
      query: ( id ) => ({
        url: `/api/user/address/${id}`,
        method: 'DELETE',
      }),
    }),
    getAddress: builder.query<Address[], string>({
      query: (userId) => `/api/user/address/${userId}`,
    }),
    updateProfile: builder.mutation<AuthResponse, FormData>({
      query: (formData) => ({
        url: `/api/user/user`,
        method: 'PUT',
        body: formData,
      }),
    }),
    fetchUserById: builder.query<AuthResponse, string>({
      query: (userId) => `/api/user/user/${userId}`,
    }),
    fetchCategories: builder.query<Category[], void>({
      query: () => '/api/user/categories',
    }),
    subscribeNotification: builder.mutation<void, { auctionId: string; userId: string; fcmToken: string |null}>({
      query: (notificationData) => ({
        url: '/api/user/subscribe-notification',
        method: 'POST',
        body: notificationData,
      }),
    }),


  }),
});

export const {
  useSignupMutation,
  useSendOtpMutation,
  useLoginMutation,
  useGoogleAuthMutation,
  useEmailSendMutation,
  useForgetPasswordMutation,
  useIsBlockedQuery,
  useAddAddressMutation,
  useGetAddressQuery,
  useUpdateProfileMutation,
  useFetchUserByIdQuery,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useFetchCategoriesQuery,
  useSubscribeNotificationMutation,
} = ApiSlice;
