import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { expect, describe, beforeEach, afterEach, it } from '@jest/globals';
import axios from '../../src/redux/configs/axios';
import ViewWishlistThunk from '../../src/redux/features/actions/wishlistaction';

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
describe('ViewWishlistThunk', () => {
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
    const expectedActions = [
      ViewWishlistThunk.pending.type,
      ViewWishlistThunk.fulfilled.type,
    ];
    mockAxios.onGet('/wishlist').reply(200, payload);
    await store.dispatch(ViewWishlistThunk());
    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual(expectedActions);
  });
  it('should dispatch the correct actions when the request fails', async () => {
    const payload = { error: 'Error' };
    const expectedActions = [
      ViewWishlistThunk.pending.type,
      ViewWishlistThunk.rejected.type,
    ];
    mockAxios.onGet('/wishlist').reply(500, payload);
    await store.dispatch(ViewWishlistThunk());
    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual(expectedActions);
  });
});
