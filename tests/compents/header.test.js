/* eslint-disable react/jsx-filename-extension */
// _ eslint-disable import/no-extraneous-dependencies _/
// _ eslint-disable react/jsx-filename-extension _/
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, describe, beforeEach } from '@jest/globals';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import Header from '../../src/components/header';
import { store } from '../../src/redux/store';
import LoginThunk from '../../src/redux/features/actions/login';
import UserThunk from '../../src/redux/features/actions/user';

const testUser = {
  email: 'jean@gmail.com',
  password: '123@Pass',
};

describe('testing header component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('render header', () => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Header />
        </BrowserRouter>
      </Provider>
    );
  });

  test('after login', async () => {
    await act(async () => {
      await store.dispatch(LoginThunk(testUser));
      await store.dispatch(UserThunk());
    });

    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const profile = screen.getByTestId('profile');
    expect(profile).not.toBeNull();
    expect(profile).toBeInTheDocument();

    const brand = screen.getByTestId('brand');
    expect(brand).not.toBeNull();
    expect(brand).toBeInTheDocument();
    fireEvent.click(brand);
    expect(window.location.pathname).toBe('/');
  });
});

describe('testing logout', () => {
  beforeEach(async () => {
    await act(async () => {
      await store.dispatch(LoginThunk(testUser));
      await store.dispatch(UserThunk());
    });

    render(
      <Provider store={store}>
        <BrowserRouter basename="/" a>
          <Header />
        </BrowserRouter>
      </Provider>
    );
  });

  test('logout text', async () => {
    const logout = screen.getByTestId('logout');
    expect(logout).not.toBeNull();
    expect(logout).toBeInTheDocument();
  });

  test('logout popup', async () => {
    const logout = screen.getByTestId('logout');
    fireEvent.click(logout);

    const signout = screen.getByText('Sign out');
    expect(signout).not.toBeNull();
    expect(signout).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(signout);
      await new Promise((resolve) => {
        setTimeout(resolve, 5000);
      });
    });

    const {
      user: { user },
      login: { token },
      logout: { logout: isLogout },
    } = store.getState();
    expect(isLogout).toBe(true);
    expect(user).toBeNull();
    expect(token).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();

    const Continue = screen.getByText('Continue');
    expect(Continue).not.toBeNull();
    expect(Continue).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(Continue);
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    });

    expect(window.location.pathname).toEqual('/');
  });
});
