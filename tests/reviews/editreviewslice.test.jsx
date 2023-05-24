import { describe, it, expect } from '@jest/globals';
import editReviewSlice from '../../src/redux/features/slices/editReview';
import editReviewThunk from '../../src/redux/features/actions/editReview';

describe('editReviewSlice', () => {
  it('should handle initial state', () => {
    const initialState = {
      data: null,
      error: null,
      isLoading: false,
    };

    const nextState = editReviewSlice.reducer(undefined, {});
    expect(nextState).toEqual(initialState);
  });

  it('should handle editReviewThunk.pending', () => {
    const initialState = {
      data: null,
      error: null,
      isLoading: false,
    };

    const nextState = editReviewSlice.reducer(
      initialState,
      editReviewThunk.pending()
    );
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

    const nextState = editReviewSlice.reducer(
      initialState,
      editReviewThunk.fulfilled(payload)
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

    const nextState = editReviewSlice.reducer(
      initialState,
      editReviewThunk.rejected(payload)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.data).toBe(null);
  });
});
