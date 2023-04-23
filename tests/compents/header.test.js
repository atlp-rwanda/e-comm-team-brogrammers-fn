/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
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

describe('testing header component', () => {
  const testUser = {
    email: 'jean@gmail.com',
    password: '123@Pass',
  };

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
