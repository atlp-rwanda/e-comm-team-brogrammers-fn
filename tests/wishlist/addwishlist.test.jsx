import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { expect, describe, beforeEach, afterEach, it } from '@jest/globals';
import axios from '../../src/redux/configs/axios';
import AddWishlistThunk from '../../src/redux/features/actions/addWishlist';

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
describe('AddWishlistThunk', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    mockAxios.reset();
  });
  it('should dispatch the correct actions when the request succeeds', async () => {
    const productId = 123;
    const payload = { data: { message: 'Product added to wishlist' } };
    const expectedActions = [
      AddWishlistThunk.pending.type,
      AddWishlistThunk.fulfilled.type,
    ];
    mockAxios.onPost(`/wishlist/${productId}`).reply(200, payload);
    await store.dispatch(AddWishlistThunk(productId));
    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual(expectedActions);
  });
  it('should dispatch the correct actions when the request fails', async () => {
    const productId = 123;
    const errorMessage = 'Failed to add product to wishlist';
    const expectedActions = [
      AddWishlistThunk.pending.type,
      AddWishlistThunk.rejected.type,
    ];
    mockAxios.onPost(`/wishlist/${productId}`).reply(500, {
      error: { message: errorMessage },
    });
    await store.dispatch(AddWishlistThunk(productId));
    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual(expectedActions);
  });
});
