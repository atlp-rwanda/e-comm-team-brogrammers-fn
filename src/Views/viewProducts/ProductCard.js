import React from "react";
import StarRating from "./StarRating.js";
import Images from "./Images.js";
import Categorize from "./Categorize.js";
import SmallTable from "./SmallTable.js";
import {
  formatDate,
  formatString,
  formatExpired,
} from "../../helpers/Format";

const ProductCard = ({ product, categories }) => {
  const { images } = product;
  if (images) {
    return (
      <div className="product-card p-5 bg-whiteColor mx-auto rounded-md shadow flex flex-col justify-center items-center lg:flex-row lg:items-center lg:max-h-[70vh]">
        <div className="w-1/4 flex justify-center items-start sm:w-1/2 sm:mx-auto">
          <Images images={images} />
        </div>
        <div className="w-full lg:w-1/2">
          <div>
            <div className=" flex justify-between">
              <h1 className="sm:text-3xl text-2xl font-semibold mb-3">
                {product.name}
              </h1>
              <span className="bg-primary text-white text-center px-3 py-1 rounded-xl text-lg max-w-44 font-semibold leading-5 h-8 mx-10">
                {formatExpired(product.expired)}
              </span>
            </div>
            <h2 className="text-lg font-semibold">
              Category:{" "}
              <span className="text-primary">
                <Categorize id={product.categoryId} categories={categories} />
              </span>
            </h2>
            <div className="grid grid-cols-2 justify-around">
              <h2 className="text-lg font-semibold">
                Quantity:{" "}
                <span className="text-primary">{product.quantity}</span>
              </h2>
              <h2 className="text-lg font-semibold">
                Availability:{" "}
                <span className="text-primary">
                  {formatString(product.available.toString())}
                </span>
              </h2>
              <h2 className="text-lg font-semibold">
                Price: <span className="text-primary">${product.price}</span>
              </h2>
              <h2 className="text-lg font-semibold">
                Bonus: <span className="text-primary">{product.bonus}</span>
              </h2>
            </div>
          </div>
          <div className="my-4">
            <SmallTable
              headers={["Created At", "Last Update", "Date Of Expiration"]}
              data={[
                {
                  one: formatDate(product.createdAt),
                  two: formatDate(product.updatedAt),
                  three: formatDate(product.expiryDate),
                },
              ]}
            />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Ratings</h1>
            <p className="text-2xl font-semibold">
              <span className="rating-number mr-3">4.5</span>
              <StarRating rating={4.5} />
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductCard;
