import React from 'react'
import './Pagination.css'
const Pagination = ({ articlesPerPage, totalArticles, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
      pageNumbers.push(i);
    }
  return (
    <div>
        <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="#!" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
    </div>
  )
}

export default Pagination