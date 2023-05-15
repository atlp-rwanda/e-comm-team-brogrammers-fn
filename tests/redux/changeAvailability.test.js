/* eslint-disable import/named */
import { jest, expect, describe, beforeEach, it } from '@jest/globals';

import '@testing-library/jest-dom';

// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member, import/no-unresolved

// eslint-disable-next-line import/no-unresolved, import/extensions

import availabilityThunk from '../../src/redux/features/actions/changeAvailability';
// eslint-disable-next-line import/named
import availablitySlice, {
  initialState,
} from '../../src/redux/features/slices/changeAvailability';

describe('testing statistics slice', () => {
  describe('stattistics slice slice', () => {
    let state;
    beforeEach(() => {
      state = initialState;
    });

    it('should handle statistics.pending', () => {
      const action = { type: availabilityThunk.pending.type };
      const nextState = availablitySlice.reducer(state, action);

      expect(nextState.status).toEqual('loading');
    });

    it('should handle statistics.fulfilled', () => {
      const data = [{ product: [], message: '12' }];
      const action = {
        type: availabilityThunk.fulfilled.type,
        payload: data,
      };
      const nextState = availablitySlice.reducer(state, action);

      expect(nextState.status).toEqual('succeeded');
      expect(nextState.data).toEqual(data);
    });

    it('should handle statistics.rejected', () => {
      const error = 'Unable to fetch products';
      const action = { type: availabilityThunk.rejected.type, payload: error };
      const nextState = availablitySlice.reducer(state, action);

      expect(nextState.status).toEqual('failed');
    });

    it('should dispatch statistics and update state on successful API call', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ data: { status: 'idle' } }));

      await availabilityThunk()(dispatch, getState, undefined);
    });

    it('should dispatch productReview and update state on unsuccessful API call', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ data: { status: 'idle' } }));

      await availabilityThunk()(dispatch, getState, undefined);
    });
  });
});
