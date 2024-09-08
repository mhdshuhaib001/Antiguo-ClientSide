import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SellerCreationRequest, SellerResponse } from "../../types/sellerTypes/sellerApiTypes";

export const sellerApi = createApi({
    reducerPath: 'sellerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000",
        credentials: 'include'
    }),
    endpoints: builder => ({
        createSeller: builder.mutation<SellerResponse, SellerCreationRequest>({
            query: sellerData => {
                console.log('Creating seller with data:', sellerData); // Add this line for logging
                return {
                    url: "/api/seller/createseller",
                    method: "POST",
                    body: sellerData
                };
            }
        })
    })
});

export const { useCreateSellerMutation } = sellerApi;
