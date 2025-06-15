import React, { useEffect } from 'react'
import AktivGroteskText from '../common/AktivGroteskText'
import { HALL_OF_LAME, MY_JOKES, PENDING } from '@/constants'
import UserGeneratedJokeCard from '../common/UserGeneratedJokeCard'
import { useRouter } from 'next/navigation'
import useAppSelector from '@/hooks/useSelector'
import useAppDispatch from '@/hooks/useDispatch'
import { useGetUserSubmittedJokes } from '@/api/hooks/JokeHooks'
import {
  IUserSubmittedJoke,
  updateUserSubmittedJokes
} from '@/store/profile/profile.slice'
import { dateConvert } from '@/utils'

const UserGeneratedJokecComponent = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { userSubmittedJokes } = useAppSelector(state => state.profile)

  const { data: userSubmittedJokesData } = useGetUserSubmittedJokes()

  useEffect(() => {
    if (userSubmittedJokesData?.ok) {
      const { data } = userSubmittedJokesData ?? {}
      dispatch(updateUserSubmittedJokes({ userSubmittedJokes: data ?? [] }))
    }
  }, [userSubmittedJokesData])

  return (
    <div className='flex flex-col gap-[16px] md:gap-[32px]'>
      <div className='relative flex justify-between items-center'>
        <AktivGroteskText
          text={MY_JOKES}
          fontSize='text-[16px] md:text-[28px]'
          fontWeight='font-[700]'
        />
        <button
          className='bg-transparent border-none outline-none'
          onClick={() => router.push('/hall-of-lame')}
        >
          <AktivGroteskText
            className='text-[#11A64B]'
            fontSize='text-[12px] md:text-[24px]'
            fontWeight='font-[700]'
            text={HALL_OF_LAME}
          />
        </button>
      </div>
      <div className='relative flex flex-col gap-[12px] md:gap-[20px]'>
        {userSubmittedJokes.length > 0 &&
          userSubmittedJokes.map((joke: IUserSubmittedJoke) => (
            <UserGeneratedJokeCard
              key={joke.id}
              title={joke.title ?? ''}
              date={dateConvert(joke.date ?? '') ?? ''}
              status={joke.status ?? PENDING}
              image={joke.thumbnail_url ?? ''}
            />
          ))}
      </div>
    </div>
  )
}

export default UserGeneratedJokecComponent
