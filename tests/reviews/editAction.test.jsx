import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { expect, describe, beforeEach, afterEach, it } from '@jest/globals';
import axios from '../../src/redux/configs/axios';
import editReviewThunk from '../../src/redux/features/actions/editReview';

const mockAxios = new MockAdapter(axios);

const mockStore = configureMockStore([thunk]);

describe('editReviewThunk', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should dispatch the correct actions when the request succeeds', async () => {
    const reviewId = 1;
    const feedback = 'Great product!';
    const rating = 5;
    const responseData = { success: true };
    const expectedActions = [
      editReviewThunk.pending.type,
      editReviewThunk.fulfilled.type,
    ];

    mockAxios.onPatch(`/reviews/${reviewId}`).reply(200, responseData);

    await store.dispatch(editReviewThunk({ reviewId, feedback, rating }));

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual(expectedActions);
  });

  it('should dispatch the correct actions when the request fails', async () => {
    const reviewId = 1;
    const feedback = 'Great product!';
    const rating = 5;
    const errorMessage = 'Failed to edit review';
    const expectedActions = [
      editReviewThunk.pending.type,
      editReviewThunk.rejected.type,
    ];

    mockAxios.onPatch(`/reviews/${reviewId}`).reply(500, errorMessage);

    await store.dispatch(editReviewThunk({ reviewId, feedback, rating }));

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual(expectedActions);
  });
});
