import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthRequest, AuthResponse } from '../../types/userTypes/apiTypes';

export const ApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:8000', 
        credentials: 'include'  
    }),
    endpoints: (builder) => ({
        signup: builder.mutation<AuthResponse, AuthRequest>({
            query: (signupData) => ({
                url: '/api/auth/signup',
                method: 'POST',
                body: signupData,
            }),
        }),
        sendOtp: builder.mutation<void, { email: string }>({
            query: (otpData) => ({
                url: '/api/auth/send-otp',
                method: 'POST',
                body: otpData,
            }),
        }),
    }),
});

export const { useSignupMutation, useSendOtpMutation } = ApiSlice;
