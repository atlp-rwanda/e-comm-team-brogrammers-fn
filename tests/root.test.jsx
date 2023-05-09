import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { test, expect } from '@jest/globals';
import { Provider } from 'react-redux';
import NotFound from '../src/Views/404';
import '@testing-library/jest-dom';
import { store } from '../src/redux/store';

test('renders 404 header and message', () => {
  render(
    <Provider store={store}>
      <BrowserRouter basename="/">
        <NotFound />
      </BrowserRouter>
    </Provider>
  );
  const headerElement = screen.getByText(/404/i);
  const messageElement = screen.getByText(/page not found/i);
  const searchBoxElement = screen.getByRole('textbox');
  expect(searchBoxElement).toBeInTheDocument();
  expect(headerElement).toBeInTheDocument();
  expect(messageElement).toBeInTheDocument();
});
