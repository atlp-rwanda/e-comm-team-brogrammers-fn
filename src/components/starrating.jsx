import React from 'react';
import Rating from 'react-rating';

function StarRating({ rate }) {
  return (
    <Rating
      initialRating={rate}
      emptySymbol="far fa-star fa-sm text-[#d6a445] border-[#d6a445]"
      fullSymbol="fas fa-star fa-sm text-[#d6a445] border-[#d6a445]"
      readonly="true"
    />
  );
}

export default StarRating;
