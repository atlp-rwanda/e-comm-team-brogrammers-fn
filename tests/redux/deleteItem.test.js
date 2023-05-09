/* eslint-disable import/named */
import { jest, expect, describe, beforeEach, it } from '@jest/globals';

import '@testing-library/jest-dom';

// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member, import/no-unresolved

// eslint-disable-next-line import/no-unresolved, import/extensions

import deleteItemThunk from '../../src/redux/features/actions/deleteItem';
// eslint-disable-next-line import/named
import deleteItemSlice, {
  initialState,
} from '../../src/redux/features/slices/deleteItem';

describe('testing delete slice', () => {
  describe(' delete slice', () => {
    let state;
    beforeEach(() => {
      state = initialState;
    });

    it('should handle delete.pending', () => {
      const action = { type: deleteItemThunk.pending.type };
      const nextState = deleteItemSlice.reducer(state, action);

      expect(nextState.status).toEqual('loading');
    });

    it('should handle delete.fulfilled', () => {
      const data = [{ product: [], message: '12' }];
      const action = {
        type: deleteItemThunk.fulfilled.type,
        payload: data,
      };
      const nextState = deleteItemSlice.reducer(state, action);

      expect(nextState.status).toEqual('succeeded');
      expect(nextState.data).toEqual(data);
    });

    it('should handle delete.rejected', () => {
      const error = 'Unable to delete products';
      const action = { type: deleteItemThunk.rejected.type, payload: error };
      const nextState = deleteItemSlice.reducer(state, action);

      expect(nextState.status).toEqual('failed');
    });

    it('should dispatch delete and update state on successful API call', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ data: { status: 'idle' } }));

      await deleteItemThunk()(dispatch, getState, undefined);
    });
    it('should be successfull but error', async () => {
      const error = 'Unable to delete products';
      const action = { type: deleteItemThunk.fulfilled.type, payload: error };
      const nextState = deleteItemSlice.reducer(state, action);
      expect(nextState.status).toEqual('succeeded');
    });

    it('should dispatch delete and update state on unsuccessful API call', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ data: { status: 'idle' } }));

      await deleteItemThunk()(dispatch, getState, undefined);
    });
  });
});
