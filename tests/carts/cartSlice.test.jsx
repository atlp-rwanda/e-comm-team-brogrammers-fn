import { describe, it, expect } from '@jest/globals';
import CartThunk from '../../src/redux/features/actions/cart';
import cart from '../../src/redux/features/slices/cart';
import AddCartThunk from '../../src/redux/features/actions/addCart';
import RemoveCartThunk from '../../src/redux/features/actions/removeCart';
import ClearCartThunk from '../../src/redux/features/actions/clearCart';

describe('cartSlice reducer', () => {
  const initialState = {
    cart: null,
    error: null,
    isLoading: false,
    product: null,
    status: null,
    total: null,
  };

  it('should handle initial state', () => {
    expect(cart(undefined, {})).toEqual(initialState);
  });

  it('should handle CartThunk.pending', () => {
    const nextState = cart(initialState, CartThunk.pending());
    expect(nextState.isLoading).toBe(true);
  });

  it('should handle CartThunk.fulfilled with error', () => {
    const payload = {
      error: true,
      response: {
        data: {
          message: 'Error message',
        },
      },
    };

    const nextState = cart(initialState, CartThunk.fulfilled(payload));
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe(
      payload?.error?.response?.data?.message || 'error'
    );
    expect(nextState.cart).toBe(null);
    expect(nextState.status).toBe(null);
    expect(nextState.product).toBe(null);
    expect(nextState.total).toBe(null);
  });

  it('should handle CartThunk.fulfilled without error', () => {
    const payload = {
      value: {
        data: {
          products: ['product1', 'product2'],
          total: 100,
        },
      },
    };

    const nextState = cart(initialState, CartThunk.fulfilled(payload));
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe(null);
    expect(nextState.status).toBe(payload.value.data.products.length);
    expect(nextState.product).toBe(payload.value.data.products);
    expect(nextState.total).toBe(payload.value.data.total);
  });

  it('should handle AddCartThunk.fulfilled', () => {
    const payload = {
      value: {
        data: {
          products: ['product1', 'product2'],
          total: 100,
        },
      },
    };

    const nextState = cart(initialState, AddCartThunk.fulfilled(payload));
    expect(nextState.status).toBe(payload.value.data.products.length);
    expect(nextState.product).toBe(payload.value.data.products);
    expect(nextState.total).toBe(payload.value.data.total);
  });

  it('should handle ClearCartThunk.fulfilled', () => {
    const nextState = cart(initialState, ClearCartThunk.fulfilled());
    expect(nextState.product).toEqual([]);
    expect(nextState.status).toBe(0);
    expect(nextState.total).toBe(0);
  });

  it('should handle RemoveCartThunk.fulfilled', () => {
    const payload = {
      id: 1,
      total: 90,
    };

    const prevState = {
      ...initialState,
      product: [
        { id: 1, name: 'product1' },
        { id: 2, name: 'product2' },
      ],
      status: 2,
      total: 100,
    };

    const nextState = cart(prevState, RemoveCartThunk.fulfilled(payload));
    expect(nextState.total).toBe(payload.total);
    expect(nextState.product).toEqual([{ id: 2, name: 'product2' }]);
    expect(nextState.status).toBe(prevState.status - 1);
  });

  it('should handle CartThunk.rejected', () => {
    const payload = {
      status: 404,
    };
    const nextState = cart(initialState, CartThunk.rejected(payload));
    expect(nextState.isLoading).toBe(false);
  });
});
