import { describe, it, expect } from '@jest/globals';
import removeToCart from '../../src/redux/features/slices/removeToCart';
import RemoveCartThunk from '../../src/redux/features/actions/removeCart';

describe('removeToCartSlice reducer', () => {
  it('should handle initial state', () => {
    const initialState = {
      data: null,
      error: false,
      message: undefined,
      isLoading: false,
    };

    expect(removeToCart(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle RemoveCartThunk.pending', () => {
    const initialState = {
      data: null,
      error: false,
      message: undefined,
      isLoading: false,
    };

    const nextState = removeToCart(initialState, RemoveCartThunk.pending());
    const expectedState = {
      data: null,
      error: false,
      message: undefined,
      isLoading: true,
    };

    expect(nextState).toEqual(expectedState);
  });

  it('should handle RemoveCartThunk.fulfilled', () => {
    const initialState = {
      data: null,
      error: null,
      message: undefined,
      isLoading: true,
    };

    const payload = { message: 'Cart item removed successfully' };
    const nextState = removeToCart(
      initialState,
      RemoveCartThunk.fulfilled(payload)
    );
    const expectedState = {
      data: null,
      error: false,
      message: payload.message,
      isLoading: false,
    };

    expect(nextState).toEqual(expectedState);
  });

  it('should handle RemoveCartThunk.rejected', () => {
    const initialState = {
      data: null,
      error: null,
      message: undefined,
      isLoading: true,
    };

    const payload = { error: { message: 'Failed to remove cart item' } };
    const nextState = removeToCart(
      initialState,
      RemoveCartThunk.rejected(payload)
    );
    const expectedState = {
      data: null,
      error: true,
      message: undefined,
      isLoading: false,
    };

    expect(nextState).toEqual(expectedState);
  });
});
