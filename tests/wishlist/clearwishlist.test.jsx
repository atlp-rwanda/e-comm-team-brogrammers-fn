import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { expect, describe, beforeEach, afterEach, it } from '@jest/globals';
import axios from '../../src/redux/configs/axios';
import ClearWishlistThunk from '../../src/redux/features/actions/clearwishlist';

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
describe('ClearWishlistThunk', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    mockAxios.reset();
  });
  it('should dispatch the correct actions when the request succeeds', async () => {
    const payload = { data: { message: 'Wishlist cleared' } };
    const expectedActions = [
      ClearWishlistThunk.pending.type,
      ClearWishlistThunk.fulfilled.type,
    ];
    mockAxios.onPatch('/wishlist/clear').reply(200, payload);
    await store.dispatch(ClearWishlistThunk());
    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual(expectedActions);
  });
  it('should dispatch the correct actions when the request fails', async () => {
    const error = { error: 'Error' };
    const expectedActions = [
      ClearWishlistThunk.pending.type,
      ClearWishlistThunk.rejected.type,
    ];
    mockAxios.onPatch('/wishlist/clear').reply(500, error);
    await store.dispatch(ClearWishlistThunk());
    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual(expectedActions);
  });
});
