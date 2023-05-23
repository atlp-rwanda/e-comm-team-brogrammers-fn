import React from 'react';
import { describe, expect, it, afterEach, beforeEach } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { store } from '../../src/redux/store';
import Cart from '../../src/Views/Cart';
import axios from '../../src/redux/configs/axios';
import CartThunk from '../../src/redux/features/actions/cart';

const mock = new MockAdapter(axios);
describe('Cart', () => {
  beforeEach(async () => {
    mock.onGet('/cart').reply(200, {
      value: {
        message: 'Hey Here is your cart!',
        data: {
          id: 'bfe7cf05-8aa9-440e-af3e-d3df6480e69e',
          userId: 'be5ac7a8-429a-4f91-9148-48e75ad2bde1',
          products: [
            {
              id: '4e7f3464-64a9-48cf-b66b-3587ef3dea77',
              name: 'shoes',
              image:
                'http://res.cloudinary.com/du0vsc2pt/image/upload/v1684419447/zhndkxi22qtzokdq9u8r.png',
              price: 90,
              Ptotal: 1530,
              quantity: 17,
            },
          ],
          total: 1530,
          createdAt: '2023-05-18T20:09:58.643Z',
          updatedAt: '2023-05-18T20:15:12.454Z',
        },
      },
    });
    store.dispatch(CartThunk());
  });
  afterEach(() => {
    mock.reset();
  });
  it('should display cart items', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const cartHeader = getByTestId('cart-header');
      expect(cartHeader).toBeInTheDocument();
    });
  });

  it('should call handleRemoveItem function on remove button click', async () => {
    mock.onDelete().reply(200, {
      id: '4e7f3464-64a9-48cf-b66b-3587ef3dea77',
      message: 'Item removed from cart successfully',
      total: 1400,
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const removeButton = getByTestId('remove-item');
      expect(removeButton).toBeInTheDocument();
      act(() => {
        fireEvent.click(removeButton);
      });
    });
  });

  it('should call RemoveAll function on remove all button click', async () => {
    mock.onDelete('/cart').reply(200, {
      value: {
        message: 'Cart cleared successfully',
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      expect(screen.getByTestId('remove-all')).toBeInTheDocument();
    });
    const addButton = screen.getByTestId('remove-all');
    act(() => {
      fireEvent.click(addButton);
    });
    await waitFor(() => {
      expect(store.getState().cart.product.length).toBe(0);
    });
  });
});
