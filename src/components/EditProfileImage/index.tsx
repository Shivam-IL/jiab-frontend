import React from 'react'
import defaultProfile from '../../../public/profile-images/default-profile.svg'
import pencilImage from '../../../public/other-svgs/pencil.svg'
import Image from 'next/image'
import { ICONS_NAMES, PROFILE_IMAGES } from '@/constants'
import { IEditProfileImage } from '@/interfaces'
import SvgIcons from '../common/SvgIcons'

const EditProfileImage: React.FC<IEditProfileImage> = ({
  editProfileImage,
  setEditProfileImage,
  onChange,
  name,
  image
}) => {
  return (
    <div className='relative flex justify-center'>
      <div onClick={() => setEditProfileImage(true)} className='relative'>
        <div className='w-[53px] h-[53px] rounded-full bg-[#11A64B] flex items-center justify-center'>
          {image !== '' ? (
            <img
              className='w-[53px] h-[53px]'
              src={image}
              alt='profile-image'
            />
          ) : (
            <img src={defaultProfile} alt='profile-image' />
          )}
        </div>
        <div className='absolute flex items-center justify-center bottom-[4px] right-0 w-[12px] h-[12px] rounded-full bg-[#FFE200]'>
          <Image src={pencilImage} alt='edit-icon' />
        </div>
      </div>
      {editProfileImage && (
        <div className='border-[1px] gap-[10px] border-[#EBEBEB80] absolute bottom-[-160px] mt-[20px] w-[196px]  flex flex-wrap  rounded-[5px] p-[12px]  bg-white'>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} onClick={() => onChange(name, index.toString())}>
              <SvgIcons
                name={ICONS_NAMES.PROFILE_ICON}
                className='w-[35px] h-[35px] rounded-full'
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EditProfileImage
