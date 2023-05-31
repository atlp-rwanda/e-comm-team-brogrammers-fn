/* eslint-disable no-undef */
// import { act } from '@testing-library/react';
import { test, expect, afterEach } from '@jest/globals';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from '../../src/redux/configs/axios';
import { updateSellerCollection } from '../../src/redux/features/actions/updateSellerCollection';
import {
  updateSellerStatus,
  updatesellerLoading,
} from '../../src/redux/features/slices/updateSellerCollectionStatus';

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});

describe('updateSellerCollection', () => {
  afterEach(() => {
    mockAxios.reset();
    store.clearActions();
  });

  test('should dispatch updateSellerStatus with response message when API call is successful', async () => {
    const formData = {
      name: 'Updated Product',
      category: 'Category',
      price: 99.99,
      quantity: 10,
      description: 'Updated Description',
      expdate: '2023-12-31',
      images: [],
    };

    const expectedResponse = {
      message: 'Product updated successfully',
    };

    mockAxios
      .onPatch(`${process.env.REACT_APP_SERVER_URL}/products/1`)
      .reply(200, expectedResponse);

    await store.dispatch(updateSellerCollection(1, formData));

    const expectedActions = [
      updatesellerLoading(true),
      updateSellerStatus(expectedResponse.message),
      updatesellerLoading(false),
    ];

    expect(store.getActions()).toBe(expectedActions);
  });

  test('should handle error and dispatch updatesellerLoading(false) when API call fails', async () => {
    const formData = {
      name: 'Updated Product',
      category: 'Category',
      price: 99.99,
      quantity: 10,
      description: 'Updated Description',
      expdate: '2023-12-31',
      images: [],
    };

    const expectedError = 'Something went wrong';

    mockAxios
      .onPatch(`${process.env.REACT_APP_SERVER_URL}/products/1`)
      .reply(500, { error: expectedError });

    await store.dispatch(updateSellerCollection(1, formData));

    const expectedActions = [
      updatesellerLoading(true),
      updatesellerLoading(false),
    ];

    expect(store.getActions()).toEqual(expectedActions);
  });
});
