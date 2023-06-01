import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import fetchProducts from '../redux/features/actions/products';
import { setSearchParams } from '../redux/features/slices/searchslice';
import searchThunk from '../redux/features/actions/search';
import PaginationButtons from './paginationbuttons';
import ProductsArray from './productArray';
import { Rwf } from '../helpers/currency';

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { products: allProduct, status } = useSelector(
    (state) => state.products
  );
  const [q, setQ] = useState(undefined);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [category, setCategory] = useState(undefined);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageChange, setPageChange] = useState(false);

  useEffect(() => {
    if ((q || min || max || category) && pageChange) {
      setPageChange(false);
      dispatch(setSearchParams({ q, min, max, category }));
      dispatch(searchThunk({ q, min, max, category, page: currentPage }));
    }
  }, [q, min, max, category, pageChange]);

  useEffect(() => {
    if (
      !(
        searchParams.get('q') ||
        searchParams.get('min') ||
        searchParams.get('max') ||
        searchParams.get('category')
      )
    ) {
      setQ(undefined);
      setMin(undefined);
      setMax(undefined);
      setCategory(undefined);
      dispatch(fetchProducts(currentPage));
      return;
    }
    setQ(searchParams.get('q'));
    setMin(searchParams.get('min'));
    setMax(searchParams.get('max'));
    setCategory(searchParams.get('category'));
    setPageChange(true);
  }, [searchParams, currentPage]);

  const reset = useCallback(() => {
    dispatch(
      setSearchParams({
        q: undefined,
        min: undefined,
        max: undefined,
        category: undefined,
      })
    );
    navigate('/products');
  }, []);

  return (
    <section className="allProduct-list">
      <div className="head">
        <span>{category || 'All categories'}</span>
        {min && <span>minimum: {Rwf.format(min)}</span>}
        {max && <span>maximum: {Rwf.format(max)}</span>}
        <span>
          {allProduct?.totalCount !== 1
            ? `${allProduct?.totalCount || 0} results`
            : `${allProduct?.totalCount || 0} result`}
        </span>
        {(q || min || max || category) && (
          <button
            type="button"
            className="btn1"
            data-testid="reset-searched"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>
      <div className="list">
        <ProductsArray
          products={allProduct?.results}
          loading={status === 'loading'}
        />
      </div>
      <PaginationButtons
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={allProduct?.totalPages}
      />
    </section>
  );
}

export default ProductList;
