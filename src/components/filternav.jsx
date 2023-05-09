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

  const search = () => {
    dispatch(searchThunk(searchForm));
    navigate({
      pathname: '/products',
      search: `?${createSearchParams(removeEmpty(searchForm))}`,
    });
  };

  useEffect(() => {
    search();
  }, [searchForm.category]);

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
            <li className="active">All Price</li>
            <li>$0 - $100</li>
            <li>$100 - $1000</li>
            <li>$1000 - $5000</li>
            <li>custom</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default FilterNav;
