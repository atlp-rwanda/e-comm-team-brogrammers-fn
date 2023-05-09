import React from 'react';
import { describe, test } from '@jest/globals';
import { render } from '@testing-library/react';
import ProductItem from '../../src/components/ProductItem';

const product = {
  id: 'e0f5d2a9-7bd2-4446-9c46-5453cf7d4080',
  images: [
    'https://loremflickr.com/640/480',
    'https://loremflickr.com/640/480',
    'https://loremflickr.com/640/480',
    'https://loremflickr.com/640/480',
  ],
  name: 'Refined Steel Sausages',
  description:
    'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
  quantity: 96215,
  exp_date: '2025-02-17T21:01:57.872Z',
  available: true,
  price: 529,
  category: 1,
  createdAt: '2023-05-02T16:36:09.618Z',
  updatedAt: '2023-05-02T16:36:09.618Z',
  seller: {
    username: 'John Doe',
    email: 'john@gmail.com',
  },
};
describe('testing rendering product', () => {
  test('rendering product Item', () => {
    render(<ProductItem product={product} />);
  });
});
