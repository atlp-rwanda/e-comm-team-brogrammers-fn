/* eslint-disable no-undef */
import axios from 'axios';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import handleDelete from '../src/Views/admin/DeleteUser';

jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    info: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
    POSITION: {
      TOP_RIGHT: 'top-right',
    },
  },
}));
jest.mock('react-confirm-alert', () => ({
  confirmAlert: jest.fn(),
}));

describe('handleDelete', () => {
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(() => 'mockedToken'),
      clear: jest.fn(),
    };
    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
    });
  });

  it('should delete the user and show success message', async () => {
    // Mock confirmAlert to invoke the "Yes" button onClick callback
    const mockConfirmAlert = jest.fn(({ buttons }) => buttons[0].onClick());
    confirmAlert.mockImplementation(mockConfirmAlert);

    // Mock axios.delete to simulate successful deletion
    axios.delete.mockResolvedValueOnce();

    // Invoke the handleDelete function
    await handleDelete({ id: 'userId', username: 'JohnDoe' });

    // Assertions
    expect(localStorage.getItem).toHaveBeenCalledWith('token');
    expect(mockConfirmAlert).toHaveBeenCalledWith({
      title: 'Confirm deletion',
      message: 'Are you sure you want to delete JohnDoe?',
      buttons: [
        {
          label: 'Yes',
          onClick: expect.any(Function),
        },
        {
          label: 'No',
          onClick: expect.any(Function),
        },
      ],
    });
    expect(axios.delete).toHaveBeenCalledWith(
      `${process.env.REACT_APP_SERVER_URL}/users/userId`,
      {
        headers: {
          Authorization: 'Bearer mockedToken',
        },
      }
    );
    expect(toast.info).toHaveBeenCalledWith('Deleting user...', {
      position: 'top-right',
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      expect(toast.success).toHaveBeenCalled('User deleted successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      expect(window.location.reload).toHaveBeenCalled();
    }, 3000); // Adjust the timeout duration if needed
  });

  it('should handle an error while deleting the user', async () => {
    // Mock confirmAlert to invoke the "Yes" button onClick callback
    const mockConfirmAlert = jest.fn(({ buttons }) => buttons[0].onClick());
    confirmAlert.mockImplementation(mockConfirmAlert);

    // Mock axios.delete to simulate an error
    const mockError = new Error('Failed to delete user');
    axios.delete.mockRejectedValueOnce(mockError);

    // Invoke the handleDelete function
    await handleDelete({ id: 'userId', username: 'JohnDoe' });

    // Assertions
    expect(localStorage.getItem).toHaveBeenCalledWith('token');
    expect(mockConfirmAlert).toHaveBeenCalledWith({
      title: 'Confirm deletion',
      message: 'Are you sure you want to delete JohnDoe?',
      buttons: [
        {
          label: 'Yes',
          onClick: expect.any(Function),
        },
        {
          label: 'No',
          onClick: expect.any(Function),
        },
      ],
    });
    expect(axios.delete).toHaveBeenCalledWith(
      `${process.env.REACT_APP_SERVER_URL}/users/userId`,
      {
        headers: {
          Authorization: 'Bearer mockedToken',
        },
      }
    );
    expect(toast.info).toHaveBeenCalledWith('Deleting user...', {
      position: 'top-right',
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    expect(toast.error).toHaveBeenCalledWith('Error deleting user');
  });
});
