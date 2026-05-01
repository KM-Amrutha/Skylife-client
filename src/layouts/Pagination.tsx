import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  isLoading,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | '...')[] => {
    const pages: (number | '...')[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);
    if (currentPage > 3) pages.push('...');

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-1.5">

      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || isLoading}
        className={`text-xs font-medium px-2 transition-all duration-200
          ${currentPage > 1 && !isLoading
            ? 'text-slate-300 hover:text-white cursor-pointer'
            : 'text-slate-600 cursor-not-allowed'
          }`}
      >
        ‹ Prev
      </button>

      {/* Divider */}
      <span className="text-slate-700 text-xs">|</span>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) =>
        page === '...' ? (
          <span
            key={`ellipsis-${index}`}
            className="w-7 h-7 flex items-center justify-center text-slate-500 text-xs"
          >
            ···
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            disabled={isLoading}
            className={`
              w-7 h-7 rounded-lg text-xs font-semibold transition-all duration-200
              ${currentPage === page
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
          >
            {page}
          </button>
        )
      )}

      {/* Divider */}
      <span className="text-slate-700 text-xs">|</span>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || isLoading}
        className={`text-xs font-medium px-2 transition-all duration-200
          ${currentPage < totalPages && !isLoading
            ? 'text-slate-300 hover:text-white cursor-pointer'
            : 'text-slate-600 cursor-not-allowed'
          }`}
      >
        Next ›
      </button>

    </div>
  );
};

export default Pagination;