import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from '@jest/globals';
import EmptyWishlist from '../../src/components/emptyWishlist';

describe('EmptyWishlist', () => {
  test('renders empty wishlist message', () => {
    render(
      <MemoryRouter>
        <EmptyWishlist />
      </MemoryRouter>
    );

    const emptyWishlistMessage = screen.getByText('Your Wishlist is Empty');
    expect(emptyWishlistMessage).toBeInTheDocument();
  });

  test('renders add products message', () => {
    render(
      <MemoryRouter>
        <EmptyWishlist />
      </MemoryRouter>
    );

    const addProductsMessage = screen.getByText(
      'Add some products to your wishlist to keep track of your favorites.'
    );
    expect(addProductsMessage).toBeInTheDocument();
  });

  test('renders create new wish button', () => {
    render(
      <MemoryRouter>
        <EmptyWishlist />
      </MemoryRouter>
    );

    const createNewWishButton = screen.getByRole('link', {
      name: 'Create new wish',
    });
    expect(createNewWishButton).toBeInTheDocument();
    expect(createNewWishButton.getAttribute('href')).toBe('/products');
  });

  test('renders close circle icon', () => {
    render(
      <MemoryRouter>
        <EmptyWishlist />
      </MemoryRouter>
    );

    const closeCircleIcon = screen.getByTestId('empty-wishlist-icon');
    expect(closeCircleIcon).toBeInTheDocument();
    expect(closeCircleIcon.tagName.toLowerCase()).toBe('i');
    expect(closeCircleIcon.querySelector('path')).toBeInTheDocument();
  });
});
