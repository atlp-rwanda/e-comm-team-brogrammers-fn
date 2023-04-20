/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import booleanReducer from './features/slices/sample';
// eslint-disable-next-line import/no-named-as-default
import loginReducer from './features/slices/login';
import userReducer from './features/slices/user';
import logoutReducer from './features/slices/logout';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    user: userReducer,
    boolean: booleanReducer,
    login: loginReducer,
    logout: logoutReducer,
  },
});
