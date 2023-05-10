/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchProducts from '../redux/features/actions/products';
import ProductItem from './ProductItem';

function ProductList() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products);

  const products = product.products.results;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleCustomPage = (id) => {
    setCurrentPage(id);
  };
  const getPageNumbers = () => {
    const buttons = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= Math.min(3, product.products.totalPages); i++) {
      buttons.push(
        <button
          type="button"
          key={i}
          id={i}
          className={`btn-number ${currentPage === i ? 'active' : ''}`}
          onClick={() => handleCustomPage(i)}
        >
          {i}
        </button>
      );
    }

    // add dots between page 3 and 6
    if (product.products.totalPages > 6) {
      buttons.push(<span key="dots-start">...</span>);

      for (
        let i = Math.max(4, currentPage - 1);
        i <= Math.min(currentPage + 1, 6);
        // eslint-disable-next-line no-plusplus
        i++
      ) {
        buttons.push(
          <button
            type="button"
            key={i}
            id={i}
            className={`btn-number ${currentPage === i ? 'active' : ''}`}
            onClick={() => handleCustomPage(i)}
          >
            {i}
          </button>
        );
      }
      buttons.push(<span key="dots-end">...</span>);
    }

    for (
      let i = Math.max(product.products.totalPages - 2, 4);
      i <= product.products.totalPages;
      // eslint-disable-next-line no-plusplus
      i++
    ) {
      buttons.push(
        <button
          type="button"
          key={i}
          id={i}
          className={`btn-number ${currentPage === i ? 'active' : ''}`}
          onClick={() => handleCustomPage(i)}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="product-list">
      <div className="product">
        {products &&
          Array.isArray(products) &&
          products.map((item) => <ProductItem product={item} key={item.id} />)}
      </div>

      <div className="pages">
        {currentPage > 1 ? (
          <button type="button" className="b2" onClick={handlePrevPage}>
            {' '}
            Previous
          </button>
        ) : (
          <button
            type="button"
            className="b2"
            style={{
              color: 'grey',
              cursor: 'not-allowed',
              ':hover': { color: 'grey', cursor: 'not-allowed' },
            }}
          >
            {' '}
            Previous
          </button>
        )}

        {getPageNumbers()}

        <button
          type="button"
          className="b2"
          onClick={handleNextPage}
          data-testid="next-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductList;
