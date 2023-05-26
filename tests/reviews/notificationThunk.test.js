import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { expect, describe, beforeEach, afterEach, it } from '@jest/globals';
import axios from '../../src/redux/configs/axios';
import fetchNotifications from '../../src/redux/features/actions/notifications';

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
describe('fetchNotifications', () => {
  let store;
  beforeEach(() => {
    store = mockStore({});
  });
  afterEach(() => {
    mockAxios.reset();
  });
  it('should dispatch the correct actions when the request succeeds', async () => {
    const payload = {
      allNotifications: [{ id: 1, message: 'Notification 1' }],
    };
    const expectedActions = [
      fetchNotifications.pending.type,
      fetchNotifications.fulfilled.type,
    ];
    mockAxios.onGet('/notification').reply(200, payload);
    await store.dispatch(fetchNotifications());
    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual(expectedActions);
    expect(store.getActions()[1].payload).toEqual(payload.allNotifications);
  });
  it('should dispatch the correct actions when the request fails', async () => {
    const errorMessage = 'Rejected';
    const expectedActions = [
      fetchNotifications.pending.type,
      fetchNotifications.rejected.type,
    ];
    mockAxios.onGet('/notification').reply(500, { message: errorMessage });
    await store.dispatch(fetchNotifications());
    const actions = store.getActions().map((action) => action.type);
    expect(actions).toEqual(expectedActions);
    expect(store.getActions()[1].error.message).toEqual(errorMessage);
  });
});
