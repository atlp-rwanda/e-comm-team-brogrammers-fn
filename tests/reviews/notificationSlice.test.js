import { describe, it, expect } from '@jest/globals';
import notificationSlice from '../../src/redux/features/slices/notifications';
import fetchNotifications from '../../src/redux/features/actions/notifications';

describe('notificationSlice', () => {
  it('should handle initial state', () => {
    const initialState = {
      notifications: {
        results: [],
        totalPages: undefined,
      },
      status: 'idle',
      error: null,
      message: undefined,
    };

    const nextState = notificationSlice(undefined, {});
    expect(nextState).toEqual(initialState);
  });

  it('should handle fetchNotifications.pending', () => {
    const initialState = {
      notifications: {
        results: [],
        totalPages: undefined,
      },
      status: 'idle',
      error: null,
      message: undefined,
    };
    const nextState = notificationSlice(
      initialState,
      fetchNotifications.pending()
    );
    expect(nextState.status).toBe('loading');
    expect(nextState.error).toBe(null);
  });

  it('should handle fetchNotifications.fulfilled', () => {
    const initialState = {
      notifications: {
        results: [],
        totalPages: undefined,
      },
      status: 'idle',
      error: null,
      message: undefined,
    };
    const payload = {
      id: '3c7b7c8c-f583-46e5-bb52-d41e2b0bb482',
      isRead: false,
      receiverId: '5f33c697-283c-4763-b462-56f6ea619aa1',
      message: 'your product has been reviewed',
      type: 'product review',
      createdAt: '2023-05-25T22:17:49.004Z',
      updatedAt: '2023-05-25T22:17:49.004Z',
      receiver: {
        username: 'Jean Doe',
        email: 'jean@gmail.com',
      },
    };

    const nextState = notificationSlice(
      initialState,
      fetchNotifications.fulfilled(payload)
    );
    expect(nextState.status).toBe('succeeded');
    expect(nextState.notifications.results).toEqual(payload.allNotifications);
    expect(nextState.error).toBe(null);
  });

  it('should handle fetchNotifications.rejected', () => {
    const initialState = {
      notifications: {
        results: [],
        totalPages: undefined,
      },
      status: 'idle',
      error: null,
      message: undefined,
    };
    const payload = {
      error: {
        message: 'Request failed',
      },
    };
    const nextState = notificationSlice(
      initialState,
      fetchNotifications.rejected(payload)
    );
    expect(nextState.status).toBe('failed');
  });
});
