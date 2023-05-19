import { describe, it, expect } from '@jest/globals';
import reviewthunk from '../../src/redux/features/actions/productReview';
import reviewSlice from '../../src/redux/features/slices/productReview';

describe('editReviewSlice', () => {
  it('should handle initial state', () => {
    const initialState = {
      data: null,
      error: null,
      isLoading: false,
    };
    const nextState = reviewSlice.reducer(undefined, {});
    expect(nextState).toEqual(initialState);
  });
  it('should handle editReviewThunk.pending', () => {
    const initialState = {
      data: null,
      error: null,
      isLoading: false,
    };
    const nextState = reviewSlice.reducer(initialState, reviewthunk.pending());
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBe(null);
    expect(nextState.data).toBe(null);
  });
  it('should handle editReviewThunk.fulfilled', () => {
    const initialState = {
      data: null,
      error: null,
      isLoading: true,
    };
    const payload = {
      data: { reviewId: 1 },
    };
    const nextState = reviewSlice.reducer(
      initialState,
      reviewthunk.fulfilled(payload)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.data).toEqual(payload.data);
    expect(nextState.error).toBe(null);
  });
  it('should handle editReviewThunk.rejected', () => {
    const initialState = {
      data: null,
      error: null,
      isLoading: true,
    };
    const payload = {
      error: {
        message: 'Request failed',
      },
    };
    const nextState = reviewSlice.reducer(
      initialState,
      reviewthunk.rejected(payload)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.data).toBe(null);
  });
});
