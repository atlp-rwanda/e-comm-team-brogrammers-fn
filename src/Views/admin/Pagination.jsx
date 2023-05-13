/* eslint-disable react/no-array-index-key */
/* eslint-disable no-else-return */
/* eslint-disable react/button-has-type */
import React from 'react';

function Pagination({ users, handlePageChange }) {
  const isFirstPage = users.currentPage === 1;
  const isLastPage =
    users.currentPage === Math.ceil(users.data.length / users.rowsPerPage);

  return (
    <div className="pagination">
      <button
        onClick={() => !isFirstPage && handlePageChange(users.currentPage - 1)}
        disabled={isFirstPage}
      >
        Previous
      </button>
      {Array(Math.ceil(users.data.length / users.rowsPerPage))
        .fill()
        .map((_, index) => {
          const minPage = Math.max(users.currentPage - 1, 1);
          const maxPage = Math.min(
            users.currentPage + 1,
            Math.ceil(users.data.length / users.rowsPerPage)
          );
          const showLeftEllipsis = minPage > 1;
          const showRightEllipsis =
            maxPage < Math.ceil(users.data.length / users.rowsPerPage);
          if (
            index + 1 === 1 ||
            index + 1 === Math.ceil(users.data.length / users.rowsPerPage) ||
            (index + 1 >= minPage && index + 1 <= maxPage)
          ) {
            return (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={users.currentPage === index + 1 ? 'active' : ''}
                style={{ marginLeft: '5px', marginRight: '5px' }}
              >
                {index + 1}
              </button>
            );
          } else if (
            (index + 1 === minPage - 1 && showLeftEllipsis) ||
            (index + 1 === maxPage + 1 && showRightEllipsis)
          ) {
            return (
              <span
                key={index}
                style={{ marginLeft: '5px', marginRight: '5px' }}
              >
                ...
              </span>
            );
          }
          return null;
        })}
      <button
        onClick={() => !isLastPage && handlePageChange(users.currentPage + 1)}
        disabled={isLastPage}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
