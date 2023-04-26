/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';
import booleanReducer from './features/slices/sample';
// eslint-disable-next-line import/no-named-as-default
import loginReducer from './features/slices/login';
import userReducer from './features/slices/user';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import signupReducer from './features/slices/signup';
import logoutReducer from './features/slices/logout';
import productSlice from './features/slices/product';
import passwordReducer from './features/slices/password';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    user: userReducer,
    boolean: booleanReducer,
    login: loginReducer,
    signup: signupReducer,
    logout: logoutReducer,
    products: productSlice.reducer,
    password: passwordReducer,
  },
});
