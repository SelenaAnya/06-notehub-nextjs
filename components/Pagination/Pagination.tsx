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
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}

    />
    
  );
}

