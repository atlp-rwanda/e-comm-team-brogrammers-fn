/* eslint-disable no-undef */
// /* eslint-disable prefer-promise-reject-errors */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
// Replace the jest import with the following:
import {
  beforeAll,
  afterAll,
  expect,
  it,
  describe,
  beforeEach,
} from '@jest/globals';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import * as axios from 'axios';
import { toast } from 'react-hot-toast';
import Mfa from '../src/components/MFA/Mfa';

const mockStore = configureMockStore();

jest.mock('axios');
jest.mock('react-hot-toast', () => ({
  toast: {
    promise: jest.fn((promise, options) =>
      promise
        ? Promise.resolve(options.success({ data: { token: 'Success' } }))
        : Promise.resolve(options.error('Error.'))
    ),
  },
}));

describe('Mfa component', () => {
  let store;

  beforeAll(() => {
    axios.post.mockResolvedValue({ data: { token: '12345' } });
  });

  beforeEach(() => {
    store = mockStore({});
  });

  afterAll(() => jest.restoreAllMocks());

  describe('when rendered with valid props', () => {
    beforeEach(() => {
      render(
        <Provider store={store}>
          <Mfa email="test@example.com" />
        </Provider>
      );
    });

    it('should render the sign in form', () => {
      expect(screen.getByTestId('login-form')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('MFA Code')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Verify' })
      ).toBeInTheDocument();
    });

    it('should submit the form successfully with valid MFA code', async () => {
      fireEvent.change(screen.getByPlaceholderText('MFA Code'), {
        target: { value: '1234' },
      });
      fireEvent.submit(screen.getByTestId('login-form'));

      await waitFor(() =>
        expect(axios.post).toHaveBeenCalledWith(
          `${process.env.REACT_APP_SERVER_URL}/users/verify-mfa`,
          {
            mfa_code: 1234,
            email: 'test@example.com',
          }
        )
      );

      expect(store.getActions()).toEqual([
        {
          payload: {
            token: 'Success',
          },
          type: 'login/login',
        },
      ]);
      expect(toast.promise).toHaveBeenCalled();
    });

    it('should display an error message for invalid MFA code', async () => {
      axios.post.mockRejectedValueOnce({
        response: { data: { message: 'Invalid code' } },
      });

      fireEvent.change(screen.getByPlaceholderText('MFA Code'), {
        target: { value: 'invalid' },
      });
      fireEvent.submit(screen.getByTestId('login-form'));

      await waitFor(() =>
        expect(axios.post).toHaveBeenCalledWith(
          `${process.env.REACT_APP_SERVER_URL}/users/verify-mfa`,
          {
            mfa_code: 1234,
            email: 'test@example.com',
          }
        )
      );

      expect(store.getActions()).toEqual([]);
      expect(toast.promise).toHaveBeenCalled();
      expect(await toast.promise(false, { error: () => 'Error.' })).toBe(
        'Error.'
      );
      expect(
        await toast.promise(true, {
          success: () => 'MFA code was validated succesfully!',
        })
      ).toBe('MFA code was validated succesfully!');
    });
  });
});
