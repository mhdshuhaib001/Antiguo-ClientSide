import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthRequest, AuthResponse } from '../../interface/userTypes/apiTypes';

export const ApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
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
  }),
});

export const { useSignupMutation, useSendOtpMutation, useLoginMutation, useGoogleAuthMutation } =
  ApiSlice;
