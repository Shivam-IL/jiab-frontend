'use client'

import Login from '@/components/common/Login'
import OtpModal from '@/components/common/OtpModal'
import Signup from '@/components/common/Signup'
import SurpriseMeLockModal from '@/components/common/SurpriseMeLockModal'
import SurpriseMeModal from '@/components/common/SurpriseMeModal'
import LoginSignupWrapper from '@/components/LoginSignupWrapper'
import useAppSelector from '@/hooks/useSelector'

export default function Home () {
  const { otpSent, otpFilled, loginModal, signupDone } = useAppSelector(
    state => state.auth
  )
  return (
    <div className='bg-lightGray min-h-screen pt-[120px]'>
      <div className='container mx-auto'>
        <SurpriseMeLockModal />
        {loginModal && <Login />}
        {otpSent && <OtpModal />}
        {otpFilled && <Signup />}
        {signupDone && <SurpriseMeModal />}
      </div>
    </div>
  )
}
