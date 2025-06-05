import LoginSignupWrapper, {
  AuthHeading
} from '@/components/LoginSignupWrapper'
import React, { useEffect, useState } from 'react'
import { aktivGrotesk } from '@/app/layout'
import Input from '@/components/Input'
import GreenCTA from '@/components/GreenCTA'
import EditProfileImage from '@/components/EditProfileImage'
import useAppDispatch from '@/hooks/useDispatch'
import {  updateSignupDone } from '@/store/auth/auth.slice'
import SvgIcons from '../SvgIcons'
import { ICONS_NAMES } from '@/constants'

interface IUserData {
  profileImage: string
  name: string
  number: string
  email: string
  invite_code: string
  agree: boolean
}

const Signup = () => {
  const [open, setOpen] = useState<boolean>(true)
  const [nameError, setNameError] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [inviteCodeError, setInviteCodeError] = useState<string>('')
  const [editProfileImage, setEditProfileImage] = useState<boolean>(false)

  const [userData, setUserData] = useState<IUserData>({
    profileImage: '',
    name: '',
    number: '+91-8989898988',
    email: '',
    invite_code: '',
    agree: false
  })

  const dispatch = useAppDispatch()

  const handleChange = (key: string, value: string | boolean) => {
    setEditProfileImage(false)
    setUserData({ ...userData, [key]: value })
  }

  const handleContainerClick = () => {
    if (editProfileImage) {
      setEditProfileImage(false)
    }
  }

  // Name validation
  useEffect(() => {
    if (!userData.name) {
      setNameError('')
      return
    }

    const timeoutId = setTimeout(() => {
      if (userData.name.length < 2) {
        setNameError('Name should be at least 2 characters long')
      } else if (!/^[a-zA-Z\s]*$/.test(userData.name)) {
        setNameError('Name should only contain letters and spaces')
      } else {
        setNameError('')
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [userData.name])

  // Email validation
  useEffect(() => {
    if (!userData.email) {
      setEmailError('')
      return
    }

    const timeoutId = setTimeout(() => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
      if (!emailRegex.test(userData.email)) {
        setEmailError('Please enter a valid email address')
      } else {
        setEmailError('')
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [userData.email])

  // Invite code validation
  useEffect(() => {
    if (!userData.invite_code) {
      setInviteCodeError('')
      return
    }

    const timeoutId = setTimeout(() => {
      if (!/^[A-Z0-9]{6,10}$/.test(userData.invite_code)) {
        setInviteCodeError(
          'Invite code should be 6-10 characters long and contain only capital letters and numbers'
        )
      } else {
        setInviteCodeError('')
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [userData.invite_code])

  const isFormValid = () => {
    return (
      userData.name.length > 0 &&
      userData.email.length > 0 &&
      !nameError &&
      !emailError &&
      !inviteCodeError
    )
  }

  return (
    <LoginSignupWrapper open={open} setOpen={setOpen} logo={true}>
      <div
        className={`flex flex-col gap-[24px] pt-[28px]`}
        onClick={handleContainerClick}
      >
        <div className='w-full absolute top-[4px] right-[4px] flex justify-end box-border pt-[10px] pr-[10px]'>
          <button
            className='flex justify-center items-center outline-none border-none'
            onClick={() => {
              setOpen(false)
            }}
          >
            <SvgIcons name={ICONS_NAMES.CROSS} className='w-[16px] h-[16px]' />
          </button>
        </div>
        <div className='flex flex-col justify-center items-center gap-[8px]'>
          <AuthHeading title='Sign Up' />

          <p
            className={`${aktivGrotesk.className} font-[400] text-[#313131] md:text-[20px] text-[16px] w-[80%] flex justify-center text-center`}
          >
            Let&apos;s break the ice
          </p>
          <div onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <EditProfileImage
              name='profileImage'
              image={userData.profileImage}
              editProfileImage={editProfileImage}
              setEditProfileImage={setEditProfileImage}
              onChange={handleChange}
            />
          </div>
        </div>
        <div
          className='flex flex-col gap-[20px]'
          onClick={() => setEditProfileImage(false)}
        >
          <Input
            required={true}
            name='name'
            value={userData.name}
            placeholder='Full Name*'
            onChange={handleChange}
            type='text'
            error={nameError}
          />
          <Input
            name='number'
            required={true}
            value={userData.number}
            placeholder='Mobile Number*'
            onChange={handleChange}
            type='text'
            readonly={true}
          />
          <Input
            name='email'
            required={true}
            value={userData.email}
            placeholder='Email*'
            onChange={handleChange}
            type='email'
            error={emailError}
          />
          <Input
            name='invite_code'
            value={userData.invite_code}
            placeholder='Referral Invite Code (Optional)'
            onChange={handleChange}
            type='text'
            error={inviteCodeError}
          />
          <div className='flex items-start gap-[8px]'>
            <input
              name='agree'
              checked={userData.agree}
              onChange={e => handleChange('agree', e.target.checked)}
              className='relative top-[2px] w-4 h-4 cursor-pointer accent-[#003087]'
              type='checkbox'
            />
            <span
              className={`${aktivGrotesk.className} font-[400] text-[12px]`}
            >
              I hereby state that I am older than 18 years of age and agree to
              the{' '}
              <span className='text-[#003087] font-[700] cursor-pointer'>
                Terms and Conditions
              </span>{' '}
              and{' '}
              <span className='font-[700] text-[#003087] cursor-pointer'>
                Privacy Policy
              </span>
              .
            </span>
          </div>
        </div>
        <GreenCTA
          onClick={() => {
            setEditProfileImage(false)
            if (isFormValid()) {
              console.log('Form submitted:', userData)
              setOpen(false)
              dispatch(updateSignupDone({ signupDone: true }))
            }
          }}
          text='Submit'
        />
      </div>
    </LoginSignupWrapper>
  )
}

export default Signup
