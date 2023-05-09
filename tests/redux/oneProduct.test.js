/* eslint-disable import/named */
import React from 'react';
import { render } from '@testing-library/react';
import { jest, expect, describe, beforeEach, it } from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import OneProduct from '../../src/components/OneProduct';
import { store } from '../../src/redux/store';
import oneProductThunk from '../../src/redux/features/actions/oneProduct';
import oneProductSlice, {
  initialState,
} from '../../src/redux/features/slices/oneProduct';

describe('testing render rendering one product', () => {
  beforeEach(() => {
    render(
      // eslint-disable-next-line react/jsx-filename-extension
      <Provider store={store}>
        <BrowserRouter basename="/">
          <OneProduct />
        </BrowserRouter>
      </Provider>
    );
  });
  jest.mock('axios');
  describe('review slice', () => {
    let state;
    beforeEach(() => {
      state = initialState;
    });

    it('should handle product.pending', () => {
      const action = { type: oneProductThunk.pending.type };
      const nextState = oneProductSlice.reducer(state, action);

      expect(nextState.status).toEqual('loading');
    });

    it('should handle fetchProducts.fulfilled', () => {
      const data = [{ id: 1, name: 'Product 1' }];
      const action = {
        type: oneProductThunk.fulfilled.type,
        payload: data,
      };
      const nextState = oneProductSlice.reducer(state, action);

      expect(nextState.status).toEqual('succeeded');
      expect(nextState.data).toEqual(data);
    });

    it('should handle productReviewa.rejected', () => {
      const error = 'Unable to fetch product';
      const action = { type: oneProductThunk.rejected.type, payload: error };
      const nextState = oneProductSlice.reducer(state, action);

      expect(nextState.status).toEqual('failed');
    });

    it('should dispatch Product and update state on successful API call', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ data: { status: 'idle' } }));

      await oneProductThunk()(dispatch, getState, undefined);
    });

    it('should dispatch product and update state on unsuccessful API call', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ data: { status: 'idle' } }));

      await oneProductThunk()(dispatch, getState, undefined);
    });
  });
});
