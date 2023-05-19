import { it, describe, expect } from '@jest/globals';
import addToCartReducer from '../../src/redux/features/slices/addToCartReducer';
import AddCartThunk from '../../src/redux/features/actions/addCart';

describe('addToCartSlice reducer', () => {
  const initialState = {
    data: null,
    error: null,
    message: undefined,
    isLoading: false,
  };

  it('should handle initial state', () => {
    expect(addToCartReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle AddCartThunk.pending', () => {
    const nextState = addToCartReducer(initialState, AddCartThunk.pending());
    expect(nextState).toEqual({
      ...initialState,
      isLoading: true,
      error: null,
      data: null,
    });
  });

  it('should handle AddCartThunk.fulfilled', () => {
    const payload = {
      value: {
        data: 'Some data',
        message: 'Success',
      },
    };

    const nextState = addToCartReducer(
      initialState,
      AddCartThunk.fulfilled(payload)
    );
    expect(nextState).toEqual({
      ...initialState,
      isLoading: false,
      data: payload.value.data,
      message: payload.value.message,
      error: null,
    });
  });

  it('should handle AddCartThunk.rejected', () => {
    const payload = 'Error message';

    const nextState = addToCartReducer(
      initialState,
      AddCartThunk.rejected(payload)
    );
    expect(nextState).toEqual({
      ...initialState,
      isLoading: false,
      error: undefined,
      data: null,
    });
  });
});
