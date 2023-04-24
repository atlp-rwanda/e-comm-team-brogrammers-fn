import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FaGoogle } from 'react-icons/fa';

function GoogleLoginButton() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const params = Object.fromEntries(searchParams.entries());
  const navigate = useNavigate();

  useEffect(() => {
    if (params.key && params.email) {
      localStorage.setItem('token', `${params.key}`);
      localStorage.setItem('userEmail', params.email);
      navigate('/');
    }
  }, [params]);

  return (
    <a
      href={`${process.env.REACT_APP_SERVER_URL}/users/auth/google`}
      className="google-login-button"
    >
      <FaGoogle className="google-login-button__icon" />
      Google Login
    </a>
  );
}
export default GoogleLoginButton;
