import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { apiSlice } from "../api/apiSlice";

const reviewAdaptor = createEntityAdapter({
  sortComparer: (a, b) => a.date.localeCompare(b.date),
});

const initialState = reviewAdaptor.getInitialState();

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReview: builder.query({
      query: () => ({
        url: "/review",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        let min = 1;
        const loadedReviews = responseData.map((review) => {
          if (!review?.date)
            review.date = sub(new Date(), { minutes: min++ }).toISOString();
          review.id = review._id;
          return review;
        });
        return reviewAdaptor.setAll(initialState, loadedReviews);
      },
      providesTags: (result, err, arg) => {
        if (result?._ids) {
          return [
            { type: "Review", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Review", id })),
          ];
        } else {
          return [{ type: "Review", id: "LIST" }];
        }
      },
    }),
    addReview: builder.mutation({
      query: (intialReview) => ({
        url: "/review",
        method: "POST",
        body: { ...intialReview, date: new Date().toIsoString },
      }),
      invalidatesTags: [{ type: "Review", id: "LIST" }],
    }),
  }),
});

export const { useGetReviewQuery, useAddReviewMutation } = reviewApiSlice;

//returns the query select object
export const selectReviewsResult = reviewApiSlice.endpoints.getReview.select();

//creates memoized selector
const selectReviewsData = createSelector(
  selectReviewsResult,
  (reviewsResult) => reviewsResult.data
);

export const {
  selectAll: selectAllReviews,
  selectById: selectReviewById,
  selectIds: selectUserIds,
} = reviewAdaptor.getSelectors(
  (state) => selectReviewsData(state) ?? initialState
);
