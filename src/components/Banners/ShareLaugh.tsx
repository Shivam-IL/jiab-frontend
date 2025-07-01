import React from 'react'
import Image from 'next/image'
import useAppSelector from '@/hooks/useSelector'

const ShareLaugh: React.FC<{
  onClick: () => void
  heading: string
  buttonText: string
}> = ({ heading, buttonText, onClick }) => {
  // Function to split heading into two lines for consistent formatting
  const formatHeading = (text: string) => {
    const words = text.trim().split(' ')
    if (words.length <= 1) {
      return { line1: text, line2: '' }
    }

    // Split roughly in the middle for balanced lines
    const midPoint = Math.ceil(words.length / 2)
    const line1 = words.slice(0, midPoint).join(' ')
    const line2 = words.slice(midPoint).join(' ')

    return { line1, line2 }
  }

  const { line1, line2 } = formatHeading(heading)
  const { selectedLanguage } = useAppSelector(state => state.language)

  return (
    <div className='relative w-full'>
      {/* Background Image */}
      <Image
        src='/assets/images/share-a-laugh.svg'
        alt='share-laugh'
        className='w-full h-auto'
        width={1200}
        height={400}
        priority
      />

      {/* Content Overlay */}
      <div className='absolute inset-0 flex items-center justify-end pr-4 md:pr-8 lg:pr-12 xl:pr-16 2xl:pr-20'>
        {/* Right Side Content Container */}
        <div className='flex flex-col items-center justify-center gap-[6px] md:gap-6 lg:gap-8'>
          {/* Heading - Dynamic with consistent two-line format */}
          <div className='text-center max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[500px] 2xl:max-w-[600px]'>
            <h1
              className={`text-black ${
                selectedLanguage === 'ta'
                  ? 'xl:text-[32px] 2xl:text-[32px] lg:text-[28px] md:text-[22px] text-[14px] xxs:text-[10px]'
                  : 'sm:text-[20px]  md:text-[28px] lg:text-[36px] xl:text-[44px] 2xl:text-[60px]   text-[20px]'
              }
               font-bold italic uppercase leading-[20px]
              sm:leading-[24px]
             md:leading-[32px]
               lg:leading-[40px]
              xl:leading-[48px]
               2xl:leading-[64px]`}
            >
              {line1}
              {line2 && (
                <>
                  <br />
                  {line2}
                </>
              )}
            </h1>
          </div>

          {/* Button */}
          <div>
            <button
              onClick={onClick}
              className={`bg-green text-white font-bold rounded-full 
                transition-all duration-200 hover:bg-green-600 active:scale-95
                px-[16px] py-[8px] text-[12px]
                sm:px-[20px] sm:py-[10px] sm:text-[12px]
                md:px-[28px] md:py-[14px] md:text-[16px]
                lg:px-[36px] lg:py-[18px] lg:text-[20px]
                xl:px-[44px] xl:py-[22px] xl:text-[24px]
                2xl:px-[52px] 2xl:py-[26px] 2xl:text-[28px]`}
            >
              <span className='whitespace-nowrap'>{buttonText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareLaugh
