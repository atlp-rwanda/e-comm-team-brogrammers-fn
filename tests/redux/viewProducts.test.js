/* eslint-disable no-promise-executor-return */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { act } from '@testing-library/react';
import { test, describe, expect } from '@jest/globals';
// import { store } from 'redux';

import fetchProducts from '../../src/redux/features/actions/products.js';
import productSlice from '../../src/redux/features/slices/product.js';

describe('test productSlice state', () => {
  //   beforeEach(() => {
  //     store.clearActions();
  //   });

  test('should fetch products successfully', async () => {
    const mockProducts = [
      { id: 1, name: 'product 1' },
      { id: 2, name: 'product 2' },
    ];

    jest
      .spyOn(fetchProducts, 'fulfilled')
      .mockImplementation((state, action) => {
        state.products = action.payload;
      });

    jest
      .spyOn(fetchProducts, 'rejected')
      .mockImplementation((state, action) => {
        state.error = action.payload;
      });

    await act(async () => {
      store.dispatch(fetchProducts());
      await new Promise((resolve) => setTimeout(resolve, 4000));
    });

    const actions = store.getActions();
    const expectedActions = [
      { type: fetchProducts.pending.type },
      { type: fetchProducts.fulfilled.type, payload: mockProducts },
    ];
    expect(actions).toEqual(expectedActions);

    const initialState = { products: [], status: 'idle', error: null };
    const actual = productSlice.reducer(
      initialState,
      fetchProducts.fulfilled(mockProducts)
    );
    const expected = {
      products: mockProducts,
      status: 'succeeded',
      error: null,
    };
    expect(actual).toEqual(expected);
  });

  test('should handle fetch products error', async () => {
    const mockError = { message: 'Unable to fetch products' };

    jest
      .spyOn(fetchProducts, 'fulfilled')
      .mockImplementation((state, action) => {
        state.products = action.payload;
      });

    jest
      .spyOn(fetchProducts, 'rejected')
      .mockImplementation((state, action) => {
        state.error = action.payload;
      });

    await act(async () => {
      store.dispatch(fetchProducts());
      await new Promise((resolve) => setTimeout(resolve, 4000));
    });

    const actions = store.getActions();
    const expectedActions = [
      { type: fetchProducts.pending.type },
      { type: fetchProducts.rejected.type, payload: mockError },
    ];
    expect(actions).toEqual(expectedActions);

    const initialState = { products: [], status: 'idle', error: null };
    const actual = productSlice.reducer(
      initialState,
      fetchProducts.rejected(mockError)
    );
    const expected = { products: [], status: 'failed', error: mockError };
    expect(actual).toEqual(expected);
  });
});
