import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const auctionApi = createApi({
  reducerPath: 'auctionApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8001' }),
  endpoints: (builder) => ({
    getAuctionById: builder.query({
      query: (id) => `api/auction/biddes/${id}`,
    }),
    placeBid: builder.mutation({
      query: ({ auctionId, bidderId, currentBid, bidAmount,time ,sellerId}) => ({
        url: '/api/auction',
        method: 'POST',
        body: { auctionId, bidderId, currentBid, bidAmount,time ,sellerId},
      }),
    }),
  }), 
});

export const { useGetAuctionByIdQuery, usePlaceBidMutation } = auctionApi;
