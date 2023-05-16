/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import CreateUserForm from '../src/Views/admin/CreateUser';

// Mock axios post method
jest.mock('axios');

// Mock react-toastify toast method
jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    update: jest.fn(),
    info: jest.fn(),
  },
}));

jest.mock('react-toastify');

describe('CreateUserForm', () => {
  test('handles API error', async () => {
    const mockErrorResponse = {
      response: {
        data: {
          message: 'Error occurred while creating user',
        },
      },
    };

    // Mock the axios post method to return an error response
    axios.post.mockRejectedValue(mockErrorResponse);

    const { getByLabelText, getByText } = render(<CreateUserForm />);

    // Fill in the form fields
    fireEvent.change(getByLabelText('Username:'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(getByLabelText('Email:'), {
      target: { value: 'test89@gmail.com' },
    });
    fireEvent.change(getByLabelText('Password:'), {
      target: { value: 'Test@123' },
    });
    fireEvent.change(getByLabelText('Gender:'), { target: { value: 'male' } });
    fireEvent.change(getByLabelText('Role:'), { target: { value: 'buyer' } });

    // Submit the form
    fireEvent.click(getByText('Create'));

    // Check that the axios post method was called with the correct data
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_SERVER_URL}/users/createUser`,
      {
        username: 'testuser',
        email: 'test89@gmail.com',
        password: 'Test@123',
        gender: 'male',
        role: 'buyer',
      },
      expect.any(Object) // Headers object
    );

    // Check that the error message is displayed
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Error occurred while creating user'
      );
    });
  });

  test('displays error message for invalid email format', () => {
    const { getByLabelText, getByText } = render(<CreateUserForm />);

    // Fill in the form fields
    fireEvent.change(getByLabelText('Email:'), {
      target: { value: 'hyug.com' },
    });

    // Submit the form
    fireEvent.click(getByText('Create'));

    // Check that the error message is displayed
    expect(toast.error).toHaveBeenCalledWith('Invalid email format.');
  });
});

describe('CreateUserForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('toggleShowPassword toggles the password visibility', () => {
    const { getByLabelText, getByTestId } = render(<CreateUserForm />);
    const passwordInput = getByLabelText('Password:');
    const eyeIcon = getByTestId('eye-icon');

    // Password is initially hidden
    expect(passwordInput.type).toBe('password');

    // Click the eye icon to show the password
    fireEvent.click(eyeIcon);
    expect(passwordInput.type).toBe('text');
  });

  test('passwordRegex validation shows error for invalid password', () => {
    const { getByLabelText } = render(<CreateUserForm />);
    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password:');

    // Enter a valid email
    fireEvent.change(emailInput, { target: { value: 'test4@gmail.com' } });

    // Enter an invalid password
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.submit(passwordInput);

    // Check that error message is shown in toast
    expect(toast.error).toHaveBeenCalledWith(
      'Password must be at least 8 characters, with 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.'
    );
  });

  test('passwordRegex validation does not show error for valid password', () => {
    const { getByLabelText } = render(<CreateUserForm />);
    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password:');

    // Enter a valid email
    fireEvent.change(emailInput, { target: { value: 'test4@gmail.com' } });

    // Enter a valid password
    fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
    fireEvent.submit(passwordInput);

    // Check that error message is not shown in toast
    expect(toast.error).not.toHaveBeenCalled();
  });
});
