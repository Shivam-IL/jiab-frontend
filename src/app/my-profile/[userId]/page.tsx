'use client'

import AktivGroteskText from '@/components/common/AktivGroteskText'
import MobileTempNavBar from '@/components/common/MobileTempNavBar'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import EditProfileImage from '@/components/EditProfileImage'
import GreenCTA from '@/components/GreenCTA'
import Input from '@/components/Input'
import { Separator } from '@/components/ui/separator'
import { MOBILE_TEMP_NAVBAR_DATA } from '@/constants'
import useWindowWidth from '@/hooks/useWindowWidth'
import React, { useState } from 'react'

interface IUserData {
  image: string
  name: string
  email: string
  phone: string
  dob: string
  gender: string
}

const EditProfilePage = () => {
  const width = useWindowWidth()

  const [editProfileImage, setEditProfileImage] = useState<boolean>(false)
  const [userData, setUserData] = useState<IUserData>({
    image: '',
    name: '',
    email: '',
    phone: '+91-8989898989',
    dob: '',
    gender: ''
  })

  const handleChange = (key: string, value: string) => {
    setUserData({ ...userData, [key]: value })
  }

  const handleContainerClick = () => {
    if (editProfileImage) {
      setEditProfileImage(false)
    }
  }

  console.log(userData)

  return (
    <div onClick={handleContainerClick} className='flex flex-col gap-3'>
      <MobileTempNavBar
        title={MOBILE_TEMP_NAVBAR_DATA.EDIT_PROFILE.TITLE}
        subtitle={MOBILE_TEMP_NAVBAR_DATA.EDIT_PROFILE.SUB_TITLE}
      />
      <div onClick={handleContainerClick}>
        <ScreenWrapper
          desktopWidth='md:w-[429px]'
          className={`${width > 750 ? 'mt-20 flex justify-center' : 'mt-0'}`}
        >
          <div className='hidden text-center md:flex md:flex-col justify-center items-center pt-[30px] pb-[24px]'>
            <AktivGroteskText
              text={MOBILE_TEMP_NAVBAR_DATA.EDIT_PROFILE.TITLE}
              fontSize='text-[30px]'
            />
            <AktivGroteskText
              text={MOBILE_TEMP_NAVBAR_DATA.EDIT_PROFILE.SUB_TITLE_2}
              fontWeight='font-[400]'
              fontSize='text-[20px]'
            />
          </div>
          <div className='flex flex-col pt-[23px] gap-[24px] md:gap-[16px]'>
            <div className='md:mb-[8px]' onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <EditProfileImage
                name={'image'}
                editProfileImage={editProfileImage}
                setEditProfileImage={setEditProfileImage}
                image={userData.image}
                onChange={handleChange}
              />
            </div>
            <Input
              fontSize='text-[14px] md:text-[18px]'
              paddingClass='md:py-[10px] md:px-[17px] pl-[16px] pr-[16px] py-[16px] '
              bgColor='bg-white'
              name={'name'}
              type='text'
              value={userData.name}
              onChange={handleChange}
              placeholder='Enter your name'
            />
            <Input
              fontSize='text-[14px] md:text-[18px]'
              bgColor='bg-white'
              paddingClass='md:py-[10px] md:px-[17px] pl-[16px] pr-[16px] py-[16px] '
              name={'phone'}
              type='text'
              readonly={true}
              value={userData.phone}
              onChange={handleChange}
              placeholder='Enter your phone'
            />
            <Input
              fontSize='text-[14px] md:text-[18px]'
              bgColor='bg-white'
              paddingClass='md:py-[10px] md:px-[17px] pl-[16px] pr-[16px] py-[16px] '
              name={'dob'}
              type='date'
              value={userData.dob}
              onChange={handleChange}
              placeholder='YYYY/MM/DD'
            />
            <Input
              fontSize='text-[14px] md:text-[18px]'
              bgColor='bg-white'
              paddingClass='md:py-[10px] md:px-[17px] pl-[16px] pr-[16px] py-[16px] '
              name={'email'}
              type='email'
              value={userData.email}
              onChange={handleChange}
              placeholder='Enter your email'
            />
            <Input
              placeholder='Select your gender'
              fontSize='text-[14px] md:text-[18px]'
              bgColor='bg-white'
              paddingClass='md:py-[10px] md:px-[17px] pl-[16px] pr-[16px] py-[16px] '
              name={'gender'}
              type='select'
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' }
              ]}
              value={userData.gender}
              onChange={handleChange}
            />
            <GreenCTA
              onClick={() => {}}
               className='md:mt-[24px]'
              paddingClass='py-[17px]'
              text='Save Details'
              fontSize='text-[16px]'
              fontWeight='font-[700]'
            />
          </div>
          <div className='md:hidden flex justify-between mt-[18px]'>
            <div className='flex items-center gap-[5px]'>
              <AktivGroteskText
                text='T&C*'
                fontSize='text-[7px]'
                fontWeight='font-[400]'
              />
              <Separator className='h-[80%] self-center w-[0.5px] bg-black' />
              <AktivGroteskText
                text='Privacy Policy*'
                fontSize='text-[7px]'
                fontWeight='font-[400]'
              />
            </div>
            <div className='relative flex gap-2 items-center'>
              <AktivGroteskText
                text='CARBONATED WATER. TRADEMARK OWNER: THE COCA-COLA COMPANY.'
                fontSize='text-[6px]'
                fontWeight='font-[400]'
              />
              <div className='relative min-w-[4.75px] min-h-[4.75px] bg-[#00953B] flex flex-col justify-center items-center'>
                <div className='relative bottom-[0.0107px] left-[0.070px] rounded-full min-w-[3px] min-h-[3px] bg-[#E0E0E0] self-center'></div>
              </div>
            </div>
          </div>
        </ScreenWrapper>
      </div>
    </div>
  )
}

export default EditProfilePage
