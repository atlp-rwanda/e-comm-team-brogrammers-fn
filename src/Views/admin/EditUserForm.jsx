/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';

function EditUserForm({ user }) {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    gender: user.gender,
    role: user.role,
    verified: user.verified,
    disabledUser: user.disabledUser,
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUpdating(true);
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/users/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.status === 200) {
        setIsUpdating(false);
        toast.success('User Updated successful', {
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
      // handle error here
    }
  };

  return (
    <div className="form-wrapper">
      <h2>Edit User</h2>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            id="gender"
          >
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="none">none</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            id="role"
          >
            <option value="admin">admin</option>
            <option value="seller">seller</option>
            <option value="buyer">buyer</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="verified">Verified:</label>
          <input
            id="verified"
            type="text"
            name="verified"
            value={formData.verified}
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="disabledUser">Disabled:</label>
          <input
            id="disabledUser"
            type="text"
            name="disabledUser"
            value={formData.disabledUser}
            readOnly
          />
        </div>

        <div className="form-actions">
          <button type="submit" onClick={handleSubmit}>
            {isUpdating ? <FaSpinner className="spinner" /> : 'Update'}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default EditUserForm;
