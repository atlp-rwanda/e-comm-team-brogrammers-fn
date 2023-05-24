import { expect, describe, it } from '@jest/globals';
import clearWishlistSlice, {
  clearWishList,
} from '../../src/redux/features/slices/clearwishlist';
import ClearWishlistThunk from '../../src/redux/features/actions/clearwishlist';

describe('clearWishlistSlice', () => {
  const initialState = {
    data: null,
    status: 'idle',
    error: null,
    message: undefined,
  };
  it('should handle the pending state correctly', () => {
    const nextState = clearWishlistSlice.reducer(
      initialState,
      ClearWishlistThunk.pending()
    );
    expect(nextState.status).toBe('loading');
    expect(nextState.error).toBeNull();
  });
  it('should handle the fulfilled state correctly', () => {
    const payload = { message: 'Wishlist cleared successfully' };
    const nextState = clearWishlistSlice.reducer(
      initialState,
      ClearWishlistThunk.fulfilled(payload)
    );
    expect(nextState.status).toBe('succeeded');
    expect(nextState.error).toBeNull();
    expect(nextState.message).toBe(payload);
    expect(nextState.data).toBe(payload);
  });
  it('should handle the rejected state correctly', () => {
    const error = { message: 'Failed to clear wishlist' };
    const nextState = clearWishlistSlice.reducer(
      initialState,
      ClearWishlistThunk.rejected(error)
    );
    expect(nextState.status).toBe('failed');
    expect(nextState.error).toBe(error.payload);
  });
  it('should return the correct clear wishlist state', () => {
    const state = { clearwishlist: initialState };
    const clearWishlistState = clearWishList(state);
    expect(clearWishlistState).toBe(initialState);
  });
});
