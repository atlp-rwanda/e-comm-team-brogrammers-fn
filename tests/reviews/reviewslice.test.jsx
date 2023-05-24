import { describe, it, expect } from '@jest/globals';
import reviewthunk from '../../src/redux/features/actions/productReview';
import addReviewThunk from '../../src/redux/features/actions/giveReview';
import deleteReviewThunk from '../../src/redux/features/actions/deleteReview';
import editReviewThunk from '../../src/redux/features/actions/editReview';
import reviewSlice from '../../src/redux/features/slices/productReview';

describe('reviewSlice reducer', () => {
  const initialState = {
    review: [],
    status: 'idle',
    error: null,
  };

  it('should handle initial state', () => {
    expect(reviewSlice.reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle reviewthunk.pending', () => {
    const nextState = reviewSlice.reducer(initialState, reviewthunk.pending());
    expect(nextState.status).toBe('loading');
  });

  it('should handle reviewthunk.fulfilled', () => {
    const payload = ['review1', 'review2'];

    const nextState = reviewSlice.reducer(
      initialState,
      reviewthunk.fulfilled(payload)
    );
    expect(nextState.status).toBe('succeeded');
    expect(nextState.review).toEqual(payload);
  });

  it('should handle reviewthunk.rejected', () => {
    const payload = {
      error: 'Error occurred',
    };

    const nextState = reviewSlice.reducer(
      initialState,
      reviewthunk.rejected(payload)
    );
    expect(nextState.status).toBe('failed');
  });

  it('should handle addReviewThunk.fulfilled', () => {
    const payload = {
      id: 'review3',
      feedback: 'Great product!',
      rating: 5,
      totalRates: 10,
    };

    const currentState = {
      ...initialState,
      review: {
        allReviews: {
          results: ['review1', 'review2'],
        },
        totalRates: 20,
      },
    };

    const nextState = reviewSlice.reducer(
      currentState,
      addReviewThunk.fulfilled(payload)
    );
    expect(nextState.status).toBe('succeeded');
    expect(nextState.review.totalRates).toBe(payload.totalRates);
  });

  it('should handle deleteReviewThunk.fulfilled', () => {
    const payload = {
      error: false,
      review: {
        id: 'review1',
      },
      totalRates: 15,
    };

    const currentState = {
      ...initialState,
      review: {
        allReviews: {
          results: ['review2'],
        },
        totalRates: 20,
      },
    };

    const nextState = reviewSlice.reducer(
      currentState,
      deleteReviewThunk.fulfilled(payload)
    );
    expect(nextState.review.allReviews.results).toEqual(['review2']);
    expect(nextState.review.totalRates).toBe(payload.totalRates);
  });

  it('should handle editReviewThunk.fulfilled', () => {
    const payload = {
      error: false,
      id: 'review1',
      feedback: 'Updated review',
      rating: 4,
      totalRates: 18,
    };

    const currentState = {
      ...initialState,
      review: {
        allReviews: {
          results: [
            {
              id: 'review1',
              feedback: 'Initial review',
              rating: 3,
            },
            {
              id: 'review2',
              feedback: 'Another review',
              rating: 5,
            },
          ],
        },
        totalRates: 20,
      },
    };

    const nextState = reviewSlice.reducer(
      currentState,
      editReviewThunk.fulfilled(payload)
    );
    expect(nextState.review.allReviews.results).toEqual([
      {
        id: 'review1',
        feedback: 'Updated review',
        rating: 4,
      },
      {
        id: 'review2',
        feedback: 'Another review',
        rating: 5,
      },
    ]);
    expect(nextState.review.totalRates).toBe(payload.totalRates);
  });
});
