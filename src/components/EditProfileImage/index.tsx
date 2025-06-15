import React, { useEffect, useRef, useState } from 'react'
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
  image,
  editProfile,
  setPfImage
}) => {
  const [editProfileChoose, setEditProfileChoose] = useState(false)
  const { avatarsData } = useAppSelector(state => state.profile)
  const modalRef = useRef<HTMLDivElement>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const [fileImage, setFileImage] = useState<File | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPfImage?.(file)
      setFileImage(file)
      setEditProfileChoose(false)
    }
  }

  const handleProfileClick = () => {
    if (editProfile) {
      setEditProfileChoose(true)
      setEditProfileImage(false)
    } else {
      setEditProfileImage(true)
      setEditProfileChoose(false)
    }
  }

  const handleAvatarSelect = (id: string) => {
    onChange(name, id)
    setEditProfileImage(false)
  }

  const handleChooseAvatar = () => {
    setEditProfileChoose(false)
    setEditProfileImage(true)
  }

  const handleChooseGallery = () => {
    inputRef.current?.click()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setEditProfileImage(false)
        setEditProfileChoose(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='relative flex flex-col items-center justify-center'>
      <div onClick={handleProfileClick} className='relative flex'>
        <div className='w-[53px] h-[53px] rounded-full bg-[#11A64B] flex items-center justify-center'>
          {image !== '' || fileImage ? (
            <img
              className='w-[53px] h-[53px] rounded-full'
              src={
                fileImage ? URL.createObjectURL(fileImage) : image
              }
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

      {editProfileChoose && (
        <div
          ref={modalRef}
          className='border-[1px] gap-[10px] h-fit absolute top-[60px] w-[196px] flex flex-wrap rounded-[5px] bg-white'
        >
          <div
            className='border-b-[1px] p-[11px] w-full border-[#EBEBEB80] border-none cursor-pointer'
            onClick={handleChooseAvatar}
          >
            Choose Avatar
          </div>
          <div
            className='p-[11px] w-full cursor-pointer'
            onClick={handleChooseGallery}
          >
            Choose from gallery
            <input
              ref={inputRef}
              accept='image/*'
              type='file'
              className='hidden'
              onChange={handleImageChange}
            />
          </div>
        </div>
      )}

      {!editProfileChoose && editProfileImage && (
        <div
          ref={modalRef}
          className='border-[1px] gap-[10px] border-[#EBEBEB80] absolute top-[60px] w-[196px] flex flex-wrap rounded-[5px] p-[12px] bg-white'
        >
          {avatarsData?.length > 0 &&
            avatarsData?.map((item: any) => (
              <div
                key={item?.id}
                onClick={() => handleAvatarSelect(item.id.toString())}
                className='cursor-pointer'
              >
                <img
                  src={item?.image}
                  alt={item?.name}
                  className='w-[35px] h-[35px] object-cover rounded-full'
                />
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default EditProfileImage
