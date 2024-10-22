import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const ordersAdaptor = createEntityAdapter({});

const initialState = ordersAdaptor.getInitialState();

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (userId) => ({
        url: userId ? `/order?userId=${userId}` : "/order",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      transformResponse: (responseData) => {
        const loadedOrders = responseData.map((order) => {
          order.id = order._id;
          return order;
        });
        return ordersAdaptor.setAll(initialState, loadedOrders);
      },
      providesTags: (result, err, arg) => {
        if (result?._ids) {
          return [
            { type: "Orders", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Orders", id })),
          ];
        } else {
          return [{ type: "Orders", id: "LIST" }];
        }
      },
    }),
    deleteOrder: builder.mutation({
      query: ({ id }) => ({
        url: `/order/single/${id}`,
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useDeleteOrderMutation } = ordersApiSlice;

export const selectOrderResult = ordersApiSlice.endpoints.getOrders.select();

//creates memoized selector
const selectOrdersData = createSelector(
  selectOrderResult,
  (selectOrdersResult) => selectOrdersResult.data
);

export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
  selectIds: selectOrderIds,
} = ordersAdaptor.getSelectors(
  (state) => selectOrdersData(state) ?? initialState
);
