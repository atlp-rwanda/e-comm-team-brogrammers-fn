import { jest, expect, describe, it } from '@jest/globals';
import { toast } from 'react-toastify';
import { showErrorMessage, showSuccessMessage } from '../src/utils/toast';

describe('showErrorMessage', () => {
  it('should call toast.error with the correct message and options', () => {
    const message = 'An error occurred';
    const options = {
      position: 'top-right',
      pauseOnHover: true,
    };
    const errorSpy = jest.spyOn(toast, 'error');
    showErrorMessage(message);
    expect(errorSpy).toHaveBeenCalledWith(message, options);
    errorSpy.mockRestore();
  });
});

describe('showSuccessMessage', () => {
  it('should call toast.success with the correct message and options', () => {
    const message = 'Success!';
    const options = {
      position: 'top-right',
      pauseOnHover: true,
    };
    const successSpy = jest.spyOn(toast, 'success');
    showSuccessMessage(message);
    expect(successSpy).toHaveBeenCalledWith(message, options);
    successSpy.mockRestore();
  });
});
