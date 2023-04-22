/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import ProductList from '../src/components/productList';

const products = [
  {
    id: 1,
    name: 'Product 1',
    image: 'https://dummyimage.com/400x400/000/fff',
    price: 10.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    quantity: 10,
  },
  {
    id: 2,
    name: 'Product 2',
    image: 'https://dummyimage.com/400x400/000/fff',
    price: 19.99,
    description:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    quantity: 5,
  },
  {
    id: 3,
    name: 'Product 3',
    image: 'https://dummyimage.com/400x400/000/fff',
    price: 7.99,
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    quantity: 20,
  },
  {
    id: 4,
    name: 'Product 4',
    image: 'https://dummyimage.com/400x400/000/fff',
    price: 5.99,
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    quantity: 15,
  },
];

// eslint-disable-next-line no-undef
describe('ProductList', () => {
  test('renders product cards', () => {
    const { getByTestId } = render(<ProductList products={products} />);
    const productCards = getByTestId('product-cards');
    expect(productCards.children.length).toBe(4);
  });

  test('renders product info correctly', () => {
    const { getByTestId } = render(<ProductList products={products} />);
    const productName = getByTestId('product-name-1');
    expect(productName.textContent).toBe('Product 1');

    const productPrice = getByTestId('product-price-1');
    expect(productPrice.textContent).toBe('$10.99');

    const productDescription = getByTestId('product-description-1');
    expect(productDescription.textContent).toBe(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    );
  });

  test('adds product to cart on click', () => {
    const handleAddToCart = jest.fn();
    const { getByTestId } = render(
      <ProductList products={products} onAddToCart={handleAddToCart} />
    );
    const addToCartButton = getByTestId('add-to-cart-1');
    addToCartButton.click();
    expect(handleAddToCart).toHaveBeenCalledWith(products[0]);
  });
});
