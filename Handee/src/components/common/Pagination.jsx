import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className="mt-12 flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
      {/* Previous Button */}
      <div className="-mt-px flex w-0 flex-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium ${
            currentPage === 1
              ? 'cursor-not-allowed text-gray-300'
              : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'
          }`}
        >
          <ArrowLongLeftIcon
            aria-hidden="true"
            className="mr-3 size-5 text-gray-400"
          />
          Previous
        </button>
      </div>

      {/* Page Numbers */}
      <div className="hidden md:-mt-px md:flex">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${
              page === currentPage
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium ${
            currentPage === totalPages
              ? 'cursor-not-allowed text-gray-300'
              : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'
          }`}
        >
          Next
          <ArrowLongRightIcon
            aria-hidden="true"
            className="ml-3 size-5 text-gray-400"
          />
        </button>
      </div>
    </nav>
  )
}
