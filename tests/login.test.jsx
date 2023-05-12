/* eslint-disable no-promise-executor-return */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { test, expect, describe, beforeEach, afterEach } from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import MockAdapter from 'axios-mock-adapter';
import Login from '../src/Views/Login';
import { store } from '../src/redux/store';
import axios from '../src/redux/configs/axios';

const mock = new MockAdapter(axios);

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
    email: 'john@gmail.com',
    password: '123@Pass',
  };
  const wrongUser = {
    email: 'randomtest1234@gmail.com',
    password: 'BadStrong@1234',
  };
  afterEach(() => {
    mock.reset();
  });
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
  test('network error', async () => {
    mock.onPost(`/users/login`).networkError();

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByTestId('submit');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: user.email } });
      fireEvent.change(passwordInput, {
        target: { value: user.password },
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
  test('shows error message when login fails', async () => {
    mock.onPost(`/users/login`).reply(400, {
      message: 'Incorrect email or password',
    });
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
    mock.onPost(`/users/login`).reply(200, {
      email: user.email,
      token: 'testEmail',
      message: 'Login Successfully',
    });

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Log in');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: user.email } });
      fireEvent.change(passwordInput, { target: { value: user.password } });
      fireEvent.click(submitButton);
      await new Promise((resolve) => setTimeout(resolve, 10000));
    });

    const { login } = store.getState();
    expect(login.loading).toBe(false);
    expect(login.error).toBe(false);
    expect(login.token).not.toBeNull();
  });
});
