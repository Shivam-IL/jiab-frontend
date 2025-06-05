import React, { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel'

export interface CarouselItemData {
  id: string
  name: string
  icon: string // StaticImageData or string
  onClick?: () => void
}

interface CustomCarouselProps {
  items?: CarouselItemData[]
  children?: React.ReactNode[]
  childArray?: React.ReactNode[]
  totalItems?: number
  className?: string
  showDots?: boolean
  mobileItemsPerPage?: number
  desktopItemsPerPage?: number
  itemClassName?: string
  iconSize?: {
    mobile: { width: number; height: number }
    desktop: { width: number; height: number }
  }
  containerSize?: {
    mobile: string
    desktop: string
  }
  textSize?: {
    mobile: string
    desktop: string
  }
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  items,
  children,
  childArray,
  totalItems,
  className = '',
  showDots = true,
  mobileItemsPerPage = 4,
  desktopItemsPerPage = 6,
  itemClassName = '',
  iconSize = {
    mobile: { width: 40, height: 40 },
    desktop: { width: 80, height: 80 }
  },
  containerSize = {
    mobile: 'w-16 h-16',
    desktop: 'md:w-[120px] md:h-[120px]'
  },
  textSize = {
    mobile: 'text-xs',
    desktop: 'md:text-lg'
  }
}) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(desktopItemsPerPage)

  // Determine what content to render
  const contentToRender = childArray || children || items || []
  const contentLength = totalItems || contentToRender.length || 0

  // Handle responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(mobileItemsPerPage)
      } else {
        setItemsPerPage(desktopItemsPerPage)
      }
    }

    // Initial check
    handleResize()

    // Add resize listener
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileItemsPerPage, desktopItemsPerPage])

  // Calculate page count
  useEffect(() => {
    setPageCount(Math.ceil(contentLength / itemsPerPage))
  }, [itemsPerPage, contentLength])

  // Handle carousel selection
  useEffect(() => {
    if (!api) {
      return
    }

    api.on('select', () => {
      const selectedIndex = api.selectedScrollSnap()
      const lastPage = Math.ceil(contentLength / itemsPerPage) - 1

      // Check if we're at or near the end of the carousel
      if (selectedIndex >= contentLength - itemsPerPage) {
        setCurrent(lastPage)
      } else {
        setCurrent(Math.floor(selectedIndex / itemsPerPage))
      }
    })
  }, [api, itemsPerPage, contentLength])

  // Function to navigate to a specific page
  const goToPage = (pageIndex: number) => {
    if (!api) return
    api.scrollTo(pageIndex * itemsPerPage)
  }

  // Render custom children (your preferred approach)
  const renderCustomChildren = () => {
    if (childArray) {
      return childArray.map((child, index) => (
        <CarouselItem
          key={index}
          className={`basis-1/${mobileItemsPerPage} md:basis-1/${desktopItemsPerPage} ${itemClassName}`}
        >
          <div
            className='h-full'
            style={{
              width: `${100 / (totalItems || childArray.length)}%`,
              flexShrink: 0
            }}
          >
            {child}
          </div>
        </CarouselItem>
      ))
    }

    if (children) {
      return React.Children.map(children, (child, index) => (
        <CarouselItem
          key={index}
          className={`basis-1/${mobileItemsPerPage} md:basis-1/${desktopItemsPerPage} ${itemClassName}`}
        >
          <div className='h-full'>{child}</div>
        </CarouselItem>
      ))
    }

    return null
  }

  console.log(itemsPerPage, 'itemsPerPage')

  return (
    <div className={`space-y-3 ${className}`}>
      <Carousel
        className=''
        setApi={setApi}
        opts={{
          align: 'start',
          loop: false,
          skipSnaps: true
        }}
      >
        <CarouselContent>{renderCustomChildren()}</CarouselContent>
      </Carousel>

      {/* Navigation dots - page based */}
      {showDots && pageCount > 1 && (
        <div className='flex justify-center gap-[10px]'>
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === current ? 'w-[24px] bg-black' : 'w-[12px] bg-gray-300'
              }`}
              onClick={() => goToPage(index)}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomCarousel
