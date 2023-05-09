/* eslint-disable react/jsx-filename-extension */
// eslint-disable-next-line import/no-extraneous-dependencies
import 'mock-local-storage';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { test, expect, describe, jest } from '@jest/globals';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import GoogleLogin from '../src/components/GoogleLoginButton';

describe('Google Login', () => {
  test('renders correctly', () => {
    render(
      <BrowserRouter basename="/">
        {' '}
        <GoogleLogin />
      </BrowserRouter>
    );
    const linkElement = screen.getByTestId('google-auth');
    expect(linkElement).toHaveProperty('href');
  });

  test('updates local storage and navigates to home page', () => {
    const token = '12345';
    const email = 'user@example.com';
    const navigateMock = jest.fn();

    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: jest.fn(),
      },
      writable: true,
    });

    render(<GoogleLogin />, { wrapper: MemoryRouter });

    act(() => {
      navigateMock(`/?key=${token}&email=${email}`);
    });
  });

  // test('renders with default query parameters', () => {
  // const email = 'user@example.com';
  // const key = '12345';
  // const params = `?key=${key}&email=${email}`;

  // render(
  // <BrowserRouter>
  // <Routes>
  // <Route
  // path="/"
  // element={<GoogleLogin />}
  // location={{
  //             pathname: '/',
  //             search: params,
  //           }}
  // />
  // </Routes>
  // </BrowserRouter>
  // );

  // expect(localStorage.getItem('token')).toBe(key);
  // expect(localStorage.getItem('userEmail')).toBe(email);
  // });
});
