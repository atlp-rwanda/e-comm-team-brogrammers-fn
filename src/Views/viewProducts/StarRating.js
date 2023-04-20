import React from "react";
import Rating from "react-rating";
const StarRating = (props) => {
  const { rating } = props;
  return (
    <Rating
      initialRating={rating}
      emptySymbol="far fa-star fa-sm text-[#d6a445] border-[#d6a445]"
      fullSymbol="fas fa-star fa-sm text-[#d6a445] border-[#d6a445]"
      // onChange={() => console.log("Okay")}
      readonly="true"
    />
  );
};

export default StarRating;
