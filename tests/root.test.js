/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { test, expect, jest } from '@jest/globals';
import NotFound from '../src/pages/404';
import '@testing-library/jest-dom';
import Home from '../src/Views/Home';
import Login from '../src/Views/Login';
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

test('renders the home page', () => {
  render(<Home />);
  const headingElement = screen.getByText(/homepage/i);
  expect(headingElement).toBeInTheDocument();
});
test('renders the login page', () => {
  render(<Login />);
  const headingElement = screen.getByText(/login page/i);
  expect(headingElement).toBeInTheDocument();
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
