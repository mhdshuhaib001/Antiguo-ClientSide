import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FormDataType, SellerCreationRequest, SellerResponse, AddProductResponse } from "../../types/sellerTypes/sellerApiTypes";

export const sellerApi = createApi({
  reducerPath: 'sellerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json'); 
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createSeller: builder.mutation<SellerResponse, SellerCreationRequest>({
      query: (sellerData) => ({
        url: "/api/seller/createseller",
        method: "POST",
        body: sellerData
      }),
    }),
    addProduct: builder.mutation<AddProductResponse, FormDataType>({
      query: (formData) => ({
        url: '/api/seller/createproduct',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useCreateSellerMutation, useAddProductMutation } = sellerApi;
