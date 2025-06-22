// 'use client';

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
    pageCount: number;
    currentPage: number;
    onPageChange: (selected: number) => void;
}

export default function Pagination({
    currentPage,
    pageCount,
    onPageChange,
  }: PaginationProps) {
  return (
    <ReactPaginate
      previousLabel={'←'}
      nextLabel={'→'}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={5}
      onPageChange={(selectedItem: { selected: number }) => onPageChange(selectedItem.selected + 1)}
      forcePage={currentPage - 1} 
      containerClassName={css.pagination}
      activeClassName={css.active}

    />
    
  );
}

