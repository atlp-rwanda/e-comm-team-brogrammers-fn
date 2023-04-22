import React, { useState, useEffect } from 'react';
import ProductList from '../components/productList';
import product from '../components/products';
import SearchBox from '../components/search';
// import '../components/ProductList.css';

function getProducts() {
  const [setProducts] = useState([]);

  useEffect(() => {
    fetch('/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <SearchBox className="searchProduct" />
      <ProductList products={product} />
    </div>
  );
}

export default getProducts;
