/* eslint-disable import/no-extraneous-dependencies */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { expect, describe, beforeEach, afterEach, it } from '@jest/globals';
import axios from '../../src/redux/configs/axios';
import CartThunk from '../../src/redux/features/actions/cart';

const mockAxios = new MockAdapter(axios);

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('CartThunk', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should dispatch the correct actions when the request succeeds', async () => {
    const payload = {
      value: { data: [{ id: 1, name: 'Product 1' }], message: 'success' },
    };
    const expectedActions = [CartThunk.pending.type, CartThunk.fulfilled.type];
    mockAxios.onGet('/cart').reply(200, payload);

    await store.dispatch(CartThunk());

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual(expectedActions);
  });

  it('should dispatch the correct actions when the request fails', async () => {
    const payload = { response: { data: { message: 'Error' } } };
    const expectedActions = [CartThunk.pending.type, CartThunk.rejected.type];
    mockAxios.onGet('/cart').reply(500, payload);
    await store.dispatch(CartThunk());
    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual(expectedActions);
  });
});
