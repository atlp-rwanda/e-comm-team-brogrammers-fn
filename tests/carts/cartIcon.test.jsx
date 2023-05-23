import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { describe, test, expect, afterEach } from '@jest/globals';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';
import { store } from '../../src/redux/store';
import CartIcon from '../../src/components/cartIcon';
import axios from '../../src/redux/configs/axios';

const mock = new MockAdapter(axios);

describe('CartIcon', () => {
  afterEach(() => {
    mock.reset();
  });

  test('renders cart icon button', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartIcon
            product={{ id: 1, name: 'Product', price: 10, quantity: 5 }}
          />
        </MemoryRouter>
      </Provider>
    );

    const cartButton = screen.getByTestId('cart-button');
    expect(cartButton).toBeInTheDocument();
  });

  test('opens add to cart dialog on button click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartIcon
            product={{ id: 1, name: 'Product', price: 10, quantity: 5 }}
          />
        </MemoryRouter>
      </Provider>
    );

    const cartButton = screen.getByTestId('cart-button');
    fireEvent.click(cartButton);

    const addCartDialog = screen.getByTestId('add-cart-dialog');
    expect(addCartDialog).toBeInTheDocument();
  });

  test('updates quantity state on input change', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartIcon
            product={{ id: 1, name: 'Product', price: 10, quantity: 5 }}
          />
        </MemoryRouter>
      </Provider>
    );

    const cartButton = screen.getByTestId('cart-button');
    fireEvent.click(cartButton);
    const quantityInput = screen.getByPlaceholderText('Quantity');
    fireEvent.change(quantityInput, { target: { value: '2' } });

    expect(quantityInput.value).toBe('2');
  });

  test('calls addToCartHandler on form submission', async () => {
    mock
      .onPost()
      .reply(200, { value: { message: 'added to cart successfully' } });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartIcon
            product={{ id: 1, name: 'Product', price: 10, quantity: 5 }}
          />
        </MemoryRouter>
      </Provider>
    );

    const cartButton = screen.getByTestId('cart-button');
    const confirmButton = screen.getByTestId('confirm-button');
    act(() => {
      fireEvent.click(cartButton);
      fireEvent.click(confirmButton);
    });
  });
});
