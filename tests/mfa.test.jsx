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
    promise: jest.fn(),
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

      expect(store.getActions()).toEqual([]);
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
    });
  });
});

// // /* eslint-disable prefer-promise-reject-errors */
// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import {
//   jest,
//   beforeAll,
//   afterAll,
//   expect,
//   it,
//   describe,
//   beforeEach,
// } from '@jest/globals';
// import { Provider } from 'react-redux';
// import configureMockStore from 'redux-mock-store';
// import * as axios from 'axios';
// import Mfa from '../src/components/MFA/Mfa';

// const mockStore = configureMockStore();

// jest.mock('axios');

// describe('Mfa component', () => {
//   let store;

//   beforeAll(() => {
//     axios.post.mockResolvedValue({ data: { token: '12345' } });
//   });

//   beforeEach(() => {
//     store = mockStore({});
//   });

//   afterAll(() => jest.restoreAllMocks());

//   describe('when rendered with valid props', () => {
//     beforeEach(() => {
//       render(
//         <Provider store={store}>
//           <Mfa email="test@example.com" />
//         </Provider>
//       );
//     });

//     it('should render the sign in form', () => {
//       expect(screen.getByTestId('login-form')).toBeInTheDocument();
//       expect(screen.getByPlaceholderText('MFA Code')).toBeInTheDocument();
//       expect(
//         screen.getByRole('button', { name: 'Submit' })
//       ).toBeInTheDocument();
//     });

//     it('should submit the form successfully with valid MFA code', async () => {
//       fireEvent.change(screen.getByPlaceholderText('MFA Code'), {
//         target: { value: '1234' },
//       });
//       fireEvent.submit(screen.getByTestId('login-form'));

//       await waitFor(() =>
//         expect(axios.post).toHaveBeenCalledWith(
//           `${process.env.REACT_APP_SERVER_URL}/users/verify-mfa`,
//           {
//             mfa_code: 1234,
//             email: 'test@example.com',
//           }
//         )
//       );

//       expect(store.getActions()).toEqual([
//         {
//           payload: {
//             token: '12345',
//           },
//           type: 'login/login',
//         },
//       ]);
//     });

//     it('should display an error message for invalid MFA code', async () => {
//       axios.post.mockRejectedValueOnce({
//         response: { data: { message: 'Invalid code' } },
//       });

//       fireEvent.change(screen.getByPlaceholderText('MFA Code'), {
//         target: { value: 'invalid' },
//       });
//       fireEvent.submit(screen.getByTestId('login-form'));

//       await waitFor(() =>
//         expect(axios.post).toHaveBeenCalledWith(
//           `${process.env.REACT_APP_SERVER_URL}/users/verify-mfa`,
//           {
//             mfa_code: 1234,
//             email: 'test@example.com',
//           }
//         )
//       );

//       expect(screen.getByText('Error. Invalid code')).toBeInTheDocument();
//       expect(store.getActions()).toEqual([]);
//     });
//   });
// });

// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import {
//   jest,
//   beforeAll,
//   expect,
//   afterAll,
//   it,
//   describe,
//   beforeEach,
// } from '@jest/globals';
// import { Provider } from 'react-redux';
// import configureMockStore from 'redux-mock-store';
// import * as axios from 'axios';
// import Mfa from '../src/components/MFA/Mfa';

// const mockStore = configureMockStore();

// jest.mock('axios');

// describe('Mfa component', () => {
//   let store;

//   beforeAll(() => {
//     axios.post.mockResolvedValue({ data: { token: '12345' } });
//   });

//   beforeEach(() => {
//     store = mockStore({});
//   });

//   afterAll(() => jest.restoreAllMocks());

//   describe('when rendered with valid props', () => {
//     beforeEach(() => {
//       render(
//         <Provider store={store}>
//           <Mfa email="test@example.com" />
//         </Provider>
//       );
//     });

//     it('should render the sign in form', () => {
//       expect(screen.getByTestId('login-form')).toBeInTheDocument();
//       expect(screen.getByPlaceholderText('MFA Code')).toBeInTheDocument();
//       expect(
//         screen.getByRole('button', { name: 'Submit' })
//       ).toBeInTheDocument();
//     });

//     it('should submit the form successfully with valid MFA code', async () => {
//       fireEvent.change(screen.getByPlaceholderText('MFA Code'), {
//         target: { value: '1234' },
//       });
//       fireEvent.submit(screen.getByTestId('login-form'));

//       await waitFor(() =>
//         expect(axios.post).toHaveBeenCalledWith('/api/verify-mfa', {
//           mfa_code: '1234',
//           email: 'test@example.com',
//         })
//       );

//       expect(store.getActions()).toEqual([{ type: 'login/login' }]);
//     });

//     it('should display an error message for invalid MFA code', async () => {
//       axios.post.mockRejectedValueOnce({
//         response: { data: { message: 'Invalid code' } },
//       });

//       fireEvent.change(screen.getByPlaceholderText('MFA Code'), {
//         target: { value: 'invalid' },
//       });
//       fireEvent.submit(screen.getByTestId('login-form'));

//       await waitFor(() =>
//         expect(axios.post).toHaveBeenCalledWith('/api/verify-mfa', {
//           mfa_code: 'invalid',
//           email: 'test@example.com',
//         })
//       );

//       expect(screen.getByText('Error. Invalid code')).toBeInTheDocument();
//       expect(store.getActions()).toEqual([]);
//     });
//   });
// });
// import { jest, expect, it, describe, beforeEach } from '@jest/globals';
// import { render, fireEvent } from '@testing-library/react';
// import React from 'react';
// import Mfa from '../src/components/MFA/Mfa';
// import { useDispatch } from 'react-redux';
// import axios from 'axios';
// import { loginSlice } from '../src/redux/features/slices/login';

// jest.mock('react-redux');
// jest.mock('axios', {post: jest.fn(() => Promise.resolve())});

// describe('Mfa', () => {
//   let dispatch;
//   beforeEach(() => {
//     dispatch = jest.fn();
//     useDispatch.mockReturnValue(dispatch);
//   });

//   it('should render the form', () => {
//     const { getByTestId } = render(<Mfa email="test@example.com" />);
//     expect(getByTestId('sign_div')).toBeInTheDocument();
//     expect(getByTestId('login-form')).toBeInTheDocument();
//     expect(getByTestId('submit')).toBeInTheDocument();
//   });

//   it('should submit the form with valid data', async () => {
//     const { getByTestId, getByPlaceholderText  } = render(<Mfa email="test@example.com" />);
//     const mfaCodeInput = getByPlaceholderText('MFA Code');
//     fireEvent.change(mfaCodeInput, { target: { value: '123456' } });
//     const submitButton = getByTestId('submit');
//     fireEvent.click(submitButton);
//     expect(axios.post).toHaveBeenCalledWith(
//       `${process.env.REACT_APP_SERVER_URL}/users/verify-mfa`,
//       { mfa_code: 123456, email: 'test@example.com' }
//     );
//     await Promise.resolve({ data: { token: 'token' } });
//     expect(dispatch).toHaveBeenCalledWith(
//       loginSlice.actions.login({ token: 'token' })
//     );
//   });

//   it('should not submit the form with invalid data', async () => {
//     const { getByTestId, getByPlaceholderText } = render(
//       <Mfa email="test@example.com" />
//     );
//     const mfaCodeInput = getByPlaceholderText('MFA Code');
//     fireEvent.change(mfaCodeInput, { target: { value: 'abc' } });
//     const submitButton = getByTestId('submit');
//     fireEvent.click(submitButton);
//     expect(axios.post).not.toHaveBeenCalled();
//   });
// });
