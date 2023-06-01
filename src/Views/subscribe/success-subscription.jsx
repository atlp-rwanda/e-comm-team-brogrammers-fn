import React from 'react';
import css from './index.module.scss';

function SuccessSubscription() {
  return (
    <section className={css.all}>
      <div className={css.container}>
        <h1>Subscription Successful!</h1>
        <p>Thank you for subscribing to our newsletter.</p>
        <p>You will now receive updates and exclusive offers.</p>
      </div>
    </section>
  );
}

export default SuccessSubscription;
