import React from "react";
import Table from "./Table.js";
import BackArrow from "./BackArrow.js";
import emptySet from "../../img/images";
const ProductsTable = ({ products, categories }) => {
  return (
    <div className="products-table box-border w-[100%] min-h-[90vh] bg-white p-8 rounded-2xl my-8 mx-auto relative lg:w-[70%]">
      <BackArrow to="/" />

      {products.length > 0 ? (
        <Table products={products} categories={categories} />
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <img
            src={emptySet}
            alt="empty-set-icon"
            className="w-52 h-52 opacity-70"
          />
          <h1 className="font-bold text-5xl text-primary mb-4">
            No products yet
          </h1>
          <p className="font-bold text-xl opacity-60">
            You need to add products first
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductsTable;
