import React from 'react';
import googleLogo from '../images/google-logo.png';

function GoogleButton() {
  return (
    <button type="button" className="google-button">
      <img className="logo" alt="google logo" src={googleLogo} />
      Signup with google
    </button>
  );
}

export default GoogleButton;
