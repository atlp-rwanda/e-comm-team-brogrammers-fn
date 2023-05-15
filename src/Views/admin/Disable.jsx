/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-alert */
import axios from 'axios';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

const handleDisable = (user) => {
  confirmAlert({
    title: 'Confirm Update',
    message: `Are you sure you want to Update ${user.username}?`,
    buttons: [
      {
        label: 'Yes',
        onClick: async () => {
          let updatingToastId;
          try {
            const token = localStorage.getItem('token');
            if (token) {
              // Prompt the user to enter a reason for updating the account
              const reason = window.prompt(
                'Please enter a reason for updating this user:'
              );
              if (!reason) {
                toast.error('You must provide a reason for updating the user');
                return;
              }

              // Show a toast message to indicate that the user is being updated
              updatingToastId = toast.info('Updating user...', {});

              const response = await axios.patch(
                `${process.env.REACT_APP_SERVER_URL}/users/disable/${user.id}`,
                { reason },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              toast.dismiss(updatingToastId);
              toast.success(response.data.message);

              setTimeout(() => {
                window.location.reload();
              }, 3000);
            }
          } catch (error) {
            toast.dismiss(updatingToastId);
            toast.error(error.response.data.message);
          }
        },
      },
      {
        label: 'No',
        onClick: () => {},
      },
    ],
  });
};

export default handleDisable;
