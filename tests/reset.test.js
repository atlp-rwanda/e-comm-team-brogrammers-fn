/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import ResetPassword from '../src/Views/reset/ResetPassword';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios', () => ({
  post: jest.fn(),
}));

test('updates email state on user input', () => {
  render(
    <BrowserRouter>
      <ResetPassword />
    </BrowserRouter>
  );

  const emailInput = screen.getByPlaceholderText('Email');
  act(() => {
    fireEvent.change(emailInput, { target: { value: 'brogrammer@gmail.com' } });
  });

  expect(emailInput.value).toBe('brogrammer@gmail.com');
});

test('updates password state on user input', () => {
  render(
    <BrowserRouter>
      <ResetPassword />
    </BrowserRouter>
  );

  const passwordInput = screen.getByPlaceholderText('Password');
  act(() => {
    fireEvent.change(passwordInput, { target: { value: 'Test1234!@#' } });
  });

  expect(passwordInput).toHaveValue('Test1234!@#');
});

describe('ResetPassword component', () => {
  it('should validate email input', async () => {
    render(
      <BrowserRouter>
        <ResetPassword />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText('Email');
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    });

    // assert that the validation error is displayed
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  });

  it('should validate password input', async () => {
    render(
      <BrowserRouter>
        <ResetPassword />
      </BrowserRouter>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    act(() => {
      fireEvent.change(passwordInput, {
        target: { value: 'invalid-password' },
      });
    });
    // assert that the validation error is displayed
    expect(
      screen.getByText(
        'Password must be at least 8 characters, 1 uppercase letter, 1 symbol, and 1 number'
      )
    ).toBeInTheDocument();
  });

  it('should validate confirm password input', async () => {
    render(
      <BrowserRouter>
        <ResetPassword />
      </BrowserRouter>
    );

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput =
      screen.getByPlaceholderText('Re-Enter Password');
    act(() => {
      fireEvent.change(passwordInput, { target: { value: 'password123#' } });
      fireEvent.change(confirmPasswordInput, {
        target: { value: 'password123' },
      });
    });

    // assert that the validation error is displayed
    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });
});

test('handles form submission', async () => {
  axios.post.mockResolvedValueOnce({ status: 200 });

  render(
    <BrowserRouter>
      <ResetPassword />
    </BrowserRouter>
  );

  const emailInput = screen.getByPlaceholderText('Email');
  act(() => {
    fireEvent.change(emailInput, { target: { value: 'brogrammer@gmail.com' } });
  });

  const passwordInput = screen.getByPlaceholderText('Password');
  act(() => {
    fireEvent.change(passwordInput, { target: { value: 'Test1234!' } });
  });

  const confirmPasswordInput = screen.getByPlaceholderText('Re-Enter Password');
  act(() => {
    fireEvent.change(confirmPasswordInput, { target: { value: 'Test1234!' } });
  });

  const submitButton = screen.getByRole('button', { name: 'Reset Password' });
  act(() => {
    fireEvent.click(submitButton);
  });

  await waitFor(() =>
    expect(axios.post).toHaveBeenCalledWith(
      'https://brogrammers-ecomerce1.onrender.com/users/reset-password',
      { email: 'brogrammer@gmail.com', newPassword: 'Test1234!' },
      { headers: { 'Content-Type': 'application/json' } }
    )
  );
});

test('toggles password visibility', () => {
  render(
    <BrowserRouter>
      <ResetPassword />
    </BrowserRouter>
  );

  const passwordInput = screen.getByPlaceholderText('Password');
  const toggleButton = screen.getByTestId('toggle-password');

  // expect(passwordInput.type).toBe('password');
  expect(passwordInput).toHaveAttribute('type', 'password');

  fireEvent.click(toggleButton);

  // expect(passwordInput.type).toBe('text');
  expect(passwordInput).toHaveAttribute('type', 'text');

  fireEvent.click(toggleButton);

  // expect(passwordInput.type).toBe('password');
  expect(passwordInput).toHaveAttribute('type', 'password');
});

test('displays error toast if email is not found', async () => {
  axios.post.mockRejectedValueOnce({ response: { status: 404 } });

  render(
    <BrowserRouter>
      <ResetPassword />
    </BrowserRouter>
  );

  const emailInput = screen.getByPlaceholderText('Email');
  act(() => {
    fireEvent.change(emailInput, { target: { value: 'brogrammer@gmail.com' } });
  });

  const passwordInput = screen.getByPlaceholderText('Password');
  act(() => {
    fireEvent.change(passwordInput, { target: { value: 'Test1234!' } });
  });

  const confirmPasswordInput = screen.getByPlaceholderText('Re-Enter Password');
  act(() => {
    fireEvent.change(confirmPasswordInput, { target: { value: 'Test1234!' } });
  });

  const submitButton = screen.getByRole('button', { name: 'Reset Password' });
  act(() => {
    fireEvent.click(submitButton);
  });
});
