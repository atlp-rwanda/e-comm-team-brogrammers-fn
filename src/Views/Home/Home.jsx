import React, { useEffect } from 'react';
import './LandingPage.scss';

import { Link } from 'react-router-dom';
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillGithub,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import SearchTop from '../../components/searchTop';
import fashionImage from '../../images/fashion.png';
import fetchProducts from '../../redux/features/actions/products';
import ProductsArray from '../../components/productArray';
import ChatIcon from '../../components/ChatIcon';

function Home() {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts(1));
  }, []);

  return (
    <>
      <SearchTop />
      <div className="landing-page">
        <section className="landing-content">
          <div className="slider">
            <div className="list">
              <div style={{ backgroundColor: '#372516' }}>
                <div className="content">
                  <p>
                    We bring you the best of the <b>best Classic Fashion</b>.
                    First trusted website.
                  </p>
                  <div className="buttons">
                    <Link to="/products">
                      <button type="button" className="btn1 clr-dark">
                        View More
                      </button>
                    </Link>
                    <Link to="/signup">
                      <button type="button" className="btn1 inverse">
                        Join for free
                      </button>
                    </Link>
                  </div>
                </div>
                <img alt="fashion" src={fashionImage} />
              </div>
            </div>
          </div>
        </section>

        <div className="products-list">
          <section className="allProduct-list">
            <div className="head">
              <h2>Recent items</h2>
            </div>
            <div className="list">
              <ProductsArray
                products={products?.results}
                loading={status === 'loading'}
              />
            </div>
            <div className="chat-icon">
              <ChatIcon />
            </div>
          </section>
        </div>
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
                  <Link to="/">About Us</Link>
                </li>
                <li>
                  <Link to="/">FAQ</Link>
                </li>
                <li>
                  <Link to="/">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
            <div className="footer-social">
              <ul>
                <li>
                  <Link to="/">
                    <AiFillFacebook />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <AiFillTwitterCircle />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <AiFillInstagram />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <AiFillGithub />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
export default Home;
