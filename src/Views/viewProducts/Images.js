import React from "react";
import { useSelector } from "react-redux";

const Images = ({ images }) => {
  if (images) {
    return (
      <div className="p-5 w-80 flex flex-col justify-between items-center sm:w-1/2 sm:mx-auto md:justify-center lg:w-full">
        <div className="w-64 image-bg bg-white h-[25vh] flex justify-center items-center overflow-hidden p-5 rounded-lg">
          <img
            src={images[0]}
            alt="product-image"
            className="w-56 p-5 md:w-72"
          />
        </div>
        <div className="w-72 flex justify-center items-center">
          <div className="flex justify-center items-center sm:w-24 w-16 h-24 m-1 bg-white overflow-hidden rounded-lg">
            <img src={images[1]} alt="product-image" className="w-24" />
          </div>
          <div className="flex justify-center items-center sm:w-24 w-16 h-24 m-1 bg-white overflow-hidden rounded-lg">
            <img src={images[2]} alt="product-image" className="w-24" />
          </div>
          <div className="flex justify-center items-center sm:w-24 w-16 h-24 m-1 bg-white overflow-hidden rounded-lg">
            <img src={images[3]} alt="product-image" className="w-24" />
          </div>
        </div>
        {/* </div> */}
      </div>
    );
  }
};

export default Images;
