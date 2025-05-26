import React from 'react'
import AktivGroteskText from '../common/AktivGroteskText'
import { HALL_OF_LAME, MY_JOKES, PENDING } from '@/constants'
import UserGeneratedJokeCard from '../common/UserGeneratedJokeCard'

const UserGeneratedJokecComponent = () => {
  return (
    <div className='flex flex-col gap-[16px] md:gap-[32px]'>
      <div className='relative flex md:px-[37px] justify-between items-center'>
        <AktivGroteskText text={MY_JOKES} fontSize='text-[16px] md:text-[28px]' fontWeight='font-[700]' />
        <button className='bg-transparent border-none outline-none'>
          <AktivGroteskText
            className='text-[#11A64B]'
            fontSize='text-[12px] md:text-[24px]'
            fontWeight='font-[700]'
            text={HALL_OF_LAME}
          />
        </button>
      </div>
      <div className='relative flex flex-col gap-[12px] md:gap-[20px]'>
        <UserGeneratedJokeCard
          title='Title of the Joke'
          date='10/11/2004'
          status={PENDING}
          image={''}
        />
        <UserGeneratedJokeCard
          title='Title of the Joke'
          date='10/11/2004'
          status={PENDING}
          image={''}
        />
      </div>
    </div>
  )
}

export default UserGeneratedJokecComponent
