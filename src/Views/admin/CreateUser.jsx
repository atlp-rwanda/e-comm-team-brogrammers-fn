import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Input from '../../components/input';
import Select from '../../components/select';

function CreateUserForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('none');
  const [role, setRole] = useState('buyer');

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
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred while creating the user.');
      }
    }
  };

  return (
    <div className="create-user-form">
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="username:"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Input
          label="email:"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          label="Password:"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Select
          label="Gender:"
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="none">none</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </Select>

        <Select
          label="Role:"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="buyer">buyer</option>
          <option value="seller">seller</option>
          <option value="admin">admin</option>
        </Select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateUserForm;
