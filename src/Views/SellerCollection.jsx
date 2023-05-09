/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../components/productitem';
import collectionThunk from '../redux/features/actions/sellerCollection';
import SearchTop from '../components/searchTop';
import PaginationButtons from '../components/paginationbuttons';

function SellerCollection() {
  const { user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && (!user || user.role.toLowerCase() === 'buyer'))
      navigate('/');
  }, [user, loading]);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(collectionThunk(currentPage));
  }, [currentPage]);
  const { collection: collectionz, status: isLoading } = useSelector(
    (state) => state.collection
  );
  const collections = collectionz.results || [];

  return (
    <>
      <SearchTop />
      <section>
        {loading || !user ? (
          <span className="loader-2" />
        ) : (
          <section>
            <div className="xy-container">
              <div className="container2">
                <div className="profile">
                  <img src={user && user?.cover_image} alt="coverpicture" />
                </div>
                <div className="sellerProfile">
                  <div className="sellerPicture">
                    <img src={user && user?.avatar} alt="profile" />
                  </div>
                  <div className="sellerInfo">
                    <div>
                      <h2>{user && user?.username}</h2>
                      <p className="email">{user && user.email}</p>
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
                        <b> {user && user?.gender}</b>{' '}
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
                    <p className="manageProducts">
                      {' '}
                      <Link
                        to="/collection/manageProducts"
                        data-testid="signup"
                      >
                        Manage Products{' '}
                      </Link>{' '}
                    </p>
                  </div>
                </aside>
                {isLoading === 'loading' ? (
                  <span className="loader-2" />
                ) : (
                  <div className="shopItems">
                    <div>
                      <p className="shop">
                        <b>Your Products</b> {collectionz.totalCount} results
                      </p>
                    </div>
                    <div className="product" data-testid="product">
                      {collections &&
                        collections.map((collection) => (
                          <ProductItem
                            product={collection}
                            key={collection.id}
                          />
                        ))}
                    </div>

                    <PaginationButtons
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      totalPages={collectionz?.totalPages || 1}
                    />
                  </div>
                )}
              </div>{' '}
            </div>{' '}
          </section>
        )}
      </section>
    </>
  );
}
export default SellerCollection;
