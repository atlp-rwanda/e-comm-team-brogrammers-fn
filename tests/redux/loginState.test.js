/* eslint-disable no-promise-executor-return */
import { act } from '@testing-library/react';
import { test, describe, expect } from '@jest/globals';
import MockAdapter from 'axios-mock-adapter';
import { store } from '../../src/redux/store';
import LoginThunk from '../../src/redux/features/actions/login';
import axios from '../../src/redux/configs/axios';

const mock = new MockAdapter(axios);

describe('test login states', () => {
  const wrongUser = {
    email: 'test@example.com',
    password: '123@Strong',
  };

  test('should return error for wrong credentials', async () => {
    mock.onAny().reply(401, { message: 'Invalid email or password' });
    await act(async () => {
      store.dispatch(LoginThunk(wrongUser));
      await new Promise((resolve) => setTimeout(resolve, 2000));
    });

    const { login } = store.getState();
    expect(login.loading).toBe(false);
    expect(login.token).toBeNull();
    expect(login.error).toBe(true);
  });
});
