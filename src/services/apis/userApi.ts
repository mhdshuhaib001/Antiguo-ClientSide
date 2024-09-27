import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthRequest, AuthResponse } from '../../interface/userTypes/apiTypes';
import { getToken } from '../../utils/getHelper'


export const ApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8001',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = getToken();
      console.log(token,'userApiTokenchjekkjfn kgjv')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      headers.set('Content-Type', 'application/json');
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
} = ApiSlice;
