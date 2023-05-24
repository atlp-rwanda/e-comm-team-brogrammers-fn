/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const handleDelete = (user, setUsers) => {
  Swal.fire({
    title: 'Confirm deletion',
    text: `Are you sure you want to delete ${user.username}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ff9900',
    cancelButtonColor: '#888',
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Show a toast message to indicate that the user is being deleted
          const deletingToastId = toast.info('Deleting user...', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          await axios.delete(
            `${process.env.REACT_APP_SERVER_URL}/users/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          toast.dismiss(deletingToastId);
          toast.success('User deleted successfully', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setUsers((prevUsers) => ({
            ...prevUsers,
            data: prevUsers.data.filter((u) => u.id !== user.id),
          }));
        }
      } catch (error) {
        toast.error('Error deleting user');
      }
    }
  });
};

export default handleDelete;
