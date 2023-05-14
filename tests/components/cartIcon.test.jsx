import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from '@jest/globals';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CartIcon from '../../src/components/cartIcon';

import { store } from '../../src/redux/store';

describe('CartIcon', () => {
  const product = {
    id: 'e0f5d2a9-7bd2-4446-9c46-5453cf7d4080',
    name: 'Refined Steel Sausages',
    price: 529,
    quantity: 10,
  };

  it('displays the cart icon', () => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <CartIcon />
        </BrowserRouter>
      </Provider>
    );
    const cartIcon = screen.getByTestId('cart-plus');
    expect(cartIcon).toBeInTheDocument();
  });

  it('opens the dialog when the cart icon is clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <CartIcon />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByTestId('cart-plus'));
  });

  it('displays the product name in the dialog', () => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <CartIcon />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByTestId('cart-plus'));

    const productName = screen.getByTestId('name');
    expect(productName).toBeInTheDocument();
  });

  it('closes the dialog when the cancel button is clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <CartIcon />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByTestId('cart-plus'));

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    const dialog = screen.getByTestId('dialog');
    expect(dialog).toBeInTheDocument();
  });
  it('opens the dialog when the cart icon is clicked', async () => {
    render(
      <BrowserRouter>
        <CartIcon product={product} />
      </BrowserRouter>
    );

    waitFor(() => {
      const dialog = screen.getByTestId('dialog');
      expect(dialog).toBeInTheDocument();

      setTimeout(() => {
        dialog.current.showModal();
        expect(dialog).toHaveClass('show');
      }, 5000);
    });
  });
});
