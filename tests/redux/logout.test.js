/* eslint-disable no-promise-executor-return */
/* eslint-disable import/no-extraneous-dependencies */
import { act } from '@testing-library/react';
import { test, expect } from '@jest/globals';
import { store } from '../../src/redux/store';
import LogoutThunk from '../../src/redux/features/actions/logout';
import LoginThunk from '../../src/redux/features/actions/login';

const testUser = {
  email: 'jean@gmail.com',
  password: '123@Pass',
};

test('logout', async () => {
  await act(async () => {
    store.dispatch(LoginThunk(testUser));
    await new Promise((resolve) => setTimeout(resolve, 6000));
  });

  const { login } = store.getState();
  expect(login.loading).toBe(false);
  expect(login.token).not.toBeNull();

  await act(async () => {
    store.dispatch(LogoutThunk());
    await new Promise((resolve) => setTimeout(resolve, 6000));
  });

  const {
    login: { token },
    logout,
  } = store.getState();
  expect(token).toBeNull();
  expect(logout.logout).toBe(true);

  await act(async () => {
    store.dispatch(LogoutThunk());
    await new Promise((resolve) => setTimeout(resolve, 6000));
  });

  const {
    logout: { error },
  } = store.getState();
  expect(error).toBe(true);
});
