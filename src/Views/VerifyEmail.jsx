import React from 'react';
import { Link } from 'react-router-dom';
import imge from '../images/Screenshot 2023-04-24 at 16.07.17.png';

function VerifyEmail() {
  return (
    <section className="center-xy">
      <div className="link">
        <h2> Email Verificaton Successfull</h2>
        <img src={imge} alt="verified" />

        <p className="thaks">
          Hey your email was verified you can <Link to="/login">Login now</Link>{' '}
          and enjoy numerous products ,Thanks for chosing our mall
        </p>
      </div>
    </section>
  );
}

export default VerifyEmail;
