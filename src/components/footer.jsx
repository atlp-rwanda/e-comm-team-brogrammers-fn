import React from 'react';
import logo from '../images/logo.png';
import Subscribe from './subscribeform';

function Footer() {
  return (
    <footer className="body-footer">
      <h2 className="brand">
        <img alt="logo" src={logo} />
        <span>
          <span className="sec-color">B</span>rogrammers Mall
        </span>
      </h2>
      <article>
        <p>Powered by Brogrammers © 2023</p>
        <Subscribe />
      </article>
    </footer>
  );
}

export default Footer;
