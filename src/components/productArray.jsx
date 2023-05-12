/* eslint-disable react/no-array-index-key */
import React from 'react';
import ProductItem from './productitem';
import Card1 from './loaders/card1';

export default function ProductsArray({ products = [], loading }) {
  if (loading || !products || !Array.isArray(products))
    return [...Array(6)].map((_a, b) => <Card1 key={b} />);

  if (products.length === 0) return <h3>No results found...</h3>;

  return products.map((item) => <ProductItem product={item} key={item.id} />);
}
