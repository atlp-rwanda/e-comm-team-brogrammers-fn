import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import '../EmptyWishlist.scss';

function EmptyWishlist() {
  return (
    <div className="empty-wishlist">
      <i className="empty-wishlist-icon" data-testid="empty-wishlist-icon">
        <AiOutlineCloseCircle />
      </i>
      <h2>Your Wishlist is Empty</h2>
      <p>Add some products to your wishlist to keep track of your favorites.</p>
      <Link to="/products" className="border-button">
        Create new wish
      </Link>
    </div>
  );
}
export default EmptyWishlist;
