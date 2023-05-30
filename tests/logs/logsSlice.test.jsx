import { expect, describe, it } from '@jest/globals';
import LogsThunk from '../../src/redux/features/actions/logs';
import logsReducer from '../../src/redux/features/slices/logsSlice';

describe('logsSlice', () => {
  const initialState = {
    results: [],
    status: 'idle',
    error: null,
  };

  it('should handle the pending state correctly for LogsThunk', () => {
    const nextState = logsReducer(initialState, {
      type: LogsThunk.pending.type,
    });

    expect(nextState.status).toBe('loading');
  });

  it('should handle the fulfilled state correctly for LogsThunk', () => {
    const payload = [
      {
        id: 1,
        createdAt: '2023-05-01T10:30:00.000Z',
        user: {
          username: 'JohnDoe',
          email: 'johndoe@example.com',
          role: 'admin',
        },
        message: 'Logged in',
      },
    ];

    const nextState = logsReducer(initialState, {
      type: LogsThunk.fulfilled.type,
      payload,
    });

    expect(nextState.status).toBe('succeeded');
    expect(nextState.results).toEqual(payload);
  });

  it('should handle the rejected state correctly for LogsThunk', () => {
    const error = 'Something went wrong';

    const nextState = logsReducer(initialState, {
      type: LogsThunk.rejected.type,
      payload: error,
    });

    expect(nextState.status).toBe('failed');
    expect(nextState.error).toBe(error);
  });
});
