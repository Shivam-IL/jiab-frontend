'use client'
import React, { useState } from 'react'
import Header from '@/components/common/Header/Header'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import MobileTempNavBar from '@/components/common/MobileTempNavBar'
import AktivGroteskText from '@/components/common/AktivGroteskText'
import Image from 'next/image'
import useAppSelector from '@/hooks/useSelector'
import SurpriseMeLockModal from '@/components/common/SurpriseMeLockModal'
import useAppDispatch from '@/hooks/useDispatch'
import { updateLoginModal } from '@/store/auth/auth.slice'
import { triggerGAEvent } from '@/utils/gTagEvents'
import { GA_EVENTS } from '@/constants'
import { useGlobalLoader } from '@/hooks/useGlobalLoader'
import SurpriseMeModal from '@/components/common/SurpriseMeModal'

const PickMood: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Get genres from Redux store and auth state
  const { genres } = useAppSelector(state => state.reference)
  const { isAuthenticated } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()
  const { forceHideLoader } = useGlobalLoader()

  // Genre-specific surprise me modal state
  const [genreSurpriseModal, setGenreSurpriseModal] = useState<boolean>(false)
  const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>(
    undefined
  )

  // Transform genres from API to match the expected structure
  const categories =
    genres?.map(genre => ({
      id: genre.id.toString(),
      name: genre.genre,
      image_url: genre.image_url,
      url: '/scroll-and-lol'
    })) || []

  // Handle category click
  const handleCategoryClick = (category: {
    id: string
    name: string
    image_url: string
    url: string
  }) => {
    setSelectedCategory(category.id)

    // Check if user is authenticated before showing modal
    if (isAuthenticated) {
      setSelectedGenreId(parseInt(category.id))
      setGenreSurpriseModal(true)
      triggerGAEvent(GA_EVENTS.SPRITE_J24_SURPRISE_ME)
    } else {
      // Show login modal for unauthenticated users
      dispatch(updateLoginModal({ loginModal: true }))
    }
  }

  const closeGenreSurpriseMe = () => {
    forceHideLoader()
    setGenreSurpriseModal(false)
    setSelectedGenreId(undefined)
  }

  console.log(
    'genreSurpriseModal',
    genreSurpriseModal,
    isAuthenticated,
    selectedGenreId
  )

  return (
    <>
      <MobileTempNavBar
        title='Pick Mood'
        subtitle='Pick your Delulu, Get your Solulu'
      />
      <ScreenWrapper className='md:bg-[#F2F2F2] bg-white border-t-[14px] border-[#F2F2F2] md:mt-[100px] mt-0'>
        <Header
          title='Pick Your Mood'
          description='Pick your Delulu, Get your Solulu'
          className='md:block hidden'
        />
        <div className='grid md:grid-cols-5 grid-cols-3 md:mt-[40px] md:gap-y-[24px] gap-y-[20px] justify-between'>
          {categories.map(category => (
            <div
              className={`flex flex-col items-center justify-center gap-[8px] cursor-pointer `}
              key={category.id}
              onClick={() => handleCategoryClick(category)}
            >
              <div
                className={`w-[90px] md:w-[140px] h-[90px] md:h-[140px] rounded-full flex items-center justify-center gap-[8px] hover:border-2 hover:border-green bg-white transition-border duration-600 overflow-hidden ${
                  selectedCategory === category.id
                    ? 'border-2 border-green'
                    : ''
                }`}
              >
                <Image
                  src={category.image_url}
                  alt={category.name}
                  width={86}
                  height={86}
                  className='md:w-[7rem] w-[7rem] h-auto object-cover rounded-full'
                />
              </div>
              <AktivGroteskText
                text={category.name}
                fontSize='text-[12px] md:text-[20px]'
                fontWeight='font-[400]'
              />
            </div>
          ))}
        </div>
      </ScreenWrapper>

      {/* Genre-specific Surprise Me Modal */}
      {genreSurpriseModal && isAuthenticated && (
        <SurpriseMeModal
          category={genres?.find(genre => genre.id === selectedGenreId)?.genre ?? ''}
          genreId={selectedGenreId}
          languageId={1}
          pullJoke={true}
          onClose={() => {
            closeGenreSurpriseMe()
            setGenreSurpriseModal(false)
          }}
        />
      )}

      {/* Show login modal for unauthenticated users */}
      {genreSurpriseModal && !isAuthenticated && (
        <SurpriseMeLockModal onClose={closeGenreSurpriseMe} />
      )}
    </>
  )
}

export default PickMood
