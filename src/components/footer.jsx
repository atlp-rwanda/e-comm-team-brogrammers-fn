import React from 'react';
import logo from '../images/logo.png';

function Footer() {
  return (
    <footer className="body-footer">
      <h2 className="brand">
        <img alt="logo" src={logo} />
        <span>
          <span className="sec-color">B</span>rogrammers Mall
        </span>
      </h2>
      <div>Powered by Brogrammers © 2023</div>
    </footer>
  );
}

export default Footer;
