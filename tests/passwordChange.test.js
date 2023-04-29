/* eslint-disable no-promise-executor-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { test, expect, describe, beforeEach } from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import PasswordChange from '../src/Views/Password';
import { store } from '../src/redux/store';

describe('testing render Password Change page', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <PasswordChange />
        </BrowserRouter>
      </Provider>
    );
  });

  test('renders password change form', () => {
    const passwordChangeForm = screen.getByTestId('change-password-form');
    expect(passwordChangeForm).not.toBeNull();
    expect(passwordChangeForm).toBeInTheDocument();
  });

  test('renders current password input', () => {
    const currentPasswordInput =
      screen.getByPlaceholderText('Current Password');
    expect(currentPasswordInput).not.toBeNull();
    expect(currentPasswordInput).toBeInTheDocument();
  });

  test('renders new password input', () => {
    const newPasswordInput = screen.getByPlaceholderText('New Password');
    expect(newPasswordInput).not.toBeNull();
    expect(newPasswordInput).toBeInTheDocument();
  });

  test('renders confirm password input', () => {
    const confirmPasswordInput = screen.getByPlaceholderText(
      'Confirm New Password'
    );
    expect(confirmPasswordInput).not.toBeNull();
    expect(confirmPasswordInput).toBeInTheDocument();
  });
});

describe('testing password change form', () => {
  let passwordChangeForm;
  const user = {
    currentPassword: 'oldPass@123',
    newPassword: 'newPass@123',
    confirmNewPassword: 'newPass@123',
  };
  const wrongUser = {
    currentPassword: 'oldPass123',
    newPassword: 'weak',
    confirmNewPassword: 'weak',
  };
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <PasswordChange />
        </BrowserRouter>
      </Provider>
    );
    passwordChangeForm = screen.getByTestId('change-password-form');
  });

  test('renders password change form', () => {
    expect(passwordChangeForm).not.toBeNull();
    expect(passwordChangeForm).toBeInTheDocument();
  });

  test('shows error message when password change fails', async () => {
    const currentPasswordInput =
      screen.getByPlaceholderText('Current Password');
    const newPasswordInput = screen.getByPlaceholderText('New Password');
    const confirmPasswordInput = screen.getByPlaceholderText(
      'Confirm New Password'
    );
    const submitButton = screen.getByTestId('submit');

    await act(async () => {
      fireEvent.change(currentPasswordInput, {
        target: {
          value: user.currentPassword,
        },
      });
      fireEvent.change(newPasswordInput, {
        target: {
          value: wrongUser.newPassword,
        },
      });
      fireEvent.change(confirmPasswordInput, {
        target: {
          value: wrongUser.confirmNewPassword,
        },
      });
      fireEvent.click(submitButton);
    });
  });

  test('shows success message when password is changed successfully', async () => {
    const currentPasswordInput =
      screen.getByPlaceholderText('Current Password');
    const newPasswordInput = screen.getByPlaceholderText('New Password');
    const confirmPasswordInput = screen.getByPlaceholderText(
      'Confirm New Password'
    );
    const submitButton = screen.getByTestId('submit');

    await act(async () => {
      fireEvent.change(currentPasswordInput, {
        target: {
          value: user.currentPassword,
        },
      });
      fireEvent.change(newPasswordInput, {
        target: {
          value: user.newPassword,
        },
      });
      fireEvent.change(confirmPasswordInput, {
        target: {
          value: user.confirmNewPassword,
        },
      });
      fireEvent.click(submitButton);
    });
  });
});
