'use client'

import AktivGroteskText from '@/components/common/AktivGroteskText'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import UgcComponent from '@/components/UgcComponent'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MadeYouLaughExitPopup } from '@/components/ExitPopUps'
import UgcFilter from '@/components/common/UgcFilter'
import { useCMSData } from '@/data'
import {
  useGetGluedinFeedList,
  useViewGludeinJokes
} from '@/api/hooks/GluedinHooks'
import { updateUgcData, updateUgcViewData } from '@/store/ugc'
import { REDUX_UPDATION_TYPES } from '@/constants'
import useAppDispatch from '@/hooks/useDispatch'
import useAppSelector from '@/hooks/useSelector'

const UserGeneratedJokes = () => {
  const router = useRouter()
  const [isUnmounting, setIsUnmounting] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dispatch = useAppDispatch()
  const { ugcData, offset, limit, ugcFilters, filterChnageId, loadMore } =
    useAppSelector(state => state.ugc)
  const { data: gluedinFeedList } = useGetGluedinFeedList({
    offset,
    limit,
    ...ugcFilters,
    filterChnageId: filterChnageId ? filterChnageId : undefined
  })
  const { mutate: viewGludeinJokes, data: viewGludeinJokesData } =
    useViewGludeinJokes()

  console.log('ugcFilters', ugcFilters)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cmsData = useCMSData(mounted)

  useEffect(() => {
    return () => {
      setIsUnmounting(true)
    }
  }, [])

  useEffect(() => {
    if (gluedinFeedList?.ok) {
      const assetIds = gluedinFeedList?.data?.map((item: any) => item?.videoId)
      viewGludeinJokes({ assetIds })
      dispatch(
        updateUgcData({
          type: filterChnageId
            ? loadMore
              ? REDUX_UPDATION_TYPES.MULTIPLE_ADDED
              : REDUX_UPDATION_TYPES.REPLACED
            : REDUX_UPDATION_TYPES.MULTIPLE_ADDED,
          ugcData: gluedinFeedList?.data
        })
      )
    }
  }, [gluedinFeedList, filterChnageId])

  useEffect(() => {
    if (viewGludeinJokesData?.ok) {
      const { data } = viewGludeinJokesData ?? {}
      dispatch(updateUgcViewData({ assetIds: data }))
    }
  }, [viewGludeinJokesData])

  return (
    <ScreenWrapper>
      <div>
        <div className='flex flex-col gap-[4px] md:gap-[12px]'>
          <div className='flex justify-between items-center'>
            <AktivGroteskText
              fontSize='text-[16px] md:text-[30px] uppercase'
              fontWeight='font-[700]'
              text={cmsData?.jokeBox?.jokeBoxHeading}
            />
            <button onClick={() => router.push('/hall-of-lame')}>
              <AktivGroteskText
                fontSize='text-[12px] md:text-[20px]'
                fontWeight='font-[400]'
                className='text-[#11A64B] '
                text={cmsData?.jokeBox?.hallOfLameNextPageSwitchText}
              />
            </button>
          </div>
          <div className='flex flex-col md:flex-row justify-between gap-[16px] md:gap-0'>
            <AktivGroteskText
              fontSize='text-[12px] md:text-[20px]'
              fontWeight='font-[400]'
              text={cmsData?.jokeBox?.jokeBoxSubHeading}
            />
            <UgcFilter filter={cmsData?.jokeBox?.filter} />
          </div>
        </div>
        <UgcComponent jokesData={ugcData} />
      </div>
      {isUnmounting && (
        <MadeYouLaughExitPopup
          open={isUnmounting}
          onClose={() => {
            setIsUnmounting(false)
          }}
        />
      )}
    </ScreenWrapper>
  )
}

export default UserGeneratedJokes
