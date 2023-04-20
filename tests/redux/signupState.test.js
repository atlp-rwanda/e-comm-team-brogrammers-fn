/* eslint-disable no-promise-executor-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-promise-executor-return */
/* eslint-disable import/no-extraneous-dependencies */
import { act } from '@testing-library/react';
import { test, describe, expect } from '@jest/globals';
// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// eslint-disable-next-line import/no-unresolved, import/extensions
import signupThunk from '../../src/redux/features/actions/signup';
import { store } from '../../src/redux/store';

describe('test signup states', () => {
  const randomString = Math.random().toString(36).substring(2, 7);
  const randomEmail = `test_${randomString}_${Math.floor(
    Math.random() * 100000
  )}@example.com`;

  const validUser = {
    email: randomEmail,
    password: '123@Strong',
    username: 'test email',
    gender: 'Female',
  };

  test('should successfully signup a user', async () => {
    await act(async () => {
      store.dispatch(signupThunk(validUser));
      await new Promise((resolve) => setTimeout(resolve, 5000));
    });

    const { signup } = store.getState();
    expect(signup.isLoading).toBe(false);
    expect(signup.error).toBe(null);
    expect(signup.data.user.email).toEqual(validUser.email);
    expect(signup.data.user.username).toEqual(validUser.username);
    expect(signup.data.user.gender).toEqual(validUser.gender);
  });

  const invalidUser = {
    email: 'invalidemail',
    password: 'weakpassword',
    username: 'weakpassword',
    gender: 'Female',
  };

  test('should return error for invalid user data', async () => {
    await act(async () => {
      store.dispatch(signupThunk(invalidUser));
      await new Promise((resolve) => setTimeout(resolve, 5000));
    });

    const { signup } = store.getState();
    expect(signup.isLoading).toBe(false);
    expect(signup.error).toBe(null);
  });
});

// // eslint-disable-next-line import/no-extraneous-dependencies
// import configureStore from 'redux-mock-store';
// import { jest,it, expect, describe, beforeEach } from '@jest/globals';
// // eslint-disable-next-line import/no-extraneous-dependencies
// import thunk from 'redux-thunk';
// import axios from '../../src/redux/configs/axios';
// import { signupSlice } from '../../src/redux/features/slices/signup';
// import signupThunk from '../../src/redux/features/actions/signup';

// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);

// describe('signupSlice', () => {
//   let store;

//   beforeEach(() => {
//     store = mockStore({
//       signup: {
//         data: null,
//         isLoading: false,
//         error: null,
//         errorMessage: undefined,
//       },
//     });
//   });
//   jest.mock(axios, () => ({
//     post: jest.fn(),
//   }));

//   it('should handle successful sign up', async () => {
//     // Mock successful response from the server
//     const responseData = {
//       user: {
//         email: 'test@example.com',
//         username: 'test email',
//         gender: 'Female',
//       },
//       token: 'token123',
//     };
//     axios.post.mockRejectedValueOnce(new Error('Failed to sign up'));

//     // Dispatch the signupThunk action
//     await store.dispatch(
//       signupThunk({
//         email: 'test@example.com',
//         password: '123@Strong',
//         username: 'test email',
//         gender: 'Female',
//       })
//     );

//     // Check the expected state after the action is dispatched
//     expect(store.getActions()).toEqual([
//       { type: 'user/signup/pending' },
//       {
//         type: 'user/signup/fulfilled',
//         payload: responseData,
//       },
//     ]);
//     expect(signupSlice.reducer(undefined, store.getActions()[1])).toEqual({
//       data: responseData,
//       isLoading: false,
//       error: null,
//       errorMessage: undefined,
//     });
//   });

//   it('should handle failed sign up', async () => {
//     // Mock failed response from the server
//     axios.post.mockRejectedValueOnce(new Error('Failed to sign up'));

//     // Dispatch the signupThunk action
//     await store.dispatch(
//       signupThunk({
//         email: 'test@example.com',
//         password: '123@Strong',
//         username: 'test email',
//         gender: 'Female',
//       })
//     );

//     // Check the expected state after the action is dispatched
//     expect(store.getActions()).toEqual([
//       { type: 'user/signup/pending' },
//       {
//         type: 'user/signup/rejected',
//         payload: expect.any(Error),
//         error: true,
//       },
//     ]);
//     expect(signupSlice.reducer(undefined, store.getActions()[1])).toEqual({
//       data: null,
//       isLoading: false,
//       error: expect.any(Error),
//       errorMessage: 'error occured',
//     });
//   });
// });
