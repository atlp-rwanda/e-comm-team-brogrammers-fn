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
  AiOutlineArrowRight,
  AiFillGithub,
} from 'react-icons/ai';
import ladingImage from '../../images/landing.jpg';
// import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="brogrammers-ecommerce">
      <header className="header"></header>
      <main className="main">
        <section className="welcome">
          <div className="container">
            <div className="welcome-text">
              <h2>
                <span>Welcome To </span>
                <span>Brogrammers Ecommerce!</span>
              </h2>
              <p>
                "Brogrammers Ecommerce" is a company that offers an online
                platform for purchasing a wide range of products. The name
                "Brogrammers" may suggest a casual and lighthearted approach to
                business, while still offering a professional and efficient
                ecommerce experience for customers.
              </p>
              <a href="#" className="btn btn-primary">
                Get Started <AiOutlineArrowRight />
              </a>
            </div>
            <div className="welcome-image">
              <img src={ladingImage} alt="Placeholder" />
            </div>
          </div>
        </section>

        <section className="mission">
          <div className="container">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                At Brogrammers Ecommerce, we strive to offer a seamless and
                enjoyable shopping experience to our customers. Our mission is
                to provide a diverse range of high-quality products at
                competitive prices while prioritizing exceptional customer
                service. We aim to create a culture of inclusivity and
                innovation in the ecommerce industry, where everyone can feel
                welcome and empowered to shop with confidence. We are committed
                to continuously improving our platform, processes, and
                partnerships to ensure that we meet and exceed the evolving
                needs of our customers.
              </p>
              <a href="#" className="btn btn-primary">
                Learn More
              </a>
            </div>
          </div>
        </section>
      </main>
      <section className="contact">
        <div className="container">
          <h2>Contact Us</h2>
          <form action="#">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
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
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Terms and Conditions</a>
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
