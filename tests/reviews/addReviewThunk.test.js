import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { expect, describe, beforeEach, afterEach, it } from '@jest/globals';
import axios from '../../src/redux/configs/axios';
import addReviewThunk from '../../src/redux/features/actions/giveReview';

const mockAxios = new MockAdapter(axios);
const mockStore = configureMockStore([thunk]);
describe('addReviewThunk', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    mockAxios.reset();
  });
  it('should dispatch the correct actions when the request succeeds', async () => {
    const productId = 1;
    const feedback = 'Great product!';
    const rating = 5;
    const responseData = { success: true };
    const expectedActions = [
      addReviewThunk.pending.type,
      addReviewThunk.fulfilled.type,
    ];
    mockAxios.onPost('/reviews').reply(200, responseData);
    await store.dispatch(addReviewThunk({ productId, feedback, rating }));
    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual(expectedActions);
  });
  it('should dispatch the correct actions when the request fails', async () => {
    const productId = 1;
    const feedback = 'Great product!';
    const rating = 5;
    const errorMessage = 'Failed to add review';
    const expectedActions = [
      addReviewThunk.pending.type,
      addReviewThunk.rejected.type,
    ];
    mockAxios.onPost('/reviews').reply(500, errorMessage);
    await store.dispatch(addReviewThunk({ productId, feedback, rating }));
    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual(expectedActions);
  });
});
