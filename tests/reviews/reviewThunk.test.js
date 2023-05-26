import { describe, it, expect } from '@jest/globals';
import reviewthunk from '../../src/redux/features/actions/productReview';
import reviewSlice from '../../src/redux/features/slices/productReview';

describe('reviewSlice reducer', () => {
  it('should handle initial state', () => {
    const initialState = {
      review: {
        allReviews: {
          results: [], // Initialize as an empty array
        },
        totalRates: undefined,
      },
      status: 'idle',
      error: null,
    };
    expect(reviewSlice.reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle reviewthunk.pending', () => {
    const initialState = {
      review: {
        allReviews: {
          results: [],
        },
        totalRates: undefined,
      },
      status: 'idle',
      error: null,
    };
    const nextState = reviewSlice.reducer(initialState, reviewthunk.pending());
    expect(nextState.status).toBe('loading');
    expect(nextState.error).toBe(null);
  });

  it('should handle reviewthunk.fulfilled', () => {
    const initialState = {
      review: {
        allReviews: {
          results: [],
        },
        totalRates: undefined,
      },
      status: 'loading',
      error: null,
    };
    const payload = {
      allReviews: {
        results: [{ id: 1, feedback: 'Great', rating: 5 }],
      },
      totalRates: 1,
    };
    const nextState = reviewSlice.reducer(
      initialState,
      reviewthunk.fulfilled(payload)
    );
    expect(nextState.status).toBe('succeeded');
    expect(nextState.review.allReviews.results).toEqual(
      payload.allReviews.results
    );
    expect(nextState.review.totalRates).toBe(payload.totalRates);
    expect(nextState.error).toBe(null);
  });
  it('should handle reviewthunk.rejected', () => {
    const initialState = {
      review: {
        allReviews: {
          results: [],
        },
        totalRates: undefined,
      },
      status: 'idle',
      error: null,
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
    expect(nextState.status).toBe('failed');
    expect(nextState.review.allReviews.results).toEqual([]);
    expect(nextState.review.totalRates).toBe(undefined);
  });
});
