import React from 'react';
import Input from './input';

function ReviewCard() {
  return (
    <div className="reviewCard">
      <h1>please leave your ideas here</h1>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="rate this product 1-5"
      />
    </div>
  );
}

export default ReviewCard;
