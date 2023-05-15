/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-promise-executor-return */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { test, expect, describe, beforeEach } from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import Signup from '../src/Views/Signup';
import { store } from '../src/redux/store';

describe('testing render Login page', () => {
  let signupDiv;
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Signup />
        </BrowserRouter>
      </Provider>
    );
  });

  test('renders signup header', () => {
    signupDiv = screen.getByTestId('signup-div');
    expect(signupDiv).not.toBeNull();
    expect(signupDiv).toBeInTheDocument();
  });

  test('renders signup header', () => {
    const signupHeader = screen.getByText('Create Account Here');
    expect(signupHeader).not.toBeNull();
    expect(signupHeader).toBeInTheDocument();
  });

  test('renders signup form', () => {
    const signupForm = screen.getByTestId('signup-form');
    expect(signupForm).not.toBeNull();
    expect(signupForm).toBeInTheDocument();
  });
  test('renders email input', () => {
    const signupForm = screen.getByPlaceholderText('Enter Your Email');
    expect(signupForm).not.toBeNull();
    expect(signupForm).toBeInTheDocument();
  });
  test('renders username input', () => {
    const signupForm = screen.getByPlaceholderText('Enter username');
    expect(signupForm).not.toBeNull();
    expect(signupForm).toBeInTheDocument();
  });

  test('renders password input', () => {
    const signupForm = screen.getByPlaceholderText('Enter your Password');
    expect(signupForm).not.toBeNull();
    expect(signupForm).toBeInTheDocument();
  });

  test('renders password confirmation input', () => {
    const signupForm = screen.getByPlaceholderText('Re-Enter your Password');
    expect(signupForm).not.toBeNull();
    expect(signupForm).toBeInTheDocument();
  });
});

describe('testing signup form', () => {
  let signupForm;
  const user = {
    email: 'jane@gmail.com',
    username: 'jane doe',
    password: '123@Pass',
    confirmPassword: '123@Pass',
    gender: 'female',
  };
  const wrongUser = {
    email: 'randomtest1234@gmail.com',
    username: 'bad strong',
    password: 'BadStrong@1234',
    confirmPassword: '123@Pass',
    gender: 'none',
  };
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Signup />
        </BrowserRouter>
      </Provider>
    );
    signupForm = screen.getByTestId('signup-form');
  });

  test('renders signup form', () => {
    expect(signupForm).not.toBeNull();
    expect(signupForm).toBeInTheDocument();
  });

  test('shows error message when signup fails', async () => {
    const emailInput = screen.getByPlaceholderText('Enter Your Email');
    const usernameInput = screen.getByPlaceholderText('Enter username');
    const passwordInput = screen.getByPlaceholderText('Enter your Password');
    const comfirmPasswordInput = screen.getByPlaceholderText(
      'Re-Enter your Password'
    );
    const submitButton = screen.getByTestId('submit');

    await act(async () => {
      const male = screen.getByText('Male');
      fireEvent.change(emailInput, { target: { value: wrongUser.email } });
      fireEvent.change(usernameInput, {
        target: { value: wrongUser.username },
      });
      fireEvent.change(passwordInput, {
        target: { value: wrongUser.password },
      });
      fireEvent.change(comfirmPasswordInput, {
        target: { value: wrongUser.password },
      });
      fireEvent.change(passwordInput, {
        target: { value: wrongUser.password },
      });
      fireEvent.select(male);
      fireEvent.submit(submitButton);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    });

    const formError = screen.getByTestId('form-error');
    expect(formError.textContent).not.toBeUndefined();
  });

  test('signs up successfully', async () => {
    const genderSelect = screen.getByPlaceholderText('Gender');

    const emailInput = screen.getByPlaceholderText('Enter Your Email');
    const usernameInput = screen.getByPlaceholderText('Enter username');
    const passwordInput = screen.getByPlaceholderText('Enter your Password');
    const confirmPasswordInput = screen.getByPlaceholderText(
      'Re-Enter your Password'
    );
    const submitButton = screen.getByTestId('submit');

    await act(async () => {
      fireEvent.change(emailInput, {
        target: {
          value: user.email,
        },
      });
      fireEvent.change(usernameInput, {
        target: {
          value: user.username,
        },
      });
      fireEvent.change(passwordInput, {
        target: {
          value: user.password,
        },
      });
      fireEvent.change(confirmPasswordInput, {
        target: {
          value: user.confirmPassword,
        },
      });
      // eslint-disable-next-line no-unused-expressions
      fireEvent.change(genderSelect, {
        target: {
          value: 'Male',
        },
      });
      fireEvent.click(submitButton);
    });
  });
});
