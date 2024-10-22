import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { apiSlice } from "../api/apiSlice";

const productsAdaptor = createEntityAdapter({
  sortComparer: (a, b) => a.date.localeCompare(b.date),
});

const initialState = productsAdaptor.getInitialState();

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (gender) => ({
        url: gender ? `/product?BIcategory=${gender}` : "/product",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        let min = 1;
        const loadedProducts = responseData.map((product) => {
          if (!product?.date)
            product.date = sub(new Date(), { minutes: min++ }).toISOString();
          product.id = product._id;
          return product;
        });
        return productsAdaptor.setAll(initialState, loadedProducts);
      },
      providesTags: (result, err, arg) => {
        if (result?._ids) {
          return [
            { type: "Product", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Product", id })),
          ];
        } else {
          return [{ type: "Product", id: "LIST" }];
        }
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApiSlice;

//returns the query select object
export const selectProductsResult =
  productsApiSlice.endpoints.getProducts.select();

//creates memoized selector
const selectProductsData = createSelector(
  selectProductsResult,
  (productsResult) => productsResult.data
);

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectUserIds,
} = productsAdaptor.getSelectors(
  (state) => selectProductsData(state) ?? initialState
);
