/* eslint-disable no-alert */
import axios from 'axios';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

const handleDisable = (user) => {
  confirmAlert({
    title: 'Confirm disable',
    message: `Are you sure you want to disable ${user.username}?`,
    buttons: [
      {
        label: 'Yes',
        onClick: async () => {
          try {
            const token = localStorage.getItem('token');
            if (token) {
              // Prompt the user to enter a reason for disabling the account
              const reason = window.prompt(
                'Please enter a reason for disabling this user:'
              );
              if (!reason) {
                toast.error('You must provide a reason for disabling the user');
                return;
              }

              // Show a toast message to indicate that the user is being disabled
              const disablingToastId = toast.info('Disabling user...', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              await axios.patch(
                `${process.env.REACT_APP_SERVER_URL}/users/disable/${user.id}`,
                { reason },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              toast.dismiss(disablingToastId);
              toast.success('User disabled successfully', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

              setTimeout(() => {
                window.location.reload();
              }, 3000);
            }
          } catch (error) {
            toast.error('Error disabling user');
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
