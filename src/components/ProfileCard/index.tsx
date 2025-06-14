import React, { useEffect, useState } from 'react'
import SvgIcons from '../common/SvgIcons'
import {
  ICONS_NAMES,
  LOCAL_IMAGES,
  PROFILE_IMAGES,
  USER_INFO_CARD_DATA
} from '@/constants'
import Image from 'next/image'
import { CircularProgress } from '../common/CircularProgress'
import AktivGroteskText from '../common/AktivGroteskText'
import UserInfoCard from '../common/UserInfoCard'
import { useRouter } from 'next/navigation'
import { dateConvert, generateImageurl } from '@/utils'
import useWindowWidth from '@/hooks/useWindowWidth'
import useAppSelector from '@/hooks/useSelector'
import { User } from '@/store/profile/profile.slice'

interface InfoDataItem {
  id: number
  type: string
  iconName: string
  text: string
  visible: boolean
}

const ProfileCard = () => {
  const router = useRouter()

  const width = useWindowWidth()
  const [infoData, setInfoData] = useState<InfoDataItem[]>([])

  const { user } = useAppSelector(state => state.profile)
  const {
    name,
    phone_number,
    profile_percentage,
    profile_picture,
    id,
    userImage
  } = user

  const [bgImage, setBgImage] = useState<string>('')

  useEffect(() => {
    if (width < 768) {
      setBgImage(LOCAL_IMAGES.PROFILE_BG)
    } else {
      setBgImage(LOCAL_IMAGES.PROFILE_MD_BG)
    }
  }, [width])

  useEffect(() => {
    if (user && user?.id) {
      const newInfoData = USER_INFO_CARD_DATA.map(item => {
        const itemKey = item.type as keyof User
        const value = user[itemKey]
        if (value !== undefined && value !== null && value) {
          return {
            ...item,
            text:
              item.type === 'dob'
                ? dateConvert(value as string)
                : String(value),
            visible: true
          }
        }
        return { ...item, visible: false, text: '' }
      })
      setInfoData(newInfoData)
    }
  }, [user])

  const handleEditProfile = () => {
    if (id) {
      router.push(`/my-profile/${id}`)
    }
  }

  return (
    <div className='relative w-full rounded-[10px]  bg-white md:rounded-[20px]'>
      <div
        className='relative rounded-t-[10px] md:rounded-t-[20px] bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${generateImageurl(bgImage)})`
        }}
      >
        <div
          className={`w-full h-[135px] md:h-[210px] flex flex-col items-center justify-center `}
        >
          <div className='md:hidden'>
            <CircularProgress value={profile_percentage}>
              <div className='text-sm w-[90%] h-[90%] flex items-center justify-center rounded-full font-medium bg-[#11A64B] text-gray-700'>
                <img
                  className='w-[80%] h-[80%]'
                  src={userImage ? userImage : PROFILE_IMAGES?.[0]?.imageURL}
                  alt='profile-badge'
                  width={32}
                  height={32}
                />
              </div>
            </CircularProgress>
          </div>
          <div className='hidden md:block'>
            <CircularProgress size={148} value={profile_percentage}>
              <div className='text-sm w-[90%] flex items-center justify-center h-[90%] rounded-full font-medium bg-[#11A64B] text-gray-700'>
                <img
                  className='w-[80%] h-[80%]'
                  src={userImage ? userImage : PROFILE_IMAGES?.[0]?.imageURL}
                  alt='profile-badge'
                    
                />
              </div>
            </CircularProgress>
          </div>
        </div>
        <div className='relative h-[23px] md:h-fit flex justify-center'>
          <AktivGroteskText
            text={name ?? ''}
            fontSize='text-[16px] md:text-[28px]'
            fontWeight='font-[700]'
          />
          <button
            onClick={handleEditProfile}
            className='absolute bottom-[5px] md:bottom-[12px] right-[8px] md:right-[33px] outline-none border-none'
          >
            <SvgIcons
              className=' w-[11.97px] h-[14px] md:w-[20px] md:h-[23px]'
              name={ICONS_NAMES.PENCIL}
            />
          </button>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2 md:gap-[28px] md:gap-x-[9rem] lg:gap-x-[20rem] gap-x-0 px-[16px] md:px-[66px] pt-[16px] md:pt-[66px] pb-[10px] md:pb-[44px] w-full'>
        {infoData?.length > 0 &&
          infoData?.map(item => {
            if (item?.visible) {
              return (
                <UserInfoCard
                  iconClassName='w-[14px] h-[14px] md:min-w-[29px] md:min-h-[29px]'
                  key={item?.id}
                  iconName={item?.iconName}
                  text={item?.text}
                />
              )
            } else {
              return null
            }
          })}
      </div>
    </div>
  )
}

export default ProfileCard
