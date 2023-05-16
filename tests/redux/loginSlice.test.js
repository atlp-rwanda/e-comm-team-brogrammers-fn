import { expect, it, describe } from '@jest/globals';
import {
  initialState,
  loginSlice,
} from '../../src/redux/features/slices/login';
import LoginThunk from '../../src/redux/features/actions/login';
import LogoutThunk from '../../src/redux/features/actions/logout';

describe('loginSlice', () => {
  it('should set loading to true when LoginThunk.pending is dispatched', () => {
    const state = loginSlice.reducer(initialState, LoginThunk.pending());
    expect(state.loading).toBe(true);
  });

  it('should set error to true and errorMessage to Network Error when LoginThunk.rejected is dispatched with network error', () => {
    const state = loginSlice.reducer(
      initialState,
      LoginThunk.rejected({ error: { message: 'network error' } })
    );
    expect(state.error).toBe(true);
    expect(state.errorMessage).toBe('Network Error');
  });

  it('should set token when LoginThunk.fulfilled is dispatched with token', () => {
    const state = loginSlice.reducer(
      initialState,
      LoginThunk.fulfilled({ token: 'token' })
    );
    expect(state.token).toBe('token');
  });

  it('should set mfa to true when LoginThunk.fulfilled is dispatched with message containing check your email', () => {
    const state = loginSlice.reducer(
      initialState,
      LoginThunk.fulfilled({ message: 'check your email' })
    );
    expect(state.mfa).toBe(true);
  });

  it('should set token to null when LogoutThunk.fulfilled is dispatched with status 200', () => {
    const state = loginSlice.reducer(
      initialState,
      LogoutThunk.fulfilled({ status: 200 })
    );
    expect(state.token).toBe(null);
  });
});
