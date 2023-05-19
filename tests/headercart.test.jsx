import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { jest, describe, expect, test } from '@jest/globals';
import '@testing-library/jest-dom';
import HeaderCart from '../src/components/headercart';

jest.mock('react-redux');

describe('CartIcon', () => {
  test('renders without badge when cart is empty', () => {
    useSelector.mockReturnValue({ status: 0 });
    useDispatch.mockReturnValue(jest.fn());
    render(<HeaderCart />);
    expect(screen.queryByText(/^[0-9]+$/)).not.toBeInTheDocument();
  });

  test('renders with badge when cart is not empty', () => {
    useSelector.mockReturnValue({ status: 3 });
    useDispatch.mockReturnValue(jest.fn());
    render(<HeaderCart />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
