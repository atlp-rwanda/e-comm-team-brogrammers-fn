import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CartIcon from '../components/cartIcon';
import SearchTop from '../components/searchTop';
import ViewWishlistThunk from '../redux/features/actions/wishlistaction';
import ClearWishlistThunk from '../redux/features/actions/clearwishlist';
import { showSuccessMessage, showErrorMessage } from '../utils/toast';
import DeleteWishlistThunk from '../redux/features/actions/deleteWishlist';
import EmptyWishlist from '../components/emptyWishlist';
import '../wishlist.scss';
import { Rwf } from '../helpers/currency';

function ViewWishlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, data } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(ViewWishlistThunk());
  }, [dispatch]);

  const handleClearWishlist = async () => {
    const res = await dispatch(ClearWishlistThunk()).unwrap();
    showSuccessMessage(res.message);
  };

  const handleDeleteWishlist = async (id) => {
    try {
      const res = await dispatch(DeleteWishlistThunk(id)).unwrap();
      showSuccessMessage(res.message);
    } catch (err) {
      showErrorMessage(err?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div>
      <div>
        <SearchTop />
      </div>
      {status === 'loading' ? (
        <span className="loader-2" />
      ) : (
        <div className="wishlist">
          <div className="hed">
            {typeof data === 'object' && Object.keys(data).length > 0 && (
              <button
                type="submit"
                onClick={handleClearWishlist}
                data-testid="remove-all"
              >
                Clear your wishlist
              </button>
            )}
          </div>
          {typeof data === 'object' && Object.keys(data).length === 0 ? (
            <EmptyWishlist />
          ) : (
            <>
              <div className="all-wishlist">
                {Object.values(data).map((wishlist) => (
                  <div
                    className="container3"
                    data-testid="product-item"
                    aria-hidden
                    onDoubleClick={() =>
                      navigate(`/oneProduct/${wishlist?.id}`)
                    }
                  >
                    <div className="image back-angular">
                      {wishlist && wishlist.images && wishlist.images[0] && (
                        <img src={wishlist.images[0]} alt="productImage" />
                      )}
                    </div>
                    <Link to={`/oneProduct/${wishlist && wishlist.id}`}>
                      <b className="name" alt={wishlist && wishlist.name}>
                        {wishlist && wishlist.name}
                      </b>
                    </Link>
                    <div className="price-cart">
                      <p>
                        <b>{Rwf.format(wishlist && wishlist.price)}</b>
                      </p>
                      <button
                        type="button"
                        onClick={() => handleDeleteWishlist(wishlist?.id)}
                        data-testid="remove-wishlist"
                      >
                        <i className="fa-solid fa-trash" />
                      </button>
                      <CartIcon product={wishlist} />
                    </div>
                  </div>
                ))}
              </div>

              {/* <PaginationButtons /> */}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewWishlist;
