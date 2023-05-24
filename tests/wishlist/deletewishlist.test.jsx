import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { expect, describe, beforeEach, afterEach, it } from '@jest/globals';
import axios from '../../src/redux/configs/axios';
import DeleteWishlistThunk from '../../src/redux/features/actions/deleteWishlist';

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
describe('DeleteWishlistThunk', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    mockAxios.reset();
  });
  it('should dispatch the correct actions when the request succeeds', async () => {
    const productId = 123;
    const payload = {
      data: { message: 'Product removed from wishlist' },
      id: productId,
    };
    const expectedActions = [
      DeleteWishlistThunk.pending.type,
      DeleteWishlistThunk.fulfilled.type,
    ];
    mockAxios.onDelete(`/wishlist/${productId}`).reply(200, payload);
    await store.dispatch(DeleteWishlistThunk(productId));
    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual(expectedActions);
    expect(store.getActions()[1].payload).toEqual(payload);
  });
  it('should dispatch the correct actions when the request fails', async () => {
    const productId = 123;
    const errorMessage = 'Failed to remove product from wishlist';
    const expectedActions = [
      DeleteWishlistThunk.pending.type,
      DeleteWishlistThunk.rejected.type,
    ];
    mockAxios.onDelete(`/wishlist/${productId}`).reply(500, {
      message: errorMessage,
    });
    await store.dispatch(DeleteWishlistThunk(productId));
    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual(expectedActions);
  });
});
