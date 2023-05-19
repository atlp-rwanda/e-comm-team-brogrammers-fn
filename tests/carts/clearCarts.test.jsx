import { describe, it, expect } from '@jest/globals';
import clearCart from '../../src/redux/features/slices/clearCart';
import ClearCartThunk from '../../src/redux/features/actions/clearCart';

describe('clearCart reducer', () => {
  const initialState = {
    data: null,
    error: false,
    message: undefined,
    isLoading: false,
  };

  it('should handle initial state', () => {
    expect(clearCart(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle clearCartThunk.pending', () => {
    const nextState = clearCart(initialState, ClearCartThunk.pending());
    expect(nextState).toEqual({
      data: null,
      error: false,
      message: undefined,
      isLoading: true,
    });
  });

  it('should handle clearCartThunk.fulfilled', () => {
    const payload = { value: { message: 'Cart cleared successfully' } };
    const nextState = clearCart(
      initialState,
      ClearCartThunk.fulfilled(payload)
    );
    expect(nextState).toEqual({
      data: null,
      error: false,
      message: payload.value.message,
      isLoading: false,
    });
  });

  it('should handle clearCartThunk.rejected', () => {
    const nextState = clearCart(initialState, ClearCartThunk.rejected());
    expect(nextState).toEqual({
      data: null,
      error: true,
      message: undefined,
      isLoading: false,
    });
  });
});
