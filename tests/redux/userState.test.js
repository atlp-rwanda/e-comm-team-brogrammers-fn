/* eslint-disable no-promise-executor-return */
// _ eslint-disable no-promise-executor-return _/
// _ eslint-disable import/no-extraneous-dependencies _/
import { act } from '@testing-library/react';
import { test, describe, expect, beforeEach, afterEach } from '@jest/globals';
import MockAdapter from 'axios-mock-adapter';
import { store } from '../../src/redux/store';
import UserThunk from '../../src/redux/features/actions/user';
import LoginThunk from '../../src/redux/features/actions/login';
import axios from '../../src/redux/configs/axios';

const mock = new MockAdapter(axios);

describe('test login states', () => {
  const wrongAccount = {
    email: 'test@example.com',
    password: '123@Strong',
  };
  const userAccount = {
    email: 'john@gmail.com',
    password: '123@Pass',
  };
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    mock.reset();
  });

  test('should return error for wrong credentials', async () => {
    mock.onPost(`/users/login`).reply(401, {
      message: 'Incorrect email or password',
    });
    mock.onGet(`/users/profile`).reply(401, {
      statusCode: 401,
      message: 'Please Login',
    });
    await act(async () => {
      store.dispatch(LoginThunk(wrongAccount));
      await new Promise((resolve) => setTimeout(resolve, 9000));
    });

    await act(async () => {
      store.dispatch(UserThunk());
      await new Promise((resolve) => setTimeout(resolve, 9000));
    });

    const { user } = store.getState();
    expect(user.loading).toBe(false);
    expect(user.user).toBeNull();
    expect(user.error).toBe(true);
  });

  test('should return error user', async () => {
    mock.onPost(`/users/login`).reply(200, {
      email: userAccount.email,
      token: 'token example',
      message: 'Login Successfully',
    });
    mock.onGet(`/users/profile`).reply(200, {
      avatar:
        'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/684.jpg',
      cover_image: 'https://loremflickr.com/640/480',
      email: userAccount.email,
      username: 'sample user',
      role: 'buyer',
      gender: 'none',
    });
    await act(async () => {
      store.dispatch(LoginThunk(userAccount));
      await new Promise((resolve) => setTimeout(resolve, 9000));
    });

    await act(async () => {
      store.dispatch(UserThunk());
      await new Promise((resolve) => setTimeout(resolve, 9000));
    });

    const { user } = store.getState();
    expect(user.loading).toBe(false);
    expect(user.user).not.toBeNull();
    expect(user.error).toBe(false);
  });
});
