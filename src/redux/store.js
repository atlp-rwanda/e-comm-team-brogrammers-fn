/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import booleanReducer from './features/slices/sample';
import loginReducer from './features/slices/login';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    boolean: booleanReducer,
    login: loginReducer,
  },
});
