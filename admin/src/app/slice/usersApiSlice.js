import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const usersAdaptor = createEntityAdapter({});

const initialState = usersAdaptor.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/user",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdaptor.setAll(initialState, loadedUsers);
      },
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
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/user/single/${id}`,
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});

export const { useGetUsersQuery, useDeleteUserMutation } = usersApiSlice;

export const selectUserResult = usersApiSlice.endpoints.getUsers.select();

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
