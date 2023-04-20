import React from "react";
import StarRating from "./StarRating";
import Categorize from "./Categorize.js";
import { useNavigate } from "react-router-dom";

const MainProductCard = ({ product, categories }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-[200px] mx-auto flex flex-col justify-center hover:cursor-pointer"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="h-14 overflow-hidden p-1 bg-whiteColor rounded-xl flex justify-center items-center w-1/2 mx-auto">
        <img src={product.images[0]} alt="product-image" className="w-24" />
      </div>
      <div className="flex justify-between font-semibold text-sm mt-2">
        <h3 className="max-w-[150px]">{product.name}</h3>
        <h3 className="">${product.price}</h3>
      </div>
      <div className="flex justify-around my-1">
        <div className=" ">
          <span className="font-light">
            {/* Shoes */}
            <Categorize id={product.categoryId} categories={categories} />
          </span>
          <p>
            <span className="font-bold mr-1">4.5</span>
            <StarRating rating={4} />
          </p>
        </div>
        <div className="flex items-center justify-center">
          <button className="relative w-[35px] max-h-[40px] add-btn transition-all duration-300 ease-in bg-primary text-white px-1 pb-1 ml-5 rounded-lg text-base leading-7 invisible hover:bg-dark">
            <i className="fa fa-shopping-cart"></i>
            <div className="p-1 w-20 hidden absolute text-sm top-9 right-[-16px] bg-secondary rounded-sm text-white">
              Add to cart
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainProductCard;
