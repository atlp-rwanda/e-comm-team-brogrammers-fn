/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-promise-executor-return */
import { act } from '@testing-library/react';
import { test, describe, expect, beforeEach, afterEach } from '@jest/globals';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { store } from '../../src/redux/store';
import LoginThunk from '../../src/redux/features/actions/login';
import PasswordThunk from '../../src/redux/features/actions/password';
import passwordReducer, {
  setSuccessMessage,
  setCurrentPassword,
  setNewPassword,
  setConfirmPassword,
  setIsLoading,
  setErrorMessage,
} from '../../src/redux/features/slices/password';

const mock = new MockAdapter(axios);

describe('passwordSlice reducer', () => {
  const validCredentials = {
    email: 'mary@gmail.com',
    password: '123@Pass',
  };
  const newPassword = '123@Pass';

  beforeEach(async () => {
    mock.onPost(`/users/login`).reply(200, {
      email: validCredentials.email,
      token: 'token example',
      message: 'Login Successfully',
    });
    await act(async () => {
      store.dispatch(LoginThunk(validCredentials));
      await new Promise((resolve) => setTimeout(resolve, 18000));
    });
  });

  afterEach(() => {
    store.dispatch(setSuccessMessage(undefined));
    store.dispatch(setErrorMessage(undefined));
    mock.reset();
  });

  test('should update successMessage when password is changed', async () => {
    mock.onPatch(`/users/change-password`).reply(200, {
      message: 'Password updated successfully',
    });
    await act(async () => {
      store.dispatch(
        PasswordThunk({
          oldPassword: validCredentials.password,
          newPassword,
        })
      );
      await new Promise((resolve) => setTimeout(resolve, 15000));
    });

    const { password } = store.getState();
    expect(password.isLoading).toBe(false);
    expect(password.currentPassword).toBe('');
    expect(password.newPassword).toBe('');
    expect(password.confirmPassword).toBe('');
    expect(password.successMessage).toBe('Password updated successfully');
  });

  test('should return error when password change fails', async () => {
    mock.onPatch(`/users/change-password`).reply(401, {
      message: 'Incorrect old password',
    });
    const wrongPassword = 'wrongPass123@';

    await act(async () => {
      store.dispatch(
        PasswordThunk({
          oldPassword: wrongPassword,
          newPassword: 'newPass123',
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

  test('setCurrentPassword', () => {
    const state = { currentPassword: 'oldPass123' };
    const action = setCurrentPassword('newPass123@');
    const newState = passwordReducer(state, action);
    expect(newState.currentPassword).toBe('newPass123@');
  });

  test('setNewPassword', () => {
    const state = { newPassword: null };
    const action = setNewPassword(newPassword);
    const newState = passwordReducer(state, action);
    expect(newState.newPassword).toBe(newPassword);
  });

  test('setConfirmPassword', () => {
    const state = { confirmPassword: null };
    const action = setConfirmPassword(newPassword);
    const newState = passwordReducer(state, action);
    expect(newState.confirmPassword).toBe(newPassword);
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
