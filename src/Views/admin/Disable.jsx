/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import { Form, Button } from 'react-bootstrap';

const handleDisable = (user, setUsers) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      let updatingToastId;
      const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        if (token) {
          const reason = event.target.reason.value;
          if (!reason) {
            toast.error('You must provide a reason for updating the user');
            return;
          }
          onClose();

          updatingToastId = toast.info('Updating user...', {});

          try {
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
          } catch (error) {
            toast.dismiss(updatingToastId);
            toast.error(error.response.data.message);
          }
        }
      };

      return (
        <div className="custom-ui">
          <h3>Confirm Update</h3>
          <p>{` You are about to update ${user.username}`}</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="reason">
              <Form.Label>Please Provide Reason for updating:</Form.Label>
              <Form.Control type="text" placeholder="Enter reason" required />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              style={{ margin: '10px', background: '#d80' }}
            >
              Submit
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Form>
        </div>
      );
    },
  });
};

export default handleDisable;
