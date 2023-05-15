/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { loginSlice } from '../src/redux/features/slices/login';
import '@testing-library/jest-dom';

import GoogleLoginButton from '../src/components/GoogleLoginButton';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(() => ({
    search: '?key=123&email=test@example.com',
  })),
}));

jest.mock('react-hot-toast', () => ({
  toast: { success: jest.fn() },
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('GoogleLoginButton', () => {
  let dispatch;
  beforeEach(() => {
    dispatch = jest.fn();

    useDispatch.mockImplementation(() => dispatch);
  });

  it('should render the button', () => {
    const { getByText } = render(<GoogleLoginButton />);
    expect(getByText('Google Login')).toBeInTheDocument();
  });

  it('should call the login action when the key and email are present in the query params', () => {
    render(<GoogleLoginButton />);
    expect(dispatch).toHaveBeenCalledWith(
      loginSlice.actions.login({ token: '123' })
    );
  });

  it('should show a success toast when the key and email are present in the query params', () => {
    render(<GoogleLoginButton />);
    expect(toast.success).toHaveBeenCalledWith('You have logged in!');
  });
});
