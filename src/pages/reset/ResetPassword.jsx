import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import './reset.scss';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one symbol (!@#$&*)'
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, confirmPassword }),
      });
      const data = await response.json();
      setSuccessMessage(data.message);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // const handleVerifyToken = async (token) => {
  //   try {
  //     const response = await fetch('/api/verify-token', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ token }),
  //     });
  //     const data = await response.json();
  //     setSuccessMessage(data.message);
  //     setTimeout(() => {
  //       window.location.href = '/login'; // Navigate to login page after success message is displayed
  //     }, 3000);
  //   } catch (error) {
  //     setErrorMessage(error.message);
  //   }
  // };

  const handleTogglePassword = (type) => {
    if (type === 'password') {
      setShowPassword(!showPassword);
    } else if (type === 'confirm-password') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="reset">
      <form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        <div className="input-container">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          />
        </div>
        <div className="input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)"
          />
          <span
            className="show-password"
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
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={8}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)"
          />
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

        <button type="submit">Reset Password</button>
        <h5>
          Back to <Link to="/login">Login</Link>
        </h5>
      </form>
    </div>
  );
}

export default ResetPassword;
