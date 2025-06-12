import React, { useEffect, useState } from 'react'
import defaultProfile from '../../../public/profile-images/default-profile.svg'
import pencilImage from '../../../public/other-svgs/pencil.svg'
import Image from 'next/image'
import { IEditProfileImage } from '@/interfaces'
import SvgIcons from '../common/SvgIcons'
import useAppSelector from '@/hooks/useSelector'

const EditProfileImage: React.FC<IEditProfileImage> = ({
  editProfileImage,
  setEditProfileImage,
  onChange,
  name,
  image
}) => {
  const { avatarsData } = useAppSelector(state => state.profile)

  return (
    <div className='relative flex flex-col items-center justify-center'>
      <div onClick={() => setEditProfileImage(true)} className='relative flex'>
        <div className='w-[53px] h-[53px] rounded-full bg-[#11A64B] flex items-center justify-center'>
          {image !== '' ? (
            <img
              className='w-[53px] h-[53px]'
              src={image}
              alt='profile-image'
            />
          ) : (
            <Image src={defaultProfile} alt='profile-image' />
          )}
        </div>
        <div className='absolute flex items-center justify-center bottom-[4px] right-0 w-[12px] h-[12px] rounded-full bg-[#FFE200]'>
          <Image src={pencilImage} alt='edit-icon' />
        </div>
      </div>
      {editProfileImage && (
        <div className='border-[1px] gap-[10px] border-[#EBEBEB80] absolute  top-[60px]  w-[196px]  flex flex-wrap  rounded-[5px] p-[12px]  bg-white'>
          {avatarsData?.length > 0 &&
            avatarsData?.map((item: any) => (
              <div key={item?.id} onClick={() => onChange(name, item.id.toString())}>
                <img
                  src={item?.image}
                  alt={item?.name}
                  className='w-[35px] h-[35px] object-cover rounded-full'
                />
                {/* <SvgIcons
                  name={ICONS_NAMES.PROFILE_ICON}
                  className='w-[35px] h-[35px] rounded-full'
                /> */}
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default EditProfileImage
