import React from 'react';
import { Link } from 'react-router-dom';
import imge from '../images/Screenshot 2023-04-24 at 16.07.17.png';

function VerifyEmail() {
  return (
    <section className="center-xy">
      <div className="link">
        <h2> Reset Password Verification</h2>
        <img src={imge} alt="verified" />

        <p className="thaks">
          Your Password has been Successfull Reset You can now{' '}
          <Link to="/login">Login</Link> with Your new Password
        </p>
      </div>
    </section>
  );
}

export default VerifyEmail;
