/* eslint-disable no-promise-executor-return */
// _ eslint-disable no-promise-executor-return _/
// _ eslint-disable import/no-extraneous-dependencies _/
import { act } from '@testing-library/react';
import { test, describe, expect } from '@jest/globals';
import { store } from '../../src/redux/store';
import LoginThunk from '../../src/redux/features/actions/login';

describe('test login states', () => {
  const wrongUser = {
    email: 'test@example.com',
    password: '123@Strong',
  };

  test('should return error for wrong credentials', async () => {
    await act(async () => {
      store.dispatch(LoginThunk(wrongUser));
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    const { login } = store.getState();
    expect(login.loading).toBe(false);
    expect(login.token).toBeNull();
    expect(login.error).toBe(true);
  });
});
