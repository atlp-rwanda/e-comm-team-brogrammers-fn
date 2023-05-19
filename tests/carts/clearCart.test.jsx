/* eslint-disable import/no-extraneous-dependencies */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { describe, afterEach, it, expect, beforeEach } from '@jest/globals';
import axios from '../../src/redux/configs/axios';
import ClearCartThunk from '../../src/redux/features/actions/clearCart';

const mockStore = configureStore([thunk]);
const mockAxios = new MockAdapter(axios);

describe('ClearCartThunk', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should dispatch the correct actions when the request succeeds', async () => {
    const expectedActions = [
      ClearCartThunk.pending.type,
      ClearCartThunk.fulfilled.type,
    ];

    mockAxios.onDelete('/cart').reply(200, { success: true });

    await store.dispatch(ClearCartThunk());

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual(expectedActions);
  });

  it('should dispatch the correct actions when the request fails', async () => {
    const error = new Error('Something went wrong');
    const expectedActions = [
      ClearCartThunk.pending.type,
      ClearCartThunk.rejected.type,
    ];

    mockAxios.onDelete('/cart').reply(500, error);

    await store.dispatch(ClearCartThunk());

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual(expectedActions);
  });
});
