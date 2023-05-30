import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { expect, describe, beforeEach, afterEach, it } from '@jest/globals';
import axios from '../../src/redux/configs/axios';
import LogsThunk from '../../src/redux/features/actions/logs';

const mockAxios = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('LogsThunk', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should dispatch the correct actions when the request succeeds', async () => {
    const payload = {
      data: {
        results: [
          {
            id: 1,
            createdAt: '2023-05-01T10:30:00.000Z',
            user: {
              username: 'JohnDoe',
              email: 'johndoe@example.com',
              role: 'admin',
            },
            message: 'Logged in',
          },
        ],
      },
    };

    const expectedActions = [LogsThunk.pending.type, LogsThunk.fulfilled.type];

    mockAxios.onGet('/users/logs/all').reply(200, payload);

    await store.dispatch(LogsThunk());

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual(expectedActions);
  });

  it('should dispatch the correct actions when the request fails', async () => {
    const payload = { error: 'Error' };

    const expectedActions = [LogsThunk.pending.type, LogsThunk.fulfilled.type];

    mockAxios.onGet('/users/logs/all').reply(500, payload);

    await store.dispatch(LogsThunk());

    const actions = store.getActions().map((action) => action.type);

    expect(actions).toEqual(expectedActions);
  });
});
