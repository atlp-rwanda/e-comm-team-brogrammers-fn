import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import { describe, it, expect } from '@jest/globals';
import HeaderCart from '../../src/components/headercart';

const mockStore = configureStore([thunk]);

describe('HeaderCart', () => {
  it('renders cart icon', async () => {
    const store = mockStore({
      cart: {
        status: 2,
      },
    });

    render(
      <Provider store={store}>
        <HeaderCart />
      </Provider>
    );

    const cartIcon = screen.getByTestId('cart-icon');
    const cartStatus = screen.getByTestId('cart-status');

    expect(cartIcon).toBeInTheDocument();
    expect(cartStatus).toBeInTheDocument();
    expect(cartStatus).toHaveTextContent('2');
  });

  it('renders empty cart status when status is null', async () => {
    const store = mockStore({
      cart: {
        status: null,
      },
    });

    render(
      <Provider store={store}>
        <HeaderCart />
      </Provider>
    );

    const cartIcon = screen.getByTestId('cart-icon');
    const cartStatus = screen.queryByTestId('cart-status');

    expect(cartIcon).toBeInTheDocument();
    expect(cartStatus).not.toBeInTheDocument();
  });
});
