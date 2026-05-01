import { useState } from 'react';

interface UsePaginationReturn {
  currentPage: number;
  handlePageChange: (page: number) => void;
  resetPage: () => void;
}

const usePagination = (initialPage: number = 1): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    handlePageChange,
    resetPage,
  };
};

export default usePagination;