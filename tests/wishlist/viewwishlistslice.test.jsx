import { expect, describe, it } from '@jest/globals';
import viewWishlistSlice from '../../src/redux/features/slices/wishlistslice';
import ViewWishlistThunk from '../../src/redux/features/actions/wishlistaction';
import DeleteWishlistThunk from '../../src/redux/features/actions/deleteWishlist';
import AddWishlistThunk from '../../src/redux/features/actions/addWishlist';
import ClearWishlistThunk from '../../src/redux/features/actions/clearwishlist';

describe('viewWishlistSlice', () => {
  const initialState = {
    data: [],
    status: 'idle',
    isLoading: false,
    error: null,
  };
  it('should handle the pending state correctly for ViewWishlistThunk', () => {
    const nextState = viewWishlistSlice.reducer(initialState, {
      type: ViewWishlistThunk.pending.type,
    });
    expect(nextState.status).toBe('loading');
  });
  it('should handle the fulfilled state correctly for ViewWishlistThunk', () => {
    const payload = [{ id: 1, name: 'Product 1' }];
    const nextState = viewWishlistSlice.reducer(initialState, {
      type: ViewWishlistThunk.fulfilled.type,
      payload,
    });
    expect(nextState.status).toBe('succeeded');
    expect(nextState.isLoading).toBe(false);
    expect(nextState.data).toEqual(payload);
  });
  it('should handle the rejected state correctly for ViewWishlistThunk', () => {
    const error = 'Something went wrong';
    const nextState = viewWishlistSlice.reducer(initialState, {
      type: ViewWishlistThunk.rejected.type,
      error,
    });
    expect(nextState.status).toBe('failed');
    expect(nextState.isLoading).toBe(false);
  });
  it('should handle the fulfilled state correctly for DeleteWishlistThunk', () => {
    const payload = { id: 1, message: 'Item deleted' };
    const currentState = {
      ...initialState,
      data: [{ id: 1, name: 'Product 1' }],
    };
    const nextState = viewWishlistSlice.reducer(currentState, {
      type: DeleteWishlistThunk.fulfilled.type,
      payload,
    });
    expect(nextState.data).toEqual([]);
    expect(nextState.isLoading).toBe(false);
    expect(nextState.message).toBe(payload.message);
    expect(nextState.error).toBe(false);
  });
  it('should handle the fulfilled state correctly for AddWishlistThunk', () => {
    const payload = { id: 2, name: 'Product 2' };
    const nextState = viewWishlistSlice.reducer(initialState, {
      type: AddWishlistThunk.fulfilled.type,
      payload,
    });
    expect(nextState.isLoading).toBe(false);
    expect(nextState.data).toEqual(payload.data);
    expect(nextState.error).toBe(null);
  });
  it('should handle the fulfilled state correctly for ClearWishlistThunk', () => {
    const payload = 'Wishlist cleared';
    const nextState = viewWishlistSlice.reducer(initialState, {
      type: ClearWishlistThunk.fulfilled.type,
      payload,
    });
    expect(nextState.status).toBe('succeeded');
    expect(nextState.isLoading).toBe(false);
    expect(nextState.message).toBe(payload);
    expect(nextState.data).toEqual([]);
  });
});
