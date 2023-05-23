/* eslint-disable import/no-extraneous-dependencies */
import configureStore from 'redux-mock-store';
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../src/redux/configs/axios';
import RemoveCartThunk from '../../src/redux/features/actions/removeCart';

const mockAxios = new MockAdapter(axios);

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('RemoveCartThunk', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should dispatch the correct actions when the request succeeds', async () => {
    const id = 1;
    const payload = { data: { message: 'success' } };
    const expectedActions = [
      RemoveCartThunk.pending.type,
      RemoveCartThunk.fulfilled.type,
    ];

    mockAxios.onDelete(`/cart/${id}`).reply(200, payload);

    await store.dispatch(RemoveCartThunk(id));

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual(expectedActions);
  });

  it('should dispatch the correct actions when the request fails', async () => {
    const id = 1;
    const errorResponse = {
      message: 'Something went wrong',
    };
    const expectedActions = [
      RemoveCartThunk.pending.type,
      RemoveCartThunk.rejected.type,
    ];

    mockAxios.onDelete(`/cart/${id}`).reply(500, errorResponse);

    await store.dispatch(RemoveCartThunk('id'));

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual(expectedActions);
  });
});
