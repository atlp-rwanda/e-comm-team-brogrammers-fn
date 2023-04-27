/* eslint-disable react/jsx-filename-extension */
// _ eslint-disable import/no-extraneous-dependencies _/
// _ eslint-disable react/jsx-filename-extension _/
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { test, expect, jest } from '@jest/globals';
import NotFound from '../src/Views/404';
import '@testing-library/jest-dom';
import SearchBox from '../src/components/search';

test('renders search input field', () => {
  render(<SearchBox />);
  const inputElement = screen.getByPlaceholderText(/search/i);
  expect(inputElement).toBeInTheDocument();
});

test('renders search button', () => {
  render(<SearchBox />);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
});

test('prevents default behavior when submitted', () => {
  const mockSearch = jest.fn();
  const { getByRole } = render(<SearchBox onSearch={mockSearch} />);
  const buttonElement = getByRole('button');
  buttonElement.click();
  expect(mockSearch).toHaveBeenCalled();
});

test('renders 404 header and message', () => {
  render(
    <BrowserRouter basename="/">
      <NotFound />
    </BrowserRouter>
  );
  const headerElement = screen.getByText(/404/i);
  const messageElement = screen.getByText(/page not found/i);
  const searchBoxElement = screen.getByRole('textbox');
  expect(searchBoxElement).toBeInTheDocument();
  expect(headerElement).toBeInTheDocument();
  expect(messageElement).toBeInTheDocument();
});
