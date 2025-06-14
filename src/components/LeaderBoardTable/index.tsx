import React, { useEffect, useState } from 'react'
import AktivGroteskText from '../common/AktivGroteskText'
import { DAILY_WINNERS, ICONS_NAMES, IMAGES } from '@/constants'
import SvgIcons from '../common/SvgIcons'
import { aktivGrotesk } from '@/app/layout'
import { generateImageurl } from '@/utils'
import {  ISingleLeaderboardData } from '@/store/leaderboard'
import useAppSelector from '@/hooks/useSelector'
import SingleDateSelector from '../common/SingleDateSelector'

export const DisplayTable = ({
  data,
  myRank = false,
  rankData
}: {
  data: ISingleLeaderboardData[]
  myRank?: boolean
  rankData?: ISingleLeaderboardData
}) => {
  const [image, setImage] = useState('')
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const couponImage = generateImageurl(IMAGES.COUPON)
      console.log('couponImage', couponImage)
      setImage(couponImage)
    }
  }, [])
  return (
    <table className='w-full table-fixed border-separate border-spacing-y-[12px] md:border-spacing-y-[20px]'>
      <colgroup>
        <col className='w-[15%]' />
        <col className='w-[20%]' />
        <col className='w-[25%]' />
        <col className='w-[20%]' />
        <col className='w-[20%]' />
      </colgroup>
      <thead>
        <tr className={`border-none  bg-[#FFE200] ${myRank ? 'hidden' : ''}`}>
          <td
            className={`${aktivGrotesk.className} mb-[12px] text-[12px] md:text-[20px] font-[500] text-center py-[12px] md:py-[20px] pl-[12px] md:pl-[40px] rounded-l-[5px] md:rounded-l-[10px]`}
          >
            Rank
          </td>
          <td
            className={`${aktivGrotesk.className} mb-[12px] text-[12px] md:text-[20px] font-[500] text-center py-[12px] md:py-[20px]`}
          >
            Avatar
          </td>
          <td
            className={`${aktivGrotesk.className} mb-[12px] text-[12px] md:text-[20px] font-[500] text-center py-[12px] md:py-[20px]   `}
          >
            Mobile No
          </td>
          <td
            className={`${aktivGrotesk.className} mb-[12px] text-[12px] md:text-[20px] font-[500] text-center py-[12px] md:py-[20px]`}
          >
            Comic Coins
          </td>
          <td
            className={`${aktivGrotesk.className} mb-[12px] text-[12px] md:text-[20px] font-[500] text-center py-[12px] md:py-[20px]  pr-[12px] md:pr-[40px] rounded-r-[5px] md:rounded-r-[10px]`}
          >
            Prize
          </td>
        </tr>
      </thead>
      <tbody className='w-full relative'>
        {data?.length > 0 &&
          data?.map(item => (
            <tr
              key={item.user_id}
              className={`${
                myRank || rankData?.user_id === item.user_id
                  ? 'bg-[#C6E3D1]'
                  : 'bg-white'
              } border-none mt-[12px] relative`}
            >
              <td
                className={`${aktivGrotesk.className} overflow-hidden relative text-[12px] md:text-[16px] font-[400] text-center py-[12px] md:py-[19px] pl-[22px] md:rounded-l-[10px] rounded-l-[5px]`}
              >
                {item?.user_id === rankData?.user_id && (
                  <div className='h-[17px] md:h-[26px] w-[100px] md:w-[120px] bg-black absolute top-0  left-[-30px]  bottom-0 rotate-[135deg]'>
                    <AktivGroteskText
                      text='YOUR RANK'
                      fontSize='text-[5px] md:text-[7px]'
                      fontWeight='font-[700]'
                      className='text-[#FFE200] rotate-180 ml-5 md:ml-6'
                    />
                  </div>
                )}
                {item.user_rank}.
              </td>
              <td
                className={`min-h-full  relative font-[400]  md:py-[19px]  text-center py-[12px]`}
              >
                <div className='flex justify-center items-center'>
                  <div className='w-[24px] h-[24px]  md:w-[40px] md:h-[40px] flex flex-col justify-center items-center rounded-full bg-[#11A64B]'>
                    {item.avatar ? (
                      <img
                        src={item.avatar}
                        alt='avatar'
                        className='w-[24px] h-[24px] md:w-[40px] md:h-[40px] rounded-full object-cover'
                      />
                    ) : (
                      <SvgIcons
                        name={ICONS_NAMES.PROFILE}
                        className='md:w-[23px] md:h-[28px] w-[14px] h-[16px]'
                      />
                    )}
                  </div>
                </div>
              </td>
              <td
                className={`${aktivGrotesk.className} text-[12px] md:text-[16px] font-[400]  md:py-[19px]  text-center py-[12px]`}
              >
                xxxxxx{item.mobile?.slice(6)}
              </td>
              <td
                className={`${aktivGrotesk.className} text-[12px] md:text-[16px] font-[400]  md:py-[19px]  text-center py-[12px]`}
              >
                {item.coins}
              </td>
              <td
                className={`${aktivGrotesk.className} text-[12px] md:rounded-r-[10px]  font-[500] text-center py-[12px] pr-[22px] rounded-r-[5px]`}
              >
                <div className='flex justify-center items-center'>
                  {item.winner_reward?.image_url ? (
                    <img
                      src={item.winner_reward?.image_url}
                      alt='coupon'
                      className='w-[43px] h-[31px] md:w-[45px] md:h-[32px]'
                    />
                  ) : (
                    <img
                      src={image}
                      alt='coupon'
                      className='w-[43px] h-[31px] md:w-[45px] md:h-[32px]'
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

const LeaderBoardTable = () => {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false)
  const { my_rank, leaderboard } = useAppSelector(state => state.leaderboard)
  console.log('my_rank', my_rank)
  console.log('leaderboard', leaderboard)

  const handleDateSelect = (date: Date | undefined) => {
    console.log('Selected date:', date)
  }

  return (
    <div className='flex flex-col gap-[20px]'>
      <div className='flex justify-between md:justify-start items-center md:gap-[12px]'>
        <button
          className='outline-none md:block hidden border-none'
          onClick={() => setIsCalendarOpen(true)}
        >
          <SvgIcons
            name={ICONS_NAMES.CALENDAR2}
            className='w-[18px] h-[18px] md:w-[22px] md:h-[22px]'
          />
        </button>
        <AktivGroteskText
          text={DAILY_WINNERS}
          fontSize='text-[14px] md:text-[20px]'
          fontWeight='font-[500] md:font-[400]'
        />
        <button
          className='outline-none md:hidden border-none'
          onClick={() => setIsCalendarOpen(true)}
        >
          <SvgIcons
            name={ICONS_NAMES.CALENDAR2}
            className='w-[18px] h-[18px]'
          />
        </button>
        <SingleDateSelector 
          open={isCalendarOpen}
          setOpen={setIsCalendarOpen}
          onDateSelect={handleDateSelect}
        />
      </div>
      <div className='w-full flex flex-col gap-[28px] md:gap-[40px]'>
        <DisplayTable rankData={my_rank} data={leaderboard} />
        <div>
          <AktivGroteskText
            text='YOUR RANK'
            fontSize='text-[16px] md:text-[20px]'
            fontWeight='font-[700]'
          />
          <DisplayTable myRank={true} data={[my_rank]} />
        </div>
      </div>
    </div>
  )
}

export default LeaderBoardTable
