'use client'
import AktivGroteskText from '@/components/common/AktivGroteskText'
import MobileTempNavBar from '@/components/common/MobileTempNavBar'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import HallOfLameLeaderboardTable from '@/components/HallOfLameLeaderboardTable'
import useWindowWidth from '@/hooks/useWindowWidth'
import React, { useState, useEffect } from 'react'
import { useCMSData } from '@/data'
import { useGetHallOfLames } from '@/api/hooks/GluedinHooks'
import { IHallOfLameData } from '@/types'

const HallOfLameLeaderboard = () => {
  const width = useWindowWidth()
  const [mounted, setMounted] = useState(false)
  const cmsData = useCMSData(mounted)
  const [offset, setOffset] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [data, setData] = useState<IHallOfLameData[]>([])
  const [toDate, setToDate] = useState<number>(0)
  const [fromDate, setFromDate] = useState<number>(0)
  const { data: hallOfLameData } = useGetHallOfLames({
    offset,
    limit: 5,
    toDate,
    fromDate
  })

  useEffect(() => {
    if (toDate && fromDate) {
      setOffset(1)
    }
  }, [toDate, fromDate])

  useEffect(() => {
    if (hallOfLameData?.ok) {
      const { data, totalPages } = hallOfLameData?.data as unknown as {
        data: IHallOfLameData[]
        totalPages: number
      }
      const newTotalPages = Math.ceil(totalPages / 5)
      setData(data)
      setTotalPages(newTotalPages)
    }
  }, [hallOfLameData])

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className='flex flex-col gap-3'>
      <MobileTempNavBar
        title={cmsData.hallOfLame.hallOfLameHeader}
        subtitle={cmsData.hallOfLame.hallOfLameSubHeading}
      />
      <ScreenWrapper
        className={`${width > 750 ? 'mt-[71px] flex justify-center' : 'mt-0'}`}
      >
        <div className='flex flex-col gap-[16.1px]'>
          <div className='md:flex md:flex-col justify-center items-center md:mt-[37px] md:mb-[8px] gap-[12px] hidden'>
            <AktivGroteskText
              text={cmsData.hallOfLame.hallOfLameHeader}
              fontSize='text-[30px]'
              fontWeight='font-[700]'
            />
            <AktivGroteskText
              text={cmsData.hallOfLame.hallOfLameSubHeading}
              fontSize='text-[20px]'
              fontWeight='font-[400]'
            />
          </div>
          <HallOfLameLeaderboardTable
            weeklyTopJokes={cmsData.hallOfLame.weaklyTopJokes}
            prevButtonText={`Prev`}
            data={data}
            setOffset={setOffset}
            nextButtonText={cmsData.hallOfLame.nextButtonText}
            rank={cmsData.hallOfLame.rankHeading}
            jokes={cmsData.hallOfLame.jokesHeading}
            votes={cmsData.hallOfLame.votesHeading}
            totalPages={totalPages}
            offset={offset}
            setToDate={setToDate}
            setFromDate={setFromDate}
            fromDate={fromDate}
            toDate={toDate}
          />
        </div>
      </ScreenWrapper>
    </div>
  )
}

export default HallOfLameLeaderboard
