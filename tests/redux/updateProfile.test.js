import MockAdapter from 'axios-mock-adapter';
import { expect, describe, afterEach, it } from '@jest/globals';
import '@testing-library/jest-dom';
import { waitFor } from '@testing-library/react';
import axios from '../../src/redux/configs/axios';
import { store } from '../../src/redux/store';
import updateprofileThunk from '../../src/redux/features/actions/UpdateProfile';

const payload = {
  avatar:
    'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1101.jpg',
  cover_image: 'https://loremflickr.com/640/480',
  mfa_enabled: false,
  email: 'test@example.com',
  username: 'test',
  role: 'admin',
  gender: 'none',
};

const mockAxios = new MockAdapter(axios);
describe('subscribeThunk', () => {
  afterEach(() => {
    mockAxios.reset();
  });
  it('should dispatch the correct actions when the request succeeds', async () => {
    const update = {
      username: 'test2',
    };
    mockAxios.onPatch().reply(200, { ...payload, ...update });

    await store.dispatch(updateprofileThunk({ ...update }));

    await waitFor(() => {
      expect(store.getState().updateProfile.loading).toBe(0);
    });
    expect(store.getState().updateProfile.error).toBe('');
  });

  it('should dispatch the error', async () => {
    const update = {
      username: 'test2',
    };
    mockAxios.onPatch().networkError();

    await store.dispatch(updateprofileThunk({ ...update }));

    await waitFor(() => {
      expect(store.getState().updateProfile.loading).toBe(0);
    });
    expect(store.getState().updateProfile.error).toBe('');
  });
});
