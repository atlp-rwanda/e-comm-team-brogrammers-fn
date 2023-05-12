import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
import searchThunk from '../redux/features/actions/search';
import { setSearchParams } from '../redux/features/slices/searchslice';
import removeEmpty from '../helpers/removeEmpty';

function Searchbox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchForm } = useSelector((state) => state.search);

  const search = () => {
    dispatch(searchThunk(searchForm));
    navigate({
      pathname: '/products',
      search: `?${createSearchParams(removeEmpty(searchForm))}`,
    });
  };

  const submitSearch = useCallback(
    (e) => {
      e.preventDefault();
      search();
    },
    [searchForm]
  );

  return (
    <form className="search-box" onSubmit={submitSearch}>
      <input
        type="text"
        placeholder="Search Product"
        name="q"
        data-testid="search-input"
        required
        defaultValue={searchForm.q}
        onChange={(e) => dispatch(setSearchParams({ q: e.target.value }))}
      />
      <button type="submit" data-testid="button-search">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.7708 20.0833H21.3554L20.8538 19.5996C22.6096 17.5571 23.6667 14.9054 23.6667 12.0208C23.6667 5.58875 18.4529 0.375 12.0208 0.375C5.58875 0.375 0.375 5.58875 0.375 12.0208C0.375 18.4529 5.58875 23.6667 12.0208 23.6667C14.9054 23.6667 17.5571 22.6096 19.5996 20.8538L20.0833 21.3554V22.7708L29.0417 31.7113L31.7113 29.0417L22.7708 20.0833ZM12.0208 20.0833C7.55958 20.0833 3.95833 16.4821 3.95833 12.0208C3.95833 7.55958 7.55958 3.95833 12.0208 3.95833C16.4821 3.95833 20.0833 7.55958 20.0833 12.0208C20.0833 16.4821 16.4821 20.0833 12.0208 20.0833Z"
            fill="#888888"
          />
        </svg>
      </button>
    </form>
  );
}
export default Searchbox;
