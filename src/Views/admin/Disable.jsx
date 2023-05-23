/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const handleDisable = (user, setUsers) => {
  Swal.fire({
    title: 'Confirm Update',
    showCancelButton: true,
    html: `
      <div>
        <p>You are going to change the availability of ${user.username}.</p>
        <form id="disableForm">
          <label for="reason">Please Provide Reason for changing availability:</label>
          <input type="text" id="reason" class="swal2-input" placeholder="Enter reason" required>
        </form>
      </div>
    `,
    focusConfirm: false,
    preConfirm: () => {
      const reason = document.getElementById('reason').value;
      if (!reason) {
        return false;
      }

      const updatingToast = toast.info('Updating availability ...', {});

      return axios
        .patch(
          `${process.env.REACT_APP_SERVER_URL}/users/disable/${user.id}`,
          { reason },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        .then((response) => {
          toast.dismiss(updatingToast);
          toast.success(response.data.message);

          setUsers((prevState) => {
            const updatedUsers = prevState.data.map((u) => {
              if (u.id === user.id) {
                return {
                  ...u,
                  disabledUser: !u.disabledUser,
                };
              }
              return u;
            });
            return {
              data: updatedUsers,
            };
          });
        })
        .catch((error) => {
          toast.dismiss(updatingToast);
          toast.error(error.response.data.message);
        });
    },
    didOpen: () => {
      document.getElementById('reason').focus();
      Swal.getConfirmButton().classList.add('custom-confirm-button');
    },
  });
};

export default handleDisable;
