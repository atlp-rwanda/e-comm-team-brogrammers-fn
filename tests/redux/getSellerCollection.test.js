/* eslint-disable import/named */
import React from 'react';
import { render } from '@testing-library/react';
import { jest, expect, describe, beforeEach, it } from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member, import/no-unresolved
import SellerCollection from '../../src/Views/sellerCollection';

// eslint-disable-next-line import/no-unresolved, import/extensions
import { store } from '../../src/redux/store';
import collectionThunk from '../../src/redux/features/actions/sellerCollection';
// eslint-disable-next-line import/named
import productSlice, {
  initialState,
} from '../../src/redux/features/slices/sellerCollection';

describe('testing render Login page', () => {
  beforeEach(() => {
    render(
      // eslint-disable-next-line react/jsx-filename-extension
      <Provider store={store}>
        <BrowserRouter basename="/">
          <SellerCollection />
        </BrowserRouter>
      </Provider>
    );
  });
  jest.mock('axios');

  describe('productSlice', () => {
    let state;
    beforeEach(() => {
      state = initialState;
    });

    it('should handle fetchProducts.pending', () => {
      const action = { type: collectionThunk.pending.type };
      const nextState = productSlice.reducer(state, action);

      expect(nextState.status).toEqual('loading');
    });

    it('should handle fetchProducts.fulfilled', () => {
      const collection = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
      ];
      const action = {
        type: collectionThunk.fulfilled.type,
        payload: collection,
      };
      const nextState = productSlice.reducer(state, action);

      expect(nextState.status).toEqual('succeeded');
      expect(nextState.collection).toEqual(collection);
    });

    it('should handle fetchProducts.rejected', () => {
      const error = 'Unable to fetch products';
      const action = { type: collectionThunk.rejected.type, payload: error };
      const nextState = productSlice.reducer(state, action);

      expect(nextState.status).toEqual('failed');
    });

    it('should dispatch fetchProducts and update state on successful API call', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ products: { status: 'idle' } }));

      await collectionThunk()(dispatch, getState, undefined);
    });

    it('should dispatch fetchProducts and update state on unsuccessful API call', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({ collection: { status: 'idle' } }));

      await collectionThunk()(dispatch, getState, undefined);
    });
  });
});
