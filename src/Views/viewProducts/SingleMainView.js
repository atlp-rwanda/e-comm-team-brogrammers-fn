import React from "react";
import StarRating from "./StarRating";
import Images from "./Images";
import Categorize from "./Categorize";

const SingleMainView = ({ selectedProduct, categories }) => {
  return (
    <div className="w-full flex justify-center flex-col items-center sm:flex-row sm:justify-center">
      <div className="sm:mr-10">
        <Images images={selectedProduct.images} />
      </div>
      <div className="my-8 flex flex-col justify-between">
        <h1 className="font-bold text-4xl text-primary">
          {selectedProduct.name}
        </h1>
        <div className="my-6">
          <p className="text-lg">
            <span className="font-semibold">Category: </span>
            <Categorize
              id={selectedProduct.categoryId}
              categories={categories}
            />
          </p>
          <p className="text-lg">
            <span className="font-semibold">Price: $</span>
            {selectedProduct.price}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Ratings: </span>4.5{" "}
            <StarRating rating={4.5} />
          </p>
        </div>
        <button className="bg-primary flex justify-around items-center border-none w-60 h-10 sm:w-72 sm:h-12  hover:bg-dark ">
          <i className="fa fa-cart-shopping fa-xl text-white"></i>
          <span className="text-white font-semibold text-xl mr-10">
            ADD TO CART
          </span>
        </button>
      </div>
    </div>
  );
};

export default SingleMainView;
