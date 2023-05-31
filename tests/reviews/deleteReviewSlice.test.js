import { describe, it, expect } from '@jest/globals';
import deleteReviewSlice from '../../src/redux/features/slices/deleteReview';
import deleteReviewThunk from '../../src/redux/features/actions/deleteReview';

describe('deleteReviewSlice', () => {
  it('should handle initial state', () => {
    const initialState = {};
    const nextState = deleteReviewSlice(undefined, {});
    expect(nextState).toEqual(initialState);
  });
  it('should handle deleteReviewThunk.pending', () => {
    const initialState = {};
    const reviewId = 1;
    const nextState = deleteReviewSlice(initialState, {
      type: deleteReviewThunk.pending.type,
      meta: { arg: reviewId },
    });
    expect(nextState[reviewId]).toBe(true);
  });
  it('should handle deleteReviewThunk.fulfilled', () => {
    const initialState = {
      1: true,
      2: true,
    };
    const reviewId = 1;
    const nextState = deleteReviewSlice(initialState, {
      type: deleteReviewThunk.fulfilled.type,
      payload: {},
      meta: { arg: reviewId },
    });
    expect(nextState[reviewId]).toBe(false);
    expect(nextState[2]).toBe(true);
  });
  it('should handle deleteReviewThunk.rejected', () => {
    const initialState = {
      1: true,
      2: true,
    };
    const reviewId = 1;
    const nextState = deleteReviewSlice(initialState, {
      type: deleteReviewThunk.rejected.type,
      error: {},
      meta: { arg: reviewId },
    });
    expect(nextState[reviewId]).toBe(false);
    expect(nextState[2]).toBe(true);
  });
});
