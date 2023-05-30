import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
import categoriesThunk from '../redux/features/actions/categories';
import { setSearchParams } from '../redux/features/slices/searchslice';
import searchThunk from '../redux/features/actions/search';
import removeEmpty from '../helpers/removeEmpty';

function FilterNav() {
  const {
    categories: { categories },
    search: { searchForm },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(categoriesThunk());
  }, []);

  const filter = () => {
    dispatch(searchThunk(searchForm));
    navigate({
      pathname: '/products',
      search: `?${createSearchParams(removeEmpty(searchForm))}`,
    });
  };

  useEffect(() => {
    filter();
  }, [searchForm.category, searchForm.min, searchForm.max]);

  return (
    <nav className="filter-nav">
      <div>
        <div className="filter">
          <h3>Categories</h3>
          <ul>
            <li
              className={!searchForm.category ? 'active' : ''}
              aria-hidden
              onClick={() => dispatch(setSearchParams({ category: undefined }))}
            >
              All Categories
            </li>
            {categories.map((cat) => (
              <li
                className={
                  searchForm.category &&
                  searchForm.category.toLowerCase() === cat.title.toLowerCase()
                    ? 'active'
                    : ''
                }
                key={cat.id}
                aria-hidden
                onClick={() =>
                  dispatch(setSearchParams({ category: cat.title }))
                }
              >
                {cat.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="filter">
          <h3>Price</h3>
          <ul>
            <li
              className={!searchForm.min && !searchForm.max ? 'active' : ''}
              aria-hidden
              onClick={() =>
                dispatch(setSearchParams({ min: undefined, max: undefined }))
              }
            >
              All Price
            </li>
            <li
              className={
                !searchForm.min && Number(searchForm.max) === 100
                  ? 'active'
                  : ''
              }
              aria-hidden
              onClick={() => dispatch(setSearchParams({ min: 0, max: 100 }))}
            >
              0 - RWF 100
            </li>
            <li
              className={
                Number(searchForm.min) === 100 &&
                Number(searchForm.max) === 1000
                  ? 'active'
                  : ''
              }
              aria-hidden
              onClick={() => dispatch(setSearchParams({ min: 100, max: 1000 }))}
            >
              RWF 100 - RWF 1000
            </li>
            <li
              className={
                Number(searchForm.min) === 1000 &&
                Number(searchForm.max) === 5000
                  ? 'active'
                  : ''
              }
              aria-hidden
              onClick={() =>
                dispatch(setSearchParams({ min: 1000, max: 5000 }))
              }
            >
              RWF 1000 - RWF 5000
            </li>
            <li
              className={
                Number(searchForm.min) === 5000 && !searchForm.max
                  ? 'active'
                  : ''
              }
              aria-hidden
              onClick={() =>
                dispatch(setSearchParams({ min: 5000, max: undefined }))
              }
            >
              Above RWF 5000
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default FilterNav;
