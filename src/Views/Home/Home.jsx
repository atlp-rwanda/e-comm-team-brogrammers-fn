/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable react/self-closing-comp */
import React from 'react';
import './LandingPage.scss';
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillGithub,
} from 'react-icons/ai';
import ViewProducts from '../viewProducts';

function Home() {
  return (
    <div className="brogrammers-ecommerce">
      <header className="header"></header>
      <main className="main">
        {/* <Filter /> */}
        <div className="product-container">
          <ViewProducts />
        </div>
      </main>
      <section className="contact">
        <div className="container">
          <h2>HEAR FROM US.</h2>
          <form action="#">
            <button type="submit" className="btn subbtn btn-primary">
              Subscribe To Our News letter
            </button>
          </form>
        </div>
      </section>

      <footer>
        <div className="footer-container">
          <div className="footer-links">
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
            </ul>
          </div>
          <div className="footer-social">
            <ul>
              <li>
                <a href="#">
                  <AiFillFacebook />
                </a>
              </li>
              <li>
                <a href="#">
                  <AiFillTwitterCircle />
                </a>
              </li>
              <li>
                <a href="#">
                  <AiFillInstagram />
                </a>
              </li>
              <li>
                <a href="#">
                  <AiFillGithub />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default Home;
