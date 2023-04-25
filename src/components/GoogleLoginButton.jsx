import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function GoogleLoginButton() {
  const location = useLocation();
  const searchParams = useState(new URLSearchParams(location.search));
  const params = useState(Object.fromEntries(searchParams.entries()));
  const navigate = useNavigate();

  useEffect(() => {
    if (params.key && params.email) {
      localStorage.setItem('token', `${params.key}`);
      localStorage.setItem('userEmail', params.email);
      navigate('/');
    }
  }, [params, location, searchParams]);

  return (
    <a
      href={`${process.env.REACT_APP_SERVER_URL}/users/auth/google`}
      className="google-button"
    >
      <svg viewBox="0 0 32 32" width="64" height="64" className="logo">
        <defs>
          <path
            id="A"
            d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
          />
        </defs>
        <clipPath id="B">
          <use href="#A" />
        </clipPath>
        <g transform="matrix(.727273 0 0 .727273 -.954545 -1.45455)">
          <path d="M0 37V11l17 13z" clipPath="url(#B)" fill="#fbbc05" />
          <path
            d="M0 11l17 13 7-6.1L48 14V0H0z"
            clipPath="url(#B)"
            fill="#ea4335"
          />
          <path
            d="M0 37l30-23 7.9 1L48 0v48H0z"
            clipPath="url(#B)"
            fill="#34a853"
          />
          <path
            d="M48 48L17 24l-4-3 35-10z"
            clipPath="url(#B)"
            fill="#4285f4"
          />
        </g>
      </svg>
      Google Login
    </a>
  );
}

export default GoogleLoginButton;
