import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { expect, describe, beforeEach, afterEach, it } from '@jest/globals';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../src/redux/configs/axios';
import deleteReviewThunk from '../../src/redux/features/actions/deleteReview';

const mockAxios = new MockAdapter(axios);

const mockStore = configureMockStore([thunk]);

describe('deleteReviewThunk', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should dispatch the correct actions when the request succeeds', async () => {
    const reviewId = 1;
    const responseData = { success: true };
    const expectedActions = [
      deleteReviewThunk.pending.type,
      deleteReviewThunk.fulfilled.type,
    ];

    mockAxios.onDelete(`/reviews/${reviewId}`).reply(200, responseData);

    await store.dispatch(deleteReviewThunk(reviewId));

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual(expectedActions);
  });

  it('should dispatch the correct actions when the request fails', async () => {
    const reviewId = 1;
    const errorMessage = 'Failed to delete review';
    const expectedActions = [
      deleteReviewThunk.pending.type,
      deleteReviewThunk.rejected.type,
    ];

    mockAxios.onDelete(`/reviews/${reviewId}`).reply(500, errorMessage);

    await store.dispatch(deleteReviewThunk(reviewId));

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual(expectedActions);
  });
});
