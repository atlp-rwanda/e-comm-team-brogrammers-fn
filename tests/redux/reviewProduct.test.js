/* eslint-disable import/named */
import { jest, expect, describe, beforeEach, it } from '@jest/globals';

import '@testing-library/jest-dom';

// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member, import/no-unresolved

// eslint-disable-next-line import/no-unresolved, import/extensions

import reviewthunk from '../../src/redux/features/actions/productReview';
// eslint-disable-next-line import/named
import reviewSlice, {
  initialState,
} from '../../src/redux/features/slices/productReview';

describe('testing render review slice page', () => {
  describe('review slice', () => {
    let state;
    beforeEach(() => {
      state = initialState;
    });

    it('should handle productReviews.pending', () => {
      const action = { type: reviewthunk.pending.type };
      const nextState = reviewSlice.reducer(state, action);

      expect(nextState.status).toEqual('loading');
    });

    it('should handle fetchProducts.fulfilled', () => {
      const review = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
      ];
      const action = {
        type: reviewthunk.fulfilled.type,
        payload: review,
      };
      const nextState = reviewSlice.reducer(state, action);

      expect(nextState.status).toEqual('succeeded');
      expect(nextState.review).toEqual(review);
    });

    it('should handle productReviewa.rejected', () => {
      const error = 'Unable to fetch products';
      const action = { type: reviewthunk.rejected.type, payload: error };
      const nextState = reviewSlice.reducer(state, action);

      expect(nextState.status).toEqual('failed');
    });

    it('should dispatch Productreview and update state on successful API call', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ review: { status: 'idle' } }));

      await reviewthunk()(dispatch, getState, undefined);
    });

    it('should dispatch productReview and update state on unsuccessful API call', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ review: { status: 'idle' } }));

      await reviewthunk()(dispatch, getState, undefined);
    });
  });
});
