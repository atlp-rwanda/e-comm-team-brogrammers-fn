import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Input from '../../components/input';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const isValidPassword = (password) => {
  const regex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{}|;:'",.<>/?])(?!.*\s).{8,}$/;
  return regex.test(password);
};

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    if (!isValidEmail(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = ({ target: { value } }) => {
    setPassword(value);
    if (!isValidPassword(value)) {
      setPasswordError(
        'Password must be at least 8 characters, 1 uppercase letter, 1 symbol, and 1 number'
      );
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = ({ target: { value } }) => {
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const clearForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let hasError = false;

    if (!isValidEmail(email)) {
      setEmailError('Invalid email address');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!isValidPassword(password)) {
      setPasswordError(
        'Password must be at least 8 characters, 1 uppercase letter, 1 symbol, and 1 number'
      );
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    } else {
      setConfirmPasswordError('');
    }

    if (!hasError) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/users/reset-password`,
          { email, newPassword: password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.status === 200) {
          showSuccessMessage('Please check your email to Reset your Password.');
          clearForm();
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          showErrorMessage('Email not found in the database.');
          clearForm();
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="center-xy">
      <form onSubmit={handleSubmit} className="sign back-angular">
        <h1>Reset Password</h1>

        <Input
          value={email}
          id="email"
          placeholder="Email"
          onChange={handleEmailChange}
          required
          errors={emailError}
        />

        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
          errors={passwordError}
        />

        <Input
          type="password"
          id="confirm-password"
          name="confirm-password"
          placeholder="Re-Enter Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
          errors={confirmPasswordError}
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`btn1 ${isLoading ? 'button-loading' : ''}`}
        >
          {isLoading ? 'Loading...' : 'Reset Password'}
        </button>
        <p>
          Back to <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default ResetPassword;
