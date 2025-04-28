
import React from 'react'
import './pagination.css'; 

const Pagination = ({currentPage,totalPages,onPageChange}) => {
    const getPageNumbers = () => {
        const pages = [];
    
        if (totalPages <= 5) {
          // If total pages are less than 5, show all
          for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          if (currentPage <= 3) {
            // Show first 3 pages + ... + last page
            pages.push(1, 2, 3, '...', totalPages);
          } else if (currentPage >= totalPages - 2) {
            // Show first page + ... + last 3 pages
            pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
          } else {
            // Show first page + ... + middle pages + ... + last page
            pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
          }
        }
    
        return pages;
      };
    
      const handleClick = (page) => {
        if (page !== '...') {
          onPageChange(page);
        }
      };
  return (
    <div className="pagination">
      <button 
        className="prev-pagination-btn pagination-btn-setting" 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {getPageNumbers().map((number) => (
        <button
          key={number}
          className={`pagination-btn pagination-btn-setting  ${currentPage === number ? 'active' : ''}`}
          onClick={() => handleClick(number)}
        >
          {number}
        </button>
      ))}

      <button 
        className="next-pagination-btn pagination-btn-setting" 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination


