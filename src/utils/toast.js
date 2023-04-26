/* eslint-disable import/no-extraneous-dependencies */
import { toast } from 'react-toastify';

export const showErrorMessage = (message) => {
  toast.error(message, {
    position: 'top-right',
    pauseOnHover: true,
  });
};

export const showSuccessMessage = (message) => {
  toast.success(message, {
    position: 'top-right',
    pauseOnHover: true,
  });
};
