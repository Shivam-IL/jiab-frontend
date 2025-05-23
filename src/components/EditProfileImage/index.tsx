import React, { useState } from 'react'
import defaultProfile from '../../../public/profile-images/default-profile.svg'
import pencilImage from '../../../public/other-svgs/pencil.svg'
import Image from 'next/image'
import { PROFILE_IMAGES } from '@/constants'
import { IEditProfileImage } from '@/interfaces'

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
              style={{
                width: '53px',
                height: '53px'
              }}
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
        <div className='border-[1px] gap-[10px] border-[#EBEBEB80] absolute bottom-[-160px] mt-[20px] w-[196px]  flex flex-wrap  rounded-[5px] p-[12px]  bg-white'>
          {PROFILE_IMAGES?.map(item => (
            <img
              onClick={() => onChange(name, item.imageURL)}
              className='w-[35px] h-[35px] rounded-full'
              key={item.id}
              src={`${item.imageURL}`}
              alt={item.name}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default EditProfileImage
