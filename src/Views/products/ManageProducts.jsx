/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchBox from '../../components/search';
// eslint-disable-next-line import/no-named-as-default
import ManageItem from '../../components/ManageItem';

import collectionThunk from '../../redux/features/actions/sellerCollection';
import PaginationButtons from '../../components/paginationbuttons';

function ManageProducts() {
  const { user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && (!user || user.role.toLowerCase() === 'buyer'))
      navigate('/');
  }, [user, loading]);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const { collection: collectionz, status: isLoading } = useSelector(
    (state) => state.collection
  );

  const collections = collectionz.results;

  useEffect(() => {
    dispatch(collectionThunk(currentPage));
  }, [currentPage]);

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
                <img src={user && user?.cover_image} alt="coverpicture" />
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
            <div className="shopDesc">
              {isLoading === 'loading' ? (
                <center className="loader" />
              ) : (
                <div className="shopItems">
                  {collections && collectionz.results.length === 0 ? (
                    <center>
                      {' '}
                      <h3> You have no products </h3>
                    </center>
                  ) : (
                    <>
                      <div className="products" data-testid="product">
                        {collections &&
                          collections.map((collection) => (
                            <ManageItem
                              product={collection}
                              key={collection.id}
                              currentPage={currentPage}
                            />
                          ))}
                      </div>
                      <PaginationButtons
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={collectionz?.totalPages || 1}
                      />
                    </>
                  )}
                </div>
              )}
            </div>{' '}
          </div>{' '}
        </section>
      )}
    </section>
  );
}
export default ManageProducts;
