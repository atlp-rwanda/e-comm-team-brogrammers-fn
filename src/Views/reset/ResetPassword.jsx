/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import axios from 'axios';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handleTogglePassword = (type) => {
    if (type === 'password') {
      setShowPassword(!showPassword);
    } else if (type === 'confirm-password') {
      setShowConfirmPassword(!showConfirmPassword);
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
    setIsLoading(true);

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
      try {
        const response = await axios.post(
          'https://brogrammers-ecomerce1.onrender.com/users/reset-password',
          { email, newPassword: password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (response.status === 200) {
          toast.success('Please check your email to Reset your Password.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          clearForm();
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error('Email not found in the database.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          clearForm();
        } else {
          toast.error('An error occurred while submitting form', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          clearForm();
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const buttonText = isLoading ? 'Loading...' : 'Reset Password';

  return (
    <div className="reset">
      <form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>

        <div className="input-container">
          <input
            value={email}
            id="email"
            placeholder="Email"
            onChange={handleEmailChange}
            required
          />
          {emailError && (
            <div style={{ color: 'red', fontSize: '13px' }}>{emailError}</div>
          )}
        </div>

        <div className="input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {passwordError && (
            <div style={{ color: 'red', fontSize: '13px' }}>
              {passwordError}
            </div>
          )}
          <span
            className="show-password"
            data-testid="toggle-password"
            onClick={() => handleTogglePassword('password')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleTogglePassword('password');
              }
            }}
            role="button"
            tabIndex={0}
          >
            <FontAwesomeIcon icon={faEye} />
          </span>
        </div>

        <div className="input-container">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirm-password"
            name="confirm-password"
            placeholder="Re-Enter Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {confirmPasswordError && (
            <div style={{ color: 'red', fontSize: '13px' }}>
              {confirmPasswordError}
            </div>
          )}
          <span
            className="show-password"
            onClick={() => handleTogglePassword('confirm-password')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleTogglePassword('confirm-password');
              }
            }}
            role="button"
            tabIndex={0}
          >
            <FontAwesomeIcon icon={faEye} />
          </span>
        </div>

        <button type="submit" disabled={isLoading}>
          {buttonText}
        </button>
        <h5>
          Back to <Link to="/login">Login</Link>
        </h5>
      </form>
    </div>
  );
}

export default ResetPassword;
