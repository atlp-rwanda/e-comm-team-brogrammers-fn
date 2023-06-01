import MockAdapter from 'axios-mock-adapter';
import { expect, describe, afterEach, it } from '@jest/globals';
import '@testing-library/jest-dom';
import axios from '../../src/redux/configs/axios';
import { store } from '../../src/redux/store';
import subscribeThunk, {
  getSubscribersThunk,
} from '../../src/redux/features/actions/subscribe';

const mockAxios = new MockAdapter(axios);
describe('subscribeThunk', () => {
  afterEach(() => {
    mockAxios.reset();
  });
  it('should dispatch the correct actions when the request succeeds', async () => {
    const payload = {
      id: '160f0e37-40df-4a1c-a945-3384c2bc159a',
      firstName: 'string',
      email: 'string@example.com',
      lastName: 'string',
      verificationToken: 'klwjx51ci3gcfb6tedh7p',
      updatedAt: '2023-05-30T14:01:34.149Z',
      createdAt: '2023-05-30T14:01:34.149Z',
      subscribed: false,
    };
    mockAxios.onPost('/subscriber').reply(200, payload);
    await store.dispatch(
      subscribeThunk({
        firstName: 'string',
        lastName: 'string',
        email: 'string@example.com',
      })
    );
  });
  it('should dispatch the correct actions when the request succeeds', async () => {
    const payload = {
      message: 'All subscribers Retrieved Successfully',
      subscribers: {
        totalCount: 1,
        results: [
          {
            id: 'b3c7a489-59c4-4b53-811a-05c60ba8da05',
            verificationToken: '0rhoasoag14c5ggsj1fnv3m',
            email: 'str@gmail.com',
            firstName: 'string',
            lastName: 'string',
            subscribed: false,
            createdAt: '2023-05-30T10:18:03.082Z',
            updatedAt: '2023-05-30T10:18:03.082Z',
          },
        ],
      },
    };
    mockAxios.onGet().reply(200, payload);
    await store.dispatch(getSubscribersThunk({ page: 1, limit: 10 }));
    expect(store.getState().subscribers?.data?.results?.length).toEqual(1);
  });
  it('should dispatch the correct actions when the network error', async () => {
    mockAxios.onGet().reply(400, {
      message: 'Error',
    });
    try {
      await store.dispatch(getSubscribersThunk());
    } catch (err) {
      expect(err.message).toEqual('Error');
    }
  });
  it('should dispatch the correct actions when the network error', async () => {
    mockAxios.onPost('/subscriber').networkError();
    try {
      await store.dispatch(subscribeThunk());
    } catch (err) {
      expect(err.message).toEqual('Network Error');
    }
  });
});
