import React, { useState } from 'react';
import Rating from 'react-rating';

function StarRating2({ rate, onHover }) {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleHover = (index) => {
    setHoveredIndex(index);
    if (typeof onHover === 'function') {
      onHover(index);
    }
  };

  const handleHoverLeave = () => {
    setHoveredIndex(-1);
    if (typeof onHover === 'function') {
      onHover(-1);
    }
  };

  return (
    <Rating
      initialRating={rate}
      emptySymbol={
        <i
          className={`fa-regular fa-star empty-star ${
            hoveredIndex >= 0 ? 'hovered' : ''
          }`}
          onMouseEnter={() => handleHover(hoveredIndex >= 0 ? hoveredIndex : 0)}
          onMouseLeave={() => handleHoverLeave()}
        />
      }
      fullSymbol={
        <i
          className={`fa-solid fa-star full-star ${
            hoveredIndex >= 0 ? 'hovered' : ''
          }`}
          onMouseEnter={() => handleHover(hoveredIndex >= 0 ? hoveredIndex : 0)}
          onMouseLeave={() => handleHoverLeave()}
        />
      }
      onHover={(index) => handleHover(index)}
      onHoverLeave={() => handleHoverLeave()}
      readonly="true"
    />
  );
}

export default StarRating2;
