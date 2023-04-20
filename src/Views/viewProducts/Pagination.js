import React from "react";
// import "./pagination.scss";
const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  paginateNext,
  paginatePrev,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination my-6">
      <nav>
        <ul className="flex items-center">
          <li className="py-1 px-3 flex justify-center items-center bg-[#dbdada] ml-2 font-semibold transition-all hover:bg-secondary">
            <a href="#" onClick={() => paginatePrev()}>
              Prev
            </a>
          </li>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`py-1 px-3 flex justify-center items-center bg-[#dbdada] ml-2 font-semibold transition-all hover:bg-secondary
                 ${number === currentPage ? "active" : "inactive"}`}
            >
              <a href="#" onClick={() => paginate(number)}>
                {number}
              </a>
            </li>
          ))}
          <li className="py-1 px-3 bg-[#dbdada] ml-2 font-semibold transition-all hover:bg-secondary">
            <a href="#" onClick={() => paginateNext()}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
