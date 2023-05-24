import { expect, describe, it } from '@jest/globals';
import addWishlistslice from '../../src/redux/features/slices/addWishlistslice';
import AddWishlistThunk from '../../src/redux/features/actions/addWishlist';

describe('addToWishlistSlice', () => {
  const initialState = {
    data: null,
    error: null,
    message: undefined,
    isLoading: false,
  };
  it('should handle the pending state correctly', () => {
    const nextState = addWishlistslice(
      initialState,
      AddWishlistThunk.pending()
    );
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBe(null);
    expect(nextState.data).toBe(null);
  });
  it('should handle the fulfilled state correctly', () => {
    const payload = { data: { id: 1, name: 'Product 1' } };
    const nextState = addWishlistslice(
      initialState,
      AddWishlistThunk.fulfilled(payload)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.data).toBe(payload.data);
    expect(nextState.error).toBe(null);
  });
  it('should handle the rejected state correctly', () => {
    const error = 'Something went wrong';
    const nextState = addWishlistslice(
      initialState,
      AddWishlistThunk.rejected(error)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.data).toBe(null);
  });
});
