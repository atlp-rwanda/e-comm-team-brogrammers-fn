/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { describe, test, expect, afterEach } from '@jest/globals';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';
import { store } from '../../src/redux/store';
import ReviewDialog from '../../src/components/reviewDialog';
import axios from '../../src/redux/configs/axios';

const mock = new MockAdapter(axios);
describe('ReviewDialog', () => {
  afterEach(() => {
    mock.reset();
  });
  test('renders review dialog button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ReviewDialog
            product={{ id: 1, name: 'Product', price: 10, quantity: 5 }}
          />
        </MemoryRouter>
      </Provider>
    );
    const reviewButton = screen.getByText('Submit Review');
    expect(reviewButton).toBeInTheDocument();
  });
  test('opens review dialog on button click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ReviewDialog
            product={{ id: 1, name: 'Product', price: 10, quantity: 5 }}
          />
        </MemoryRouter>
      </Provider>
    );
    const reviewButton = screen.getByText('Submit Review');
    fireEvent.click(reviewButton);
    const dialog = screen.getByTestId('dialog');
    expect(dialog).toBeInTheDocument();
  });
  test('updates feedback state on input change', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ReviewDialog
            product={{ id: 1, name: 'Product', price: 10, quantity: 5 }}
          />
        </MemoryRouter>
      </Provider>
    );
    const reviewButton = screen.getByText('Submit Review');
    fireEvent.click(reviewButton);
    const feedbackInput = screen.getByPlaceholderText(
      'How do you feel about this product'
    );
    fireEvent.change(feedbackInput, { target: { value: 'Great product!' } });
    expect(feedbackInput.value).toBe('Great product!');
  });
  test('calls submit function on form submission', async () => {
    mock.onPost('').reply(200, { message: 'Review submitted successfully' });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ReviewDialog
            product={{ id: 1, name: 'Product', price: 10, quantity: 5 }}
          />
        </MemoryRouter>
      </Provider>
    );
    const reviewButton = screen.getByText('Submit Review');
    act(() => {
      fireEvent.click(reviewButton);
    });
    const feedbackInput = screen.getByPlaceholderText(
      'How do you feel about this product'
    );
    const ratingSelect = screen.getByText('Review Rate:');
    const confirmButton = screen.getByText('Confirm');
    fireEvent.change(feedbackInput, { target: { value: 'Great product!' } });
    fireEvent.change(ratingSelect, { target: { value: '5' } });
    act(() => {
      fireEvent.click(confirmButton);
    });
  });
});
