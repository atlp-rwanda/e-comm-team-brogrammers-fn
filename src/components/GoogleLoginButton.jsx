import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import googleLogo from '../images/google-logo.png';

function GoogleLoginButton({ text }) {
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
      className="google-button"
      data-testid="google-auth"
    >
      <img className="logo" alt="google logo" src={googleLogo} />
      {text}
    </a>
  );
}
export default GoogleLoginButton;
