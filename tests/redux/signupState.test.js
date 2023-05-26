/* eslint-disable no-promise-executor-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-promise-executor-return */
/* eslint-disable import/no-extraneous-dependencies */
import { act } from '@testing-library/react';
import { test, describe, expect } from '@jest/globals';
// eslint-disable-next-line import/no-unresolved, import/extensions
import signupThunk from '../../src/redux/features/actions/signup';
import { store } from '../../src/redux/store';

describe('test signup states', () => {
  const randomString = Math.random().toString(36).substring(2, 7);
  const randomEmail = `test_${randomString}_${Math.floor(
    Math.random() * 100000
  )}@example.com`;

  const validUser = {
    email: randomEmail,
    password: '123@Strong',
    username: 'test email',
    gender: 'Female',
  };

  test('should successfully signup a user', async () => {
    await act(async () => {
      store.dispatch(signupThunk(validUser));
      await new Promise((resolve) => setTimeout(resolve, 10000));
    });

    const { signup } = store.getState();
    expect(signup.isLoading).toBe(false);
    expect(signup.error).toBe(null);
    expect(signup.data.user.email).toEqual(validUser.email);
    expect(signup.data.user.username).toEqual(validUser.username);
    expect(signup.data.user.gender).toEqual(validUser.gender);
  });
  const invalidUser = {
    email: 'invalidemail',
    password: 'weakpassword',
    username: 'weakpassword',
    gender: 'Female',
  };

  test('should return error for invalid user data', async () => {
    await act(async () => {
      store.dispatch(signupThunk(invalidUser));
      await new Promise((resolve) => setTimeout(resolve, 10000));
    });

    const { signup } = store.getState();
    expect(signup.isLoading).toBe(false);
    expect(signup.error).toBe(null);
  });
});
