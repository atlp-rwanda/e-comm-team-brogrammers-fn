import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { expect, it, describe, beforeEach } from '@jest/globals';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import NotificationPane, {
  Notification,
} from '../src/components/NotificationPane/NotificationPane';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('NotificationPane', () => {
  let store;
  beforeEach(() => {
    // dispatch = jest.fn();
    // useDispatch.mockImplementation(() => dispatch);

    store = mockStore({
      notifications: {
        notifications: {
          results: [
            {
              id: 1,
              type: 'Test Type',
              message: 'Test Message',
              isRead: false,
            },
          ],
        },
      },
    });
  });

  it('should open the notification pane when the icon is clicked', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <NotificationPane />
      </Provider>
    );
    expect(getByTestId('notification-pane')).toHaveStyle('display: none');
    fireEvent.click(getByTestId('note-icon'));
    expect(getByTestId('notification-pane')).toHaveStyle('display: flex');
  });

  it('should close the notification pane when the close button is clicked', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <NotificationPane />
      </Provider>
    );
    fireEvent.click(getByTestId('note-icon'));
    expect(getByTestId('notification-pane')).toHaveStyle('display: flex');
    fireEvent.click(getByTestId('note-pane-close'));
    expect(getByTestId('notification-pane')).toHaveStyle('display: none');
  });

  it('should mark all notifications as read when the "Mark all as read" button is clicked', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <NotificationPane />
      </Provider>
    );
    fireEvent.click(getByTestId('note-icon'));
    fireEvent.click(getByTestId('mark-all-as-read'));
    expect(getByTestId('notification-pane')).toHaveStyle('display: flex');
  });

  it('should render a mark as read button when note is not read', () => {
    const { getByTestId } = render(
      <Notification
        note={{
          id: 1,
          type: 'Test Type',
          message: 'Test Message',
          isRead: false,
        }}
      />
    );
    expect(getByTestId('note')).toBeInTheDocument();
    expect(getByTestId('note-read')).toBeInTheDocument();
  });
  it('should render a mark as unread button when note is read', () => {
    const { getByTestId } = render(
      <Notification
        note={{
          id: 1,
          type: 'Test Type',
          message: 'Test Message',
          isRead: true,
        }}
      />
    );
    expect(getByTestId('note')).toBeInTheDocument();
    expect(getByTestId('note-unread')).toBeInTheDocument();
  });
});
