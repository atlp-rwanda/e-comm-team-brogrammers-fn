/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const CreateUserForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('none');
  const [role, setRole] = useState('buyer');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateInput();
    if (!isValid) return;

    try {
      const token = localStorage.getItem('token');
      toast.info('Creating user...', {
        autoClose: false,
        toastId: 'createUser',
      });
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users/createUser`,
        {
          username,
          email,
          password,
          gender,
          role,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.update('createUser', {
        render: response.data.message,
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        onClose: () => window.location.reload(),
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const validateInput = () => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Invalid email format.');
      return false;
    }

    // Validate password
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        'Password must be at least 8 characters, with 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.'
      );
      return false;
    }

    return true;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="create-user-form">
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="password-input-container">
          <label htmlFor="password">Password:</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {showPassword ? (
              <FaEyeSlash className="eye-icon" onClick={toggleShowPassword} />
            ) : (
              <FaEye className="eye-icon" onClick={toggleShowPassword} />
            )}
          </div>
        </div>

        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="none">none</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>

        <div>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="buyer">buyer</option>
            <option value="seller">seller</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateUserForm;
