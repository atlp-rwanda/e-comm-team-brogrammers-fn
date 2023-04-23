/* eslint-disable no-promise-executor-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { test, expect, describe, beforeEach } from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import Login from '../src/Views/Login';
import { store } from '../src/redux/store';

describe('testing render Login page', () => {
  let loginDiv;
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Login />
        </BrowserRouter>
      </Provider>
    );
  });

  test('renders login header', () => {
    loginDiv = screen.getByTestId('sign_div');
    expect(loginDiv).not.toBeNull();
    expect(loginDiv).toBeInTheDocument();
  });

  test('renders login header', () => {
    const loginHeader = screen.getByText('Login to your account');
    expect(loginHeader).not.toBeNull();
    expect(loginHeader).toBeInTheDocument();
  });

  test('renders login form', () => {
    const loginForm = screen.getByTestId('login-form');
    expect(loginForm).not.toBeNull();
    expect(loginForm).toBeInTheDocument();
  });

  test('renders email input', () => {
    const loginForm = screen.getByPlaceholderText('Email');
    expect(loginForm).not.toBeNull();
    expect(loginForm).toBeInTheDocument();
  });

  test('renders password input', () => {
    const loginForm = screen.getByPlaceholderText('Password');
    expect(loginForm).not.toBeNull();
    expect(loginForm).toBeInTheDocument();
  });
});

describe('testing Login form', () => {
  let loginForm;
  const user = {
    email: 'jean@gmail.com',
    password: '123@Pass',
  };
  const wrongUser = {
    email: 'randomtest1234@gmail.com',
    password: 'BadStrong@1234',
  };
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Login />
        </BrowserRouter>
      </Provider>
    );
    loginForm = screen.getByTestId('login-form');
    localStorage.clear();
  });

  test('renders login form', () => {
    expect(loginForm).not.toBeNull();
    expect(loginForm).toBeInTheDocument();
  });

  test('shows error message when login fails', async () => {
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByTestId('submit');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: wrongUser.email } });
      fireEvent.change(passwordInput, {
        target: { value: wrongUser.password },
      });
      fireEvent.click(submitButton);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    });

    const { login } = store.getState();
    expect(login.loading).toBe(false);
    expect(login.error).toBe(true);
    expect(login.token).toBeNull();
    const formError = screen.getByTestId('form-error');
    expect(formError.textContent).toEqual(login.errorMessage);
  });

  test('logs in successfully', async () => {
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Log in');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: user.email } });
      fireEvent.change(passwordInput, { target: { value: user.password } });
      fireEvent.click(submitButton);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    });

    const { login } = store.getState();
    expect(login.loading).toBe(false);
    expect(login.error).toBe(false);
    expect(login.token).not.toBeNull();
  });
});