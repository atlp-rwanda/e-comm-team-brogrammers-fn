import React from 'react';
import Rating from 'react-rating';

function StarRating({ rate }) {
  return (
    <Rating
      initialRating={rate}
      emptySymbol={<i className="fa-regular fa-star" />}
      fullSymbol={<i className="fa-solid fa-star" />}
      readonly="true"
    />
  );
}

export default StarRating;
