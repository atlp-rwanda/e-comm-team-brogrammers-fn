/* eslint-disable no-promise-executor-return */
/* eslint-disable import/no-extraneous-dependencies */
import { act } from '@testing-library/react';
import { test, describe, expect, beforeEach } from '@jest/globals';
import { store } from '../../src/redux/store';
import UserThunk from '../../src/redux/features/actions/user';
import LoginThunk from '../../src/redux/features/actions/login';

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

  test('should return error for wrong credentials', async () => {
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
