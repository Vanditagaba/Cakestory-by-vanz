import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const usersAdaptor = createEntityAdapter({});

const initialState = usersAdaptor.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userId) => ({
        url: `/user/single/${userId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (result, err, arg) => {
        if (result?._ids) {
          return [
            { type: "Users", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Users", id })),
          ];
        } else {
          return [{ type: "Users", id: "LIST" }];
        }
      },
    }),
    addNewUser: builder.mutation({
      query: (initialUser) => ({
        url: "/user",
        method: "POST",
        body: { ...initialUser, date: new Date().toIsoString },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/user/single/${id}`,
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});

export const { useGetUserQuery, useDeleteUserMutation, useAddNewUserMutation } =
  usersApiSlice;

export const selectUserResult = usersApiSlice.endpoints.getUser.select();

//creates memoized selector
const selectUsersData = createSelector(
  selectUserResult,
  (selectUsersResult) => selectUsersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdaptor.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
