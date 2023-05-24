import { expect, describe, it } from '@jest/globals';
import deleteWishlistslice from '../../src/redux/features/slices/deleteWishlistslice';
import DeleteWishlitThunk from '../../src/redux/features/actions/deleteWishlist';

describe('DeleteToWishlistSlice', () => {
  const initialState = {
    data: null,
    error: false,
    message: undefined,
    isLoading: false,
  };
  it('should handle the pending state correctly', () => {
    const nextState = deleteWishlistslice(
      initialState,
      DeleteWishlitThunk.pending()
    );
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBe(false);
    expect(nextState.data).toBeNull();
  });
  it('should handle the fulfilled state correctly', () => {
    const payload = { message: 'Product removed from wishlist' };
    const nextState = deleteWishlistslice(
      initialState,
      DeleteWishlitThunk.fulfilled(payload)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.message).toBe(payload.message);
    expect(nextState.error).toBe(false);
  });
  it('should handle the rejected state correctly', () => {
    const nextState = deleteWishlistslice(
      initialState,
      DeleteWishlitThunk.rejected()
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe(true);
    expect(nextState.data).toBeNull();
  });
});
