/* eslint-disable no-plusplus */
import React from 'react';

function PaginationButtons({ currentPage, setCurrentPage, totalPages }) {
  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const handleCustomPage = (id) => {
    setCurrentPage(id);
  };
  const getPageNumbers = ({ pages }) => {
    const buttons = [];
    for (let i = 1; i <= Math.min(3, pages); i++) {
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

    if (pages > 6) {
      buttons.push(<span key="dots-start">...</span>);

      for (
        let i = Math.max(4, currentPage - 1);
        i <= Math.min(currentPage + 1, 6);
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

    for (let i = Math.max(pages - 2, 4); i <= pages; i++) {
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
    <div className="pages">
      {currentPage > 1 ? (
        <button
          type="button"
          className="b2"
          onClick={handlePrevPage}
          data-testid="prev-button"
        >
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

      {getPageNumbers({ pages: totalPages })}

      <button
        type="button"
        className="b2"
        onClick={handleNextPage}
        data-testid="next-button"
      >
        Next
      </button>
    </div>
  );
}

export default PaginationButtons;
