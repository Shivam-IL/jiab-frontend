import React from 'react'
import SvgIcons from '../common/SvgIcons'
import { ICONS_NAMES } from '@/constants'

interface ComiCoinPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

const ComiCoinPagination: React.FC<ComiCoinPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}) => {
  // Calculate which page numbers to show
  const getVisiblePages = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      // If total pages is 5 or less, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Calculate start and end of visible pages
      let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
      const end = Math.min(totalPages, start + maxVisible - 1)
      
      // Adjust start if we're near the end
      if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }
    
    return pages
  }

  const visiblePages = getVisiblePages()

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePageClick = (page: number) => {
    onPageChange(page)
  }

  if (totalPages < 1) {
    return null
  }

  return (
    <div className={`flex items-center justify-center gap-2  ${className}`}>
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className='flex items-center justify-center  rounded-full transition-all duration-200 text-sm font-medium'
        aria-label="Previous page"
      >
        <SvgIcons name={ICONS_NAMES.ARROW} className='w-[11px] h-[13px]' />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`flex items-center font-[500] justify-center md:w-[24px] w-[20px] md:h-[24px] h-[20px] rounded-[4px] transition-all duration-200 md:text-[20px] text-[12px]  ${
              page === currentPage
                ? 'bg-black text-white'
                : 'bg-transparent'
            }`}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className='flex items-center justify-center  rounded-full transition-all duration-200 text-sm font-medium'
        aria-label="Next page"
      >
        <SvgIcons name={ICONS_NAMES.ARROW} className='rotate-180 w-[11px] h-[13px]'  />
      </button>
    </div>
  )
}

export default ComiCoinPagination
