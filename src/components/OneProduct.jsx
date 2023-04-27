import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from './search';

import oneProductThunk from '../redux/features/actions/oneProduct';

function OneProduct() {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(null);

  const { data: product, status } = useSelector((state) => state.oneproduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(oneProductThunk(id));
  }, []);

  const handleImageClick = (image) => {
    setCurrentImage(image);
  };

  return (
    <div>
      <div className="search">
        <SearchBox />
      </div>
      {status === 'loading' || !product ? (
        <div className="loaderArea">
          <span className="loader" />
        </div>
      ) : (
        <section className="productContainer">
          <div className="productPictures">
            <div className="left back-angular">
              <img src={currentImage || product.images[0]} alt="picture1" />
            </div>
            <div className="rightcont">
              <div className="right back-angular">
                {product &&
                  product.images.map((image) => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                    <img
                      src={image}
                      alt="picture2"
                      onClick={() => handleImageClick(image)}
                    />
                  ))}
              </div>
            </div>
          </div>

          <div className="reviews">
            <p>
              {' '}
              <b> Rating and Reviews</b>
            </p>
            <p>
              {!product.reviews ? (
                <b>{product.reviews[0].rating || 0}</b>
              ) : (
                <b>0</b>
              )}
            </p>
            <div className="star">
              <i className="fa-solid fa-star"> </i>
              <i className="fa-solid fa-star"> </i>
              <i className="fa-solid fa-star"> </i>
              <i className="fa-regular fa-star"> </i>
              <i className="fa-regular fa-star"> </i>
            </div>
            <p className="likers">{product.reviews.length}</p>
          </div>

          <div className="productInfo">
            <div className="moremore">
              <div className="more">
                <p className="title">
                  <b> {product.name}</b>
                </p>
                <p className="seller">
                  Seller:<span> {product.seller.username}</span>
                </p>
                <p className="desc">{product.description}</p>
                <p className="price">
                  <b>${product.price}</b> per each
                </p>
              </div>
              <div className="buttons">
                <div className="area1">
                  <p> items</p>
                  <p> {product.quantity}</p>
                </div>
                <button type="submit" className="btn">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default OneProduct;
