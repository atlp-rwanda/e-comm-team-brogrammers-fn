/* eslint-disable import/no-duplicates */
/* eslint-disable no-promise-executor-return */
/* eslint-disable import/no-extraneous-dependencies */
import { act } from '@testing-library/react';
import { test, describe, expect, beforeEach, afterEach } from '@jest/globals';
import { store } from '../../src/redux/store';
import LoginThunk from '../../src/redux/features/actions/login';
import passwordReducer from '../../src/redux/features/slices/password';
import PasswordThunk from '../../src/redux/features/actions/password';
import {
  setSuccessMessage,
  setCurrentPassword,
  setNewPassword,
  setConfirmPassword,
  setIsLoading,
  setErrorMessage,
} from '../../src/redux/features/slices/password';

describe('passwordSlice reducer', () => {
  const validCredentials = {
    email: 'nambajeeedwin@gmail.com',
    password: '123@Pass3',
  };

  beforeEach(async () => {
    await act(async () => {
      store.dispatch(LoginThunk(validCredentials));
      await new Promise((resolve) => setTimeout(resolve, 10000));
    });
  });

  afterEach(() => {
    store.dispatch(setSuccessMessage(undefined));
    store.dispatch(setErrorMessage(undefined));
  });

  test('should update successMessage when password is changed', async () => {
    const newPassword = '123@Pass3';

    await act(async () => {
      store.dispatch(
        PasswordThunk({
          oldPassword: validCredentials.password,
          newPassword,
        })
      );
      await new Promise((resolve) => setTimeout(resolve, 10000));
    });

    const { password } = store.getState();
    expect(password.isLoading).toBe(false);
    expect(password.currentPassword).toBe('');
    expect(password.newPassword).toBe('');
    expect(password.confirmPassword).toBe('');
    expect(password.successMessage).toBe('Password updated successfully');
  });

  test('should return error when password change fails', async () => {
    const wrongPassword = 'wrongPass123@';

    await act(async () => {
      store.dispatch(
        PasswordThunk({
          oldPassword: wrongPassword,
          newPassword: 'newPass123@',
        })
      );
      await new Promise((resolve) => setTimeout(resolve, 10000));
    });

    const { password } = store.getState();
    expect(password.isLoading).toBe(false);
    expect(password.currentPassword).toBe('');
    expect(password.newPassword).toBe('');
    expect(password.confirmPassword).toBe('');
    expect(password.error).toBe(null);
  });
});
describe('password slice reducers', () => {
  test('setCurrentPassword', () => {
    const state = { currentPassword: 'oldPass123' };
    const action = setCurrentPassword('newPass123');
    const newState = passwordReducer(state, action);
    expect(newState.currentPassword).toBe('newPass123');
  });

  test('setNewPassword', () => {
    const state = { newPassword: null };
    const action = setNewPassword('newPass123');
    const newState = passwordReducer(state, action);
    expect(newState.newPassword).toBe('newPass123');
  });

  test('setConfirmPassword', () => {
    const state = { confirmPassword: null };
    const action = setConfirmPassword('newPass123');
    const newState = passwordReducer(state, action);
    expect(newState.confirmPassword).toBe('newPass123');
  });

  test('setIsLoading', () => {
    const state = { isLoading: false };
    const action = setIsLoading(true);
    const newState = passwordReducer(state, action);
    expect(newState.isLoading).toBe(true);
  });

  test('setErrorMessage', () => {
    const state = { error: false };
    const action = setErrorMessage(true);
    const newState = passwordReducer(state, action);
    expect(newState.error).toBe(true);
  });
});
