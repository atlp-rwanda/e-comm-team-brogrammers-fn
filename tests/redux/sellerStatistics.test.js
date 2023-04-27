/* eslint-disable import/named */
import { jest, expect, describe, beforeEach, it } from '@jest/globals';

import '@testing-library/jest-dom';

// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member, import/no-unresolved

// eslint-disable-next-line import/no-unresolved, import/extensions

import statusThunk from '../../src/redux/features/actions/sellerStatus';
// eslint-disable-next-line import/named
import statusSlice, {
  initialState,
} from '../../src/redux/features/slices/sellerStatus';

describe('testing statistics slice', () => {
  describe('stattistics slice slice', () => {
    let state;
    beforeEach(() => {
      state = initialState;
    });

    it('should handle statistics.pending', () => {
      const action = { type: statusThunk.pending.type };
      const nextState = statusSlice.reducer(state, action);

      expect(nextState.status).toEqual('loading');
    });

    it('should handle statistics.fulfilled', () => {
      const statis = [{ products: [], revenue: 12 }];
      const action = {
        type: statusThunk.fulfilled.type,
        payload: statis,
      };
      const nextState = statusSlice.reducer(state, action);

      expect(nextState.status).toEqual('succeeded');
      expect(nextState.statis).toEqual(statis);
    });

    it('should handle statistics.rejected', () => {
      const error = 'Unable to fetch products';
      const action = { type: statusThunk.rejected.type, payload: error };
      const nextState = statusSlice.reducer(state, action);

      expect(nextState.status).toEqual('failed');
    });

    it('should dispatch statistics and update state on successful API call', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ statis: { status: 'idle' } }));

      await statusThunk()(dispatch, getState, undefined);
    });

    it('should dispatch productReview and update state on unsuccessful API call', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ statis: { status: 'idle' } }));

      await statusThunk()(dispatch, getState, undefined);
    });
  });
});
