import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { expect, describe, beforeEach, afterEach, it } from '@jest/globals';
import axios from '../../src/redux/configs/axios';
import reviewthunk from '../../src/redux/features/actions/productReview';

const mockAxios = new MockAdapter(axios);

const mockStore = configureMockStore([thunk]);

describe('reviewthunk', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should dispatch the correct actions when the request succeeds', async () => {
    const id = 1;
    const page = 1;
    const responseData = {
      reviews: [
        { id: 1, rating: 5 },
        { id: 2, rating: 4 },
      ],
    };
    const expectedActions = [
      reviewthunk.pending.type,
      reviewthunk.fulfilled.type,
    ];

    mockAxios
      .onGet(`products/${id}/reviews?limit=5&page=${page}`)
      .reply(200, responseData);

    await store.dispatch(reviewthunk({ id, page }));

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual(expectedActions);
  });

  it('should dispatch the correct actions when the request fails', async () => {
    const id = 1;
    const page = 1;
    const errorMessage = 'Failed to fetch reviews';
    const expectedActions = [
      reviewthunk.pending.type,
      reviewthunk.rejected.type,
    ];

    mockAxios
      .onGet(`products/${id}/reviews?limit=5&page=${page}`)
      .reply(500, errorMessage);

    await store.dispatch(reviewthunk({ id, page }));

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual(expectedActions);
  });
});
