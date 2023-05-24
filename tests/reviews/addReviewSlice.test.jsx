import { describe, it, expect } from '@jest/globals';
import addReviewSlice from '../../src/redux/features/slices/addReview';
import addReviewThunk from '../../src/redux/features/actions/giveReview';

describe('addReviewSlice', () => {
  it('should handle initial state', () => {
    const initialState = {
      data: null,
      error: null,
      isLoading: false,
    };

    const nextState = addReviewSlice(undefined, {});
    expect(nextState).toEqual(initialState);
  });

  it('should handle addReviewThunk.pending', () => {
    const initialState = {
      data: null,
      error: null,
      isLoading: false,
    };

    const nextState = addReviewSlice(initialState, addReviewThunk.pending());
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBe(null);
    expect(nextState.data).toBe(null);
  });

  it('should handle addReviewThunk.fulfilled', () => {
    const initialState = {
      data: null,
      error: null,
      isLoading: true,
    };

    const payload = {
      data: { reviewId: 1 },
    };

    const nextState = addReviewSlice(
      initialState,
      addReviewThunk.fulfilled(payload)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.data).toEqual(payload.data);
    expect(nextState.error).toBe(null);
  });

  it('should handle addReviewThunk.rejected', () => {
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

    const nextState = addReviewSlice(
      initialState,
      addReviewThunk.rejected(payload)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.data).toBe(null);
  });
});
