import React from 'react';
import { Link } from 'react-router-dom';
import imge from '../images/edit cross.jpg';

function VerifyEmail() {
  return (
    <section className="center-xy">
      <div className="link">
        <h2> Reset Password Verification</h2>
        <img src={imge} alt="verified" />

        <p className="thaks">
          Reset Password has failed Please Try again to{' '}
          <Link to="/reset-pass">Reset</Link> Your Password
        </p>
      </div>
    </section>
  );
}

export default VerifyEmail;
