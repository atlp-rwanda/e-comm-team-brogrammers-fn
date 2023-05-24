/* eslint-disable no-undef */
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import handleDisable from '../src/Views/admin/Disable';

jest.mock('axios');
jest.mock('react-toastify');
jest.mock('sweetalert2');

describe('handleDisable', () => {
  test('should update availability and set users correctly', async () => {
    // Mock the necessary dependencies
    const mockSwalFire = jest.spyOn(Swal, 'fire');
    const mockAxiosPatch = jest
      .spyOn(axios, 'patch')
      .mockResolvedValue({ data: { message: 'Success' } });
    const mockToastInfo = jest.spyOn(toast, 'info');
    const mockToastDismiss = jest.spyOn(toast, 'dismiss');
    const mockToastSuccess = jest.spyOn(toast, 'success');
    const mockSetUsers = jest.fn();

    // Call the function with necessary arguments
    await handleDisable({ id: 1, username: 'John' }, mockSetUsers);

    // Assert that Swal.fire was called with the correct arguments
    expect(mockSwalFire).toHaveBeenCalledWith({
      title: 'Confirm Update',
      showCancelButton: true,
      html: expect.any(String),
      focusConfirm: false,
      preConfirm: expect.any(Function),
      didOpen: expect.any(Function),
    });

    // Get the preConfirm function argument from the first call
    const preConfirmFn = mockSwalFire.mock.calls[0][0].preConfirm;

    // Prepare the necessary DOM elements for preConfirm function
    const dummyInput = document.createElement('input');
    dummyInput.value = 'Test Reason';
    document.getElementById = jest.fn().mockReturnValueOnce(dummyInput);

    // Call the preConfirm function and await its response
    await preConfirmFn();

    // Assert that axios.patch was called with the correct arguments
    expect(mockAxiosPatch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_SERVER_URL}/users/disable/1`,
      { reason: 'Test Reason' },
      {
        headers: {
          Authorization: expect.stringContaining('Bearer'),
        },
      }
    );

    // Resolve the promise from axios.patch and await the resulting actions
    await mockAxiosPatch.mock.results[0].value;

    // Assert that toast.info, toast.dismiss, and toast.success were called
    expect(mockToastInfo).toHaveBeenCalledWith('Updating availability ...', {});
    expect(mockToastDismiss).toHaveBeenCalled();
    expect(mockToastSuccess).toHaveBeenCalledWith('Success');

    // Assert that setUsers was called with the correct arguments
    expect(mockSetUsers).toHaveBeenCalledWith(expect.any(Function));
    const setUsersCallback = mockSetUsers.mock.calls[0][0];

    // Prepare the necessary data for setUsers callback
    const prevState = { data: [{ id: 1 }, { id: 2 }] };
    const updatedUsers = [{ id: 1, disabledUser: true }, { id: 2 }];
    const expectedUpdatedUsers = { data: updatedUsers };

    // Call the setUsers callback and assert its result
    expect(setUsersCallback(prevState)).toEqual(expectedUpdatedUsers);
  });
});
