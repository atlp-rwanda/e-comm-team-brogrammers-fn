/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import oneProductThunk from '../redux/features/actions/oneProduct';
import SearchTop from './searchTop';
import StarRating from './starrating';
import ReviewDistribution from './reviewDistribution';
import reviewthunk from '../redux/features/actions/productReview';
import ReviewDialog from './reviewDialog';
import ReviewButton from './reviewButton';
import { Rwf } from '../helpers/currency';

function OneProduct() {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(null);
  const { user } = useSelector((state) => state.user);

  const { data: product, status } = useSelector((state) => state.oneproduct);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(oneProductThunk(id));
  }, []);

  const handleImageClick = (image) => {
    setCurrentImage(image);
  };
  const { review, status: loading } = useSelector((state) => state.reviews);

  const [currentpage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(reviewthunk({ id, page: currentpage }));
  }, [currentpage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  function roundOff(num, decimalPlaces) {
    const factor = 10 ** decimalPlaces;
    return Math.round(num * factor) / factor;
  }
  function formatRelativeTime(time) {
    const currentTime = new Date();
    const timestamp = new Date(time);
    const secondsElapsed = (currentTime - timestamp) / 1000;

    if (secondsElapsed < 60) {
      return 'just now';
    }
    if (secondsElapsed < 3600) {
      const minutes = Math.floor(secondsElapsed / 60);
      return `${minutes} minutes ago`;
    }
    if (secondsElapsed < 86400) {
      const hours = Math.floor(secondsElapsed / 3600);
      return `${hours} hours ago`;
    }
    const days = Math.floor(secondsElapsed / 86400);
    return `${days} days ago`;
  }
  return (
    <div>
      <SearchTop />
      {status === 'loading' || !product || !review ? (
        <div className="loaderArea" data-testid="loader">
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
            {!product?.reviews ? (
              <span className="loader-2" />
            ) : (
              <>
                <p className="title">Rating and reviews</p>
                <div className="reviews-rate">
                  <div className="reviewsRate">
                    {' '}
                    <p className="avrate">
                      {!product?.reviews ? (
                        <b>{0}</b>
                      ) : (
                        <b>{roundOff(review.totalRates?.AvRate, 1) || 0}</b>
                      )}
                    </p>
                    <StarRating
                      rate={roundOff(review.totalRates?.AvRate, 1) || 0}
                    />
                    <p className="likers">{product?.reviews?.length} reviews</p>{' '}
                  </div>
                  <div className="reviewDistribution">
                    <ReviewDistribution review={review} status={loading} />
                  </div>
                </div>
                {user && (
                  <div className="reviewThis">
                    <p className="review1">Rate This Product</p>
                    <p className="review2">Tell us what you think</p>
                    <div className="submit-review">
                      <ReviewDialog product={product} />
                    </div>
                  </div>
                )}
                <div className="reviewer">
                  {review &&
                    review.allReviews.results.map((reviewer) => (
                      <div className="oneReview">
                        <div className="userAvatar">
                          <div className="image">
                            <img src={reviewer.reviewer.avatar} alt="profile" />
                          </div>
                          <div className="p">
                            <p>{reviewer.reviewer.username}</p>
                          </div>
                        </div>
                        <div className="ratediv">
                          <div>
                            {' '}
                            <StarRating rate={reviewer.rating} />
                          </div>
                          <div className="rate-div">
                            {' '}
                            <p className="rate">{reviewer.rating}</p>
                          </div>
                          <div className="date-div">
                            {' '}
                            <p className="date">
                              {formatRelativeTime(reviewer.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="feedBack">
                          <p>{reviewer.feedback}</p>
                        </div>
                        {user &&
                        (user.email === reviewer.reviewer.email ||
                          user.role === 'admin') ? (
                          <ReviewButton reviewer={reviewer} />
                        ) : (
                          <p className="delete-disabled">{}</p>
                        )}
                      </div>
                    ))}
                  {loading === 'loading' ? (
                    <p className="next-btn">Loading ...</p>
                  ) : (
                    <div className="next-btn">
                      <p
                        type="button"
                        aria-hidden
                        className="next"
                        onClick={handleNextPage}
                      >
                        {review.allReviews.results.length <= 4 ? (
                          <p>{}</p>
                        ) : (
                          'More Reviews'
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
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
                  <b>{Rwf.format(product?.price)}</b> per each
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
