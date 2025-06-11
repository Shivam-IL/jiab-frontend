'use client'

import { useEditUserProfileDetails } from '@/api/hooks/ProfileHooks'
import AktivGroteskText from '@/components/common/AktivGroteskText'
import MobileTempNavBar from '@/components/common/MobileTempNavBar'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import EditProfileImage from '@/components/EditProfileImage'
import GreenCTA from '@/components/GreenCTA'
import Input from '@/components/Input'
import { Separator } from '@/components/ui/separator'
import { MOBILE_TEMP_NAVBAR_DATA } from '@/constants'
import { updateUser } from '@/store/profile/profile.slice'
import useAppSelector from '@/hooks/useSelector'
import useWindowWidth from '@/hooks/useWindowWidth'
import { monthDayYearConvert } from '@/utils'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useAppDispatch from '@/hooks/useDispatch'

interface IUserData {
  avatar_id: number
  name: string
  email: string
  phone: string
  dob: string
  gender: string
}

interface IErrors {
  name: string
  dob: string
  gender: string
}

const EditProfilePage = () => {
  const width = useWindowWidth()
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {
    mutate: editUserProfileDetails,
    isPending,
    data: editUserProfileDetailsData
  } = useEditUserProfileDetails()

  const [editProfileImage, setEditProfileImage] = useState<boolean>(false)
  const { user } = useAppSelector(state => state.profile)
  const [userData, setUserData] = useState<IUserData>({
    avatar_id: 0,
    name: '',
    email: '',
    phone: '+91-8989898989',
    dob: '',
    gender: ''
  })

  const [errors, setErrors] = useState<IErrors>({
    name: '',
    dob: '',
    gender: ''
  })

  const validateName = (name: string) => {
    if (!name.trim()) {
      return 'Name is required'
    }
    if (name.length < 2) {
      return 'Name should be at least 2 characters long'
    }
    if (!/^[a-zA-Z\s]*$/.test(name)) {
      return 'Name should only contain letters and spaces'
    }
    return ''
  }

  const validateDOB = (dob: string) => {
    if (!dob) {
      return 'Date of birth is required'
    }
    const dobDate = new Date(dob)
    const today = new Date()
    const minAge = 0 // Minimum age requirement

    // Calculate age
    let age = today.getFullYear() - dobDate.getFullYear()
    const monthDiff = today.getMonth() - dobDate.getMonth()
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dobDate.getDate())
    ) {
      age--
    }

    if (age < minAge) {
      return `You must be at least ${minAge} years old`
    }
    if (dobDate > today) {
      return 'Date of birth cannot be in the future'
    }
    return ''
  }

  const validateGender = (gender: string) => {
    if (!gender) {
      return 'Gender is required'
    }
    return ''
  }

  const handleChange = (key: string, value: string) => {
    setUserData({ ...userData, [key]: value })

    // Validate the changed field
    switch (key) {
      case 'name':
        setErrors(prev => ({ ...prev, name: validateName(value) }))
        break
      case 'dob':
        setErrors(prev => ({ ...prev, dob: validateDOB(value) }))
        break
      case 'gender':
        setErrors(prev => ({ ...prev, gender: validateGender(value) }))
        break
    }
  }

  const handleContainerClick = () => {
    if (editProfileImage) {
      setEditProfileImage(false)
    }
  }

  useEffect(() => {
    if (user?.id !== params?.userId) {
      router.push('/')
    }
  }, [user, params?.userId])

  useEffect(() => {
    if (user?.id === params?.userId) {
      const { name, email, phone_number, dob, gender } = user
      setUserData({
        avatar_id: 0,
        name: name,
        email: email,
        phone: phone_number,
        dob: dob ? monthDayYearConvert(dob) : '',
        gender
      })
    }
  }, [user, params?.userId])

  const isFormValid = () => {
    const nameError = validateName(userData.name)
    const dobError = validateDOB(userData.dob)
    const genderError = validateGender(userData.gender)

    setErrors({
      name: nameError,
      dob: dobError,
      gender: genderError
    })

    return !nameError && !dobError && !genderError
  }

  const submitHandler = () => {
    if (isFormValid()) {
      console.log('Form is valid, submitting:', userData)
      const { name, dob, gender, avatar_id, email } = userData
      const payload = {
        name,
        dob: monthDayYearConvert(dob),
        email,
        gender,
        avatar_id
      }
      editUserProfileDetails(payload)
    }
  }

  useEffect(() => {
    if (editUserProfileDetailsData?.ok) {
      const { data } = editUserProfileDetailsData?.data ?? {}
      dispatch(updateUser({ user: { ...data } }))
    }
  }, [editUserProfileDetailsData])

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
            <div
              className='md:mb-[8px]'
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <EditProfileImage
                name={'image'}
                editProfileImage={editProfileImage}
                setEditProfileImage={setEditProfileImage}
                image={userData.avatar_id?.toString()}
                onChange={handleChange}
              />
            </div>
            <Input
              fontSize='text-[14px] md:text-[18px]'
              paddingClass='md:py-[10px] md:px-[17px] pl-[16px] pr-[16px] py-[16px] '
              bgColor='bg-white'
              name={'name'}
              type='text'
              error={errors.name}
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
              placeholder='Enter your phone number'
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
              fontSize='text-[14px] md:text-[18px]'
              bgColor='bg-white'
              paddingClass='md:py-[10px] md:px-[17px] pl-[16px] pr-[16px] py-[16px] '
              name={'dob'}
              type='date'
              value={userData.dob}
              onChange={handleChange}
              error={errors.dob}
              placeholder='YYYY/MM/DD'
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
              error={errors.gender}
              onChange={handleChange}
            />
            <GreenCTA
              disabled={isPending}
              onClick={submitHandler}
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
