import React from "react";
import ProductCard from "./ProductCard.js";
import BackArrow from "./BackArrow.js";

const SingleProductView = ({ product, categories }) => {
  return (
    <div className="single-product-view w-[100%] min-h-[90vh] bg-white p-8 rounded-2xl my-8 mx-auto relative md:w-[70%]">
      <BackArrow to="/dashboard/seller/products" />
      <ProductCard product={product} categories={categories} />
    </div>
  );
};

export default SingleProductView;
