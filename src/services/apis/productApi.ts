  import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../interface/productTypes/productType';
import { getToken } from '../../utils/getHelper';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8001',
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // getProducts: builder.query<Product[], void>({
    //   query: () => '/api/products',
    // }),
    getProductById: builder.query<Product, any>({
      query: (id) => ({ url: `/api/products/${id}` }),
    }),
    
    
    // createProduct: builder.mutation<Product, Partial<Product>>({
    //   query: (productData) => ({
    //     url: '/api/products',
    //     method: 'POST',
    //     body: productData,
    //   }),
    // }),
    // updateProduct: builder.mutation<Product, { id: string; productData: Partial<Product> }>({
    //   query: ({ id, productData }) => ({
    //     url: `/api/products/${id}`,
    //     method: 'PUT',
    //     body: productData,
    //   }),
    // }),
    // deleteProduct: builder.mutation<void, string>({
    //   query: (id) => ({
    //     url: `/api/products/${id}`,
    //     method: 'DELETE',
    //   }),
    // }),
  }),
});

// Export hooks for usage in functional components
export const {
  // useGetProductsQuery,
  useGetProductByIdQuery,
  // useCreateProductMutation,
  // useUpdateProductMutation,
  // useDeleteProductMutation,
} = productApi;
