import React from 'react'
import Image from 'next/image'
import useAppSelector from '@/hooks/useSelector'

interface ContestFlatCardProps {
  icon: string
  title: string
  reward: number
  rewardText: string
  className?: string
  onClick?: () => void
}

const ContestFlatCard: React.FC<ContestFlatCardProps> = ({
  icon,
  title,
  reward,
  rewardText,
  className = '',
  onClick
}) => {
  const { selectedLanguage } = useAppSelector(state => state.language)
  return (
    <div
      className={`bg-white rounded-[4px]  md:py-[15px] md:px-[13px] p-[6px] flex items-center md:gap-[10px] gap-[10px] shadow-sm ${
        onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''
      } ${className}`}
      onClick={onClick}
    >
      {/* Icon Container */}
      <div className='bg-green rounded-[4px] flex-shrink-0 flex items-center justify-center md:max-h-[117px] md:min-h-[117px]  h-[48px] min-h-[48px]  md:max-w-[107.19px] md:min-w-[107.19px]  max-w-[48px] min-w-[48px]'>
        <Image
          src={icon}
          alt={title}
          width={40}
          height={40}
          className={
            icon.includes('unique.svg')
              ? 'md:w-[85.38px] w-[41px] md:h-[77px] h-[32px]'
              : 'md:w-[75.17px] w-[35.13px] md:h-[80.47px] h-[36px]'
          }
        />
      </div>

      {/* Content */}
      <div className='flex-1 flex flex-col md:gap-[16px] gap-[4px]'>
        <h3
          className={`text-black ${
            selectedLanguage === 'ta'
              ? 'xxs:text-[6px] md:text-[16px] lg:text-[16px] xl:text-[16px] 2xl:text-[16px] text-[9px] break-all'
              : 'md:text-[20px] text-[10px]'
          }  md:leading-[24px] leading-[14px] font-bold`}
        >
          {title}
        </h3>
        <div className={`flex  gap-1 ${
              selectedLanguage === 'ta'
                ? 'items-start'
                : 'items-center'
            }`}>
          <div className={`flex items-center justify-center`}>
            <img
              src='/assets/images/coin-final-sidebar.svg'
              alt='coin'
              width={31}
              height={31}
              className='md:w-[31px] md:h-[31px] w-[14px] h-[14px]'
            />
          </div>
          <span
            className={`text-[#313131] ${
              selectedLanguage === 'ta' ? 'xl:text-[13px] 2xl:text-[13px] lg:text-[13px] md:text-[13px] text-[7px] xxs:text-[5px]' : 'md:text-[16px] text-[7px]'
            } font-medium`}
          >
            <span className='font-bold text-black'>{reward}</span> {rewardText}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ContestFlatCard
