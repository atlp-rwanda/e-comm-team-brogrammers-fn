/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from '../components/search';
import ProductItem from '../components/ProductItem';
import profileheader from '../images/cover image.png';
import collectionThunk from '../redux/features/actions/sellerCollection';

function SellerCollection() {
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(collectionThunk(currentPage));
  }, [currentPage]);
  const { collection: collectionz, status: isLoading } = useSelector(
    (state) => state.collection
  );
  const collections = collectionz.results;

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };
  const handleCustomPage = (id) => {
    setCurrentPage(id);
  };
  const getPageNumbers = () => {
    const buttons = [];
    for (let i = 1; i <= Math.min(3, collectionz.totalPages); i++) {
      buttons.push(
        <button
          type="button"
          key={i}
          id={i}
          className={`btn-number ${currentPage === i ? 'active' : ''}`}
          onClick={() => handleCustomPage(i)}
        >
          {i}
        </button>
      );
    }
    if (collectionz.totalPages > 6) {
      buttons.push(<span key="dots-start">...</span>);
      for (
        let i = Math.max(4, currentPage - 1);
        i <= Math.min(currentPage + 1, 6);
        i++
      ) {
        buttons.push(
          <button
            type="button"
            key={i}
            id={i}
            className={`btn-number ${currentPage === i ? 'active' : ''}`}
            onClick={() => handleCustomPage(i)}
          >
            {' '}
            {i}
          </button>
        );
      }
      buttons.push(<span key="dots-end">...</span>);
    }
    for (
      let i = Math.max(collectionz.totalPages - 2, 4);
      i <= collectionz.totalPages;
      i++
    ) {
      buttons.push(
        <button
          type="button"
          key={i}
          id={i}
          className={`btn-number ${currentPage === i ? 'active' : ''}`}
          onClick={() => handleCustomPage(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };
  return (
    <section className="center-xy">
      {loading || !user ? (
        <span className="loader" />
      ) : (
        <section>
          <div className="xy-container">
            <div className="search">
              <SearchBox />
            </div>
            <div className="container2">
              <div className="profile">
                <img src={profileheader} alt="coverpicture" />
              </div>
              <div className="sellerProfile">
                <div className="sellerPicture">
                  <img src={user.avatar} alt="profile" />
                </div>
                <div className="sellerInfo">
                  <div>
                    <p>
                      <b>{user.username}</b>
                    </p>
                    <p className="email">{user.email}</p>
                  </div>
                  <div className="edit">
                    <button type="submit"> Edit profile</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="productsdescription">
              <aside className="aside">
                <div className="sellerStatus">
                  <p>
                    Gender
                    <br />
                    <span>
                      <b> {user.gender}</b>{' '}
                    </span>
                  </p>
                  <p>
                    Total products
                    <br />
                    <span>
                      <b>{collectionz.totalCount}</b>{' '}
                    </span>
                  </p>
                  <p>
                    your statistics
                    <br />
                    <span>
                      <b>
                        <Link to="/statistics" data-testid="signup">
                          statistics
                        </Link>{' '}
                      </b>{' '}
                    </span>
                  </p>
                </div>
                <div className="productStatus">
                  <p className="manageProducts"> Product Status</p>
                  <p className="manageProducts"> Manage Products</p>
                </div>
              </aside>
              {isLoading === 'loading' ? (
                <span className="loader" />
              ) : (
                <div className="shopItems">
                  <div>
                    <p className="shop">
                      <b>Shop</b> {collectionz.totalCount} results
                    </p>
                  </div>
                  <div className="product" data-testid="product">
                    {collections &&
                      collections.map((collection) => (
                        <ProductItem product={collection} key={collection.id} />
                      ))}
                  </div>
                  <div className="pages">
                    {currentPage > 1 ? (
                      <button
                        type="button"
                        className="b2"
                        onClick={handlePrevPage}
                        data-testid="back-button"
                      >
                        Previous
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="b2"
                        style={{ color: 'grey', cursor: 'not-allowed' }}
                        onClick={handlePrevPage}
                        data-testid="back-button"
                      >
                        {' '}
                        Previous
                      </button>
                    )}
                    {getPageNumbers()}
                    <button
                      type="button"
                      className="b2"
                      onClick={handleNextPage}
                      data-testid="next-button"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>{' '}
          </div>{' '}
        </section>
      )}
    </section>
  );
}
export default SellerCollection;