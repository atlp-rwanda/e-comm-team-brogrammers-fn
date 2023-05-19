import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from '@jest/globals';
import EmptyCart from '../../src/components/EmptyCart';

describe('EmptyCart', () => {
  test('renders empty cart message', () => {
    render(
      <MemoryRouter>
        <EmptyCart />
      </MemoryRouter>
    );

    const emptyCartMessage = screen.getByText('Your Cart is Currently Empty');
    expect(emptyCartMessage).toBeInTheDocument();
  });

  test('renders return to shop button', () => {
    render(
      <MemoryRouter>
        <EmptyCart />
      </MemoryRouter>
    );

    const returnToShopButton = screen.getByRole('link', {
      name: 'Return To Shop',
    });
    expect(returnToShopButton).toBeInTheDocument();
    expect(returnToShopButton.getAttribute('href')).toBe('/products');
  });
});
