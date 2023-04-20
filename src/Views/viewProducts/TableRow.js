import React from "react";
import Categorize from "./Categorize.js";
import { formatDate, formatString } from "../../helpers/Format";
import { useNavigate } from "react-router";
const TableRow = ({ products, categories }) => {
  const navigate = useNavigate();
  return (
    <>
      {products.map((product) => (
        <tr
          key={product.id}
          onClick={() => navigate(`/dashboard/seller/products/${product.id}`)}
          className={`transition-all ease-in duration-75 hover:cursor-pointer hover:bg-gray-200 ${
            products.indexOf(product) % 2 != 0 ? `bg-gray-100` : `bg-white`
          }`}
        >
          <td className="p-3 text-sm tracking-wide text-center flex ml-3">
            <img
              src={product.images[0]}
              alt=""
              className="w-6 rounded-lg mr-3 h-6"
            />{" "}
            <span>{product.name}</span>
          </td>
          <td className="hidden sm:table-cell p-3 text-sm tracking-wide text-center">
            {formatString(product.available.toString())}
          </td>
          <td className="hidden sm:table-cell p-3 text-sm tracking-wide text-center">
            ${product.price}
          </td>
          <td className="hidden sm:table-cell p-3 text-sm tracking-wide text-center">
            {formatDate(product.expiryDate)}
          </td>
          <td className="hidden sm:table-cell p-3 text-sm tracking-wide text-center">
            {formatString(product.expired.toString())}
          </td>
          <td className="p-3 text-sm tracking-wide text-center">
            <Categorize id={product.categoryId} categories={categories} />
          </td>
          <td className="p-3 text-sm tracking-wide text-center flex justify-evenly">
            <i className="fa fa-edit fa-lg text-[#1976D2] hover:scale-125"></i>
            <i className="fa fa-trash fa-lg text-[#D23D4F] hover:scale-125"></i>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableRow;
