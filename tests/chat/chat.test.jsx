import MockAdapter from 'axios-mock-adapter';
import { expect, describe, afterEach, it } from '@jest/globals';
import '@testing-library/jest-dom';
import axios from '../../src/redux/configs/axios';
import { store } from '../../src/redux/store';
import AddMessageThunk from '../../src/redux/features/actions/addMessage';
import MessagesThunk from '../../src/redux/features/actions/getMessage';

const mockAxios = new MockAdapter(axios);
describe('subscribeThunk', () => {
  afterEach(() => {
    mockAxios.reset();
  });
  it('should dispatch the correct actions when the request succeeds', async () => {
    const payload = {
      message: 'Message sent.',
      messages: {
        id: '5dfc866c-d63f-4347-8348-65121aed1d82',
        room: 'brogrammers',
        userId: '53b7fdb9-d5c2-4319-ba38-bc383e13f195',
        message: 'Hey',
        updatedAt: '2023-05-30T14:25:13.679Z',
        createdAt: '2023-05-30T14:25:13.679Z',
      },
    };
    mockAxios.onPost().reply(200, payload);
    await store.dispatch(
      AddMessageThunk({
        message: 'Hey',
      })
    );
  });
  it('should dispatch the correct actions when the request succeeds', async () => {
    const payload = {
      message: 'Fetched  messages',
      messages: [
        {
          id: '5dfc866c-d63f-4347-8348-65121aed1d82',
          room: 'brogrammers',
          message: 'Hey',
          createdAt: '2023-05-30T14:25:13.679Z',
          updatedAt: '2023-05-30T14:25:13.679Z',
          userId: '53b7fdb9-d5c2-4319-ba38-bc383e13f195',
          user: {
            username: 'brogrammer',
          },
        },
      ],
    };
    mockAxios.onGet().reply(200, payload);
    await store.dispatch(MessagesThunk());
    expect(store.getState().chat.messages.length).toEqual(1);
  });
  it('should dispatch the correct actions when the network error', async () => {
    mockAxios.onGet().reply(400, {
      message: 'Error',
    });
    try {
      await store.dispatch(MessagesThunk());
    } catch (err) {
      expect(err.response.data.message).toEqual('Error');
    }
  });
  it('should dispatch the correct actions when the network error', async () => {
    mockAxios.onPost('/subscriber').networkError();
    try {
      await store.dispatch(AddMessageThunk());
    } catch (err) {
      expect(err.message).toEqual('Network Error');
    }
  });
});
