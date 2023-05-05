import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { test, expect, describe, jest, it } from '@jest/globals';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import ResetPassword from '../src/Views/reset/ResetPassword';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

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

test('invalid info', async () => {
  axios.post.mockResolvedValueOnce({ status: 200 });

  render(
    <BrowserRouter>
      <ResetPassword />
    </BrowserRouter>
  );

  const emailInput = screen.getByPlaceholderText('Email');
  act(() => {
    fireEvent.change(emailInput, { target: { value: 'brogrammer@gmail' } });
  });

  const passwordInput = screen.getByPlaceholderText('Password');
  act(() => {
    fireEvent.change(passwordInput, { target: { value: 'Testabcd' } });
  });

  const confirmPasswordInput = screen.getByPlaceholderText('Re-Enter Password');
  act(() => {
    fireEvent.change(confirmPasswordInput, { target: { value: 'Test1235' } });
  });

  const submitButton = screen.getByRole('button', { name: 'Reset Password' });
  act(() => {
    fireEvent.click(submitButton);
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
      `${process.env.REACT_APP_SERVER_URL}/users/reset-password`,
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

  expect(passwordInput).toHaveAttribute('type', 'password');
});

test('toggles password visibility when clicked', () => {
  render(
    <BrowserRouter>
      <ResetPassword />
    </BrowserRouter>
  );
  const passwordInput = screen.getByPlaceholderText('Password');
  const confirmPasswordInput = screen.getByPlaceholderText('Re-Enter Password');

  expect(passwordInput.type).toBe('password');
  expect(confirmPasswordInput.type).toBe('password');
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
