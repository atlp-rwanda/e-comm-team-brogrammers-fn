import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import oneProductThunk from '../redux/features/actions/oneProduct';
import SearchTop from './searchTop';
import StarRating from './starrating';

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
      <SearchTop />
      {status === 'loading' || !product ? (
        <div className="loaderArea">
          <span className="loader-2" />
        </div>
      ) : (
        <section className="productContainer">
          <div className="productimages">
            <div className="productPictures">
              <div className="left back-angular">
                <img
                  src={
                    currentImage ||
                    (product && product?.images && product?.images[0])
                  }
                  alt="picture1"
                  data-testid="big-image"
                />
              </div>
              <div className="rightcont">
                <div className="right">
                  {product &&
                    product?.images &&
                    product?.images?.map((image) => (
                      <img
                        key={image}
                        aria-hidden
                        className="back-angular"
                        src={image}
                        data-testid="small-image"
                        alt="picture2"
                        onClick={() => handleImageClick(image)}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="reviews">
            <h1>Rating and Reviews</h1>
            <p>{!product?.reviews ? <b>{3.5}</b> : <b>0</b>}</p>
            <StarRating rate={3.5 || 0} />
            <p className="likers">{product?.reviews?.length}</p>
          </div>

          <div className="productInfo">
            <div className="moremore">
              <div className="more">
                <p className="title">
                  <b> {product?.name}</b>
                </p>
                <p className="seller">
                  Seller:<span> {product?.seller?.username}</span>
                </p>
                <p className="desc">{product?.description}</p>
                <p className="price">
                  <b>${product?.price}</b> per each
                </p>
              </div>
              <div className="buttons">
                <div className="area1">
                  <p> items</p>
                  <p> {product?.quantity}</p>
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
