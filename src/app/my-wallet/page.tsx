'use client'
import ScreenWrapper from '@/components/common/ScreenWrapper'
import React, { useState, useEffect } from 'react'
import GreenCTA from '@/components/GreenCTA'
import AktivGroteskText from '@/components/common/AktivGroteskText'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/common/Header/Header'
import { useCMSData } from '@/data'
import ReferNowComponent from '@/components/common/ReferNowComponent'
import PJChallenge from '@/components/Banners/PJChallenge'
import { GA_EVENTS } from '@/constants'
import { triggerGAEvent } from '@/utils/gTagEvents'
import { useRouter } from 'next/navigation'
import ShareLaugh from '@/components/Banners/ShareLaugh'
import { useGetComicCoins } from '@/api/hooks/JokeHooks'
import useAppSelector from '@/hooks/useSelector'
import useAppDispatch from '@/hooks/useDispatch'
import { updateLoginModal } from '@/store/auth/auth.slice'
import RedeemSuccessPopup from '@/components/RedeemSuccessPopup'
import // Carousel,
// CarouselContent,
// CarouselItem,
// type CarouselApi
'@/components/ui/carousel'
import ComicCoinMyWinSection from '@/components/ComicCoinMyWinSection'

// interface WalletCard {
//   id: number
//   imageUrl: string
//   title: string
//   description: string
//   isRedeemed: boolean
//   expiryDate: string
//   voucherCode?: string
//   pin?: string
// }

const ComicCoinsPage = () => {
  const [mounted, setMounted] = useState(false)
  const [isReferModalOpen, setIsReferModalOpen] = useState(false)
  const { selectedLanguage } = useAppSelector(state => state.language)
  // const [redemptionStates, setRedemptionStates] = useState<{
  //   [key: number]: boolean
  // }>({
  //   1: true, // Card with id 1 is redeemable
  //   2: true // Card with id 2 is redeemable
  //   // Add more cards as needed
  // })
  const [activeTooltipId, setActiveTooltipId] = useState<number | null>(null)
  // const [isVoucherPopupOpen, setIsVoucherPopupOpen] = useState(false)
  // const [selectedVoucher, setSelectedVoucher] = useState<WalletCard | null>(
  //   null
  // )
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false)

  // Carousel state management
  // const [api, setApi] = useState<CarouselApi>()
  // const [current, setCurrent] = useState(0)
  // const [count, setCount] = useState(0)

  // Fetch comic coins data
  const { data: comicCoinsData, isLoading: isComicCoinsLoading } =
    useGetComicCoins()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Carousel effect
  // useEffect(() => {
  //   if (!api) {
  //     return
  //   }

  //   setCount(api.scrollSnapList().length)
  //   setCurrent(api.selectedScrollSnap() + 1)

  //   api.on('select', () => {
  //     setCurrent(api.selectedScrollSnap() + 1)
  //   })
  // }, [api])

  const cmsData = useCMSData(mounted)
  const router = useRouter()
  const handlePJChallengeClick = () => {
    triggerGAEvent(GA_EVENTS.SPRITE_J24_SUBMIT_JOKE)
    router.push('/submit-your-joke')
  }

  // Get comic coins value with fallback
  const comicCoinsValue = comicCoinsData?.data?.comic_coin ?? 0

  const { isAuthenticated } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  // Sample wallet cards data - you can replace this with actual data
  // const walletCards: WalletCard[] = [
  //   {
  //     id: 1,
  //     imageUrl: '/other-svgs/phone-pe.svg',
  //     title: 'Cashback worth Rs.10',
  //     description:
  //       "Here's a pocket-sized perk just for you. Grab this Rs.10 PhonePe voucher now!",
  //     isRedeemed: redemptionStates[1] || false,
  //     expiryDate: '31st Dec 2025',
  //     voucherCode: 'AJ5739EY93HYS',
  //     pin: '315724'
  //   },
  //   {
  //     id: 2,
  //     imageUrl: '/other-svgs/phone-pe.svg',
  //     title: 'Cashback worth Rs.10',
  //     description:
  //       "Here's a pocket-sized perk just for you. Grab this Rs.10 PhonePe voucher now!",
  //     isRedeemed: redemptionStates[2] || false,
  //     expiryDate: '31st Dec 2025',
  //     voucherCode: 'BK7845FG12LMN',
  //     pin: '892341'
  //   }
  //   // Add more wallet cards here as needed
  // ]

  return (
    <>
      <div className='bg-white -mt-5 pt-5'>
        {/* Top Section */}
        <div className='w-full flex flex-col items-center justify-center px-[17px]'>
          <div className='flex justify-between md:w-[78.57%] w-full items-end h-full  mt-20 md:mb-0 mb-3'>
            {/* Comic Coins */}
            <div className='flex flex-col gap-[5px]'>
              <AktivGroteskText
                text={cmsData.comic.comicCoinHeader}
                fontSize={`text-uppercase  ${selectedLanguage === 'ta' ? ' xxs:text-[8px] text-[14px] md:text-[30px] xl:text-[30px] 2xl:text-[30px] lg:text-[30px]' : 'text-[14px] md:text-[30px] '}`}
                fontWeight='font-[700]'
              />
              <div className='flex items-center gap-2 md:gap-3 '>
                <AktivGroteskText
                  text={isComicCoinsLoading ? '--' : comicCoinsValue.toString()}
                  fontSize='text-[28px] md:text-[64px]'
                  fontWeight='font-[700] leading-tight'
                />
                <Image
                  src='/assets/images/sprite-gold.png'
                  alt='coin'
                  width={50}
                  height={50}
                  className='w-[21px] md:w-[50px] h-[21px] md:h-[50px]'
                />
              </div>
            </div>
            <div className='md:mt-0 mt-[16px] md:mb-[30px] mb-[12px]'>
              <GreenCTA
                text={cmsData.comic.howToCollect}
                onClick={() => {
                  router.push('/contest#how-to-gather')
                }}
                paddingClass='py-[8px] px-[20px] md:py-[16px] md:px-[50px]'
                fontSize='text-[12px] md:text-[28px]'
                isCoinIcon={true}
              />
            </div>
          </div>
        </div>
      </div>
      <ScreenWrapper className='mt-0'>
        {/* Reward Pool */}
        <Header
          title={cmsData.comic.myWinsHeader}
          className='md:mt-8 mt-0 mx-[-19px] md:mx-0'
        />
        <ComicCoinMyWinSection />

        <div className='mt-4 w-full'>
          {/* <Carousel
            setApi={setApi}
            className='w-full'
            opts={{
              align: 'start',
              loop: false
            }}
          >
            <CarouselContent>
              {walletCards.map(card => (
                <CarouselItem key={card.id} className='w-full'>
                  <WalletCard
                    imageUrl={card.imageUrl}
                    imageClassName='w-full h-auto'
                    imageAlt='my-win'
                    containerClassName='bg-white rounded-[10.68px] px-[13px] py-[14.57px] md:pt-[16px] md:pb-[35px] md:px-[33.5px] flex flex-col md:gap-[18.5px] gap-[8px] w-full'
                  >
                    <div className='flex flex-col items-center gap-[24px] md:gap-[36px]'>
                      <div className='flex flex-col items-center gap-[0px] md:gap-[20px]'>
                        <div className='flex items-center gap-[10px] relative'>
                          <AktivGroteskText
                            text={card.title}
                            fontSize='text-[20px] md:text-[28px]'
                            fontWeight='font-[700]'
                          />
                          <button
                            onClick={e => {
                              e.stopPropagation()
                              setActiveTooltipId(
                                activeTooltipId === card.id ? null : card.id
                              )
                            }}
                            className='relative'
                          >
                            <SvgIcons
                              name={ICONS_NAMES.INFO}
                              className='w-[20px] h-[20px] cursor-pointer'
                            />
                            {activeTooltipId === card.id && (
                              <div className='absolute top-full right-[-16px] mt-2 z-[9999] w-[280px] md:w-[309px]'>
                                <div
                                  className='bg-white border-2 border-green rounded-lg py-[11px] px-[8px] shadow-lg'
                                  onClick={e => e.stopPropagation()}
                                >
                                  <div className='absolute bottom-full right-[20px]'>
                                    <div className='w-0 h-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-green'></div>
                                    <div className='w-0 h-0 border-l-[6px] border-r-[6px] border-b-[7px] border-l-transparent border-r-transparent border-b-white absolute bottom-[-5px] right-0'></div>
                                  </div>
                                  <div className='text-[14px] md:text-[16px] text-black md:leading-[20px] text-left'>
                                    Win* with every unique code. Find the code
                                    behind the label of a Sprite<sup>®</sup>{' '}
                                    promotion pack.
                                  </div>
                                </div>
                              </div>
                            )}
                          </button>
                        </div>
                        <p className='text-[#313131] md:text-[20px] text-[16px] text-center max-w-[355px]'>
                          {card.description}
                        </p>
                      </div>
                      {card.isRedeemed ? (
                        <GreenCTA
                          text='Redeem'
                          onClick={() => {
                            setSelectedVoucher(card)
                            setIsVoucherPopupOpen(true)
                          }}
                          paddingClass='py-[12px] px-[36px] md:py-[20px] md:px-[44px]'
                          fontSize='text-[12px] md:text-[20px]'
                          className='max-w-[250px]'
                        />
                      ) : (
                        <GreenCTA
                          text='Redeemed'
                          paddingClass='py-[12px] px-[36px] md:py-[20px] md:px-[44px]'
                          fontSize='text-[12px] md:text-[20px]'
                          className='text-[#E1E1E3] bg-[#C4C5C6]'
                          disabled={true}
                        />
                      )}
                    </div>
                    {card.isRedeemed ? (
                      <span className='text-[#313131] font-medium text-center md:text-[20px] text-[12px] md:mt-[24px] mt-[8px]'>
                        Last day to redeem:{' '}
                        <span className='text-green'>{card.expiryDate}</span>
                      </span>
                    ) : (
                      <span className='text-[#C4C5C6] font-medium text-center md:text-[20px] text-[12px] md:mt-[24px] mt-[8px]'>
                        Last day to redeem: {card.expiryDate}
                      </span>
                    )}
                  </WalletCard>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel> */}

          {/* {count > 1 && (
            <div className='flex justify-center md:gap-1 gap-[1.77px] md:mb-10 mb-0 md:mt-[30px] mt-[8px]'>
              {Array.from({ length: count }).map((_, index) => {
                const isActive = index === current - 1
                const key = `wallet-pagination-dot-${index}`

                const classes = [
                  'h-1 rounded-full transition-all duration-300',
                  isActive
                    ? 'md:w-[24px] w-[17.73px] bg-black'
                    : 'md:w-[12px] w-[8.86px] bg-gray-300'
                ].join(' ')

                return (
                  <button
                    key={key}
                    className={classes}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Go to wallet card ${index + 1}`}
                  />
                )
              })}
            </div>
          )} */}
        </div>

        {/* Previous Winners Banner */}
        {/* */}
        <div className="md:mt-[40px] mt-[16px] bg-[url('/other-svgs/banner-explore.svg')] bg-cover bg-center md:rounded-[20px] rounded-[10px] flex justify-between items-center p-4 md:p-6 ">
          <AktivGroteskText
            text={cmsData.comic.previousWinnerBanner1Text}
            fontSize={` ${selectedLanguage === 'ta' ? 'xxs:text-[10px] text-[16px] md:text-[30px] lg:text-[30px] xl:text-[30px] 2xl:text-[30px]' : 'text-[16px] md:text-[30px]'}`}
            fontWeight='font-[700]'
            className='text-white'
          />
          <Link href='/leaderboard'>
            <GreenCTA
              text={cmsData.comic.leaderboardButtonBanner1Text}
              onClick={() => {}}
              paddingClass='py-[6px] px-[20px] md:py-[14px] md:px-[60px]'
              fontSize={`md:font-bold ${selectedLanguage === 'ta' ? 'xxs:text-[10px] text-[12px] md:text-[28px] lg:text-[28px] xl:text-[28px] 2xl:text-[28px]' : 'text-[12px] md:text-[28px]'}`}
              className='md:w-auto'
            />
          </Link>
        </div>

        {/* Promotional Banners */}
        <div className='md:my-[40px] my-[16px] flex flex-col md:gap-y-[40px] gap-y-[16px]'>
          <button
            onClick={() => {
              if (isAuthenticated) {
                setIsReferModalOpen(true)
              } else {
                dispatch(updateLoginModal({ loginModal: true }))
              }
            }}
            className='cursor-pointer'
          >
            <ShareLaugh
              heading={cmsData.comic.shareALaughBanner2HeaderText}
              buttonText={cmsData.comic.referNowButtonBanner2Text}
              onClick={() => {
                if (isAuthenticated) {
                  setIsReferModalOpen(true)
                } else {
                  dispatch(updateLoginModal({ loginModal: true }))
                }
              }}
            />
          </button>
          <div className='challenge-section md:mt-0 mb-[20px] md:mb-[40px]'>
            <PJChallenge
              heading={cmsData.comic.pjChallengeBanner3Heading}
              subheading={cmsData.comic.pjChallengeBanner3SubSubHeading}
              buttonText={cmsData.comic.submitToGetFeaturedButtonBanner3Text}
              onClick={handlePJChallengeClick}
            />
          </div>
        </div>
      </ScreenWrapper>

      {/* Refer Modal */}
      {isAuthenticated && (
        <ReferNowComponent
          open={isReferModalOpen}
          onClose={() => setIsReferModalOpen(false)}
        />
      )}

      {/* PhonePe Voucher Popup */}
      {/* <PhonePeVoucherPopup
        isOpen={isVoucherPopupOpen}
        onClose={() => {
          setIsVoucherPopupOpen(false)
          setSelectedVoucher(null)
        }}
        title={selectedVoucher?.title}
        description={selectedVoucher?.description}
        voucherCode={selectedVoucher?.voucherCode}
        pin={selectedVoucher?.pin}
        expiryDate={selectedVoucher?.expiryDate}
        onRedeem={() => {
          // Handle redeem logic here
          console.log('Voucher redeemed:', selectedVoucher)
          if (selectedVoucher) {
            setRedemptionStates(prev => ({
              ...prev,
              [selectedVoucher.id]: false
            }))
          }
          setIsVoucherPopupOpen(false)
          setSelectedVoucher(null)
          // Show success popup
          setIsSuccessPopupOpen(true)
        }}
        onShare={() => {
          // Handle share logic here
          console.log('Voucher shared:', selectedVoucher)
        }}
      /> */}

      {/* Global tooltip overlay */}
      {activeTooltipId !== null && (
        <div
          className='fixed inset-0 z-[9998]'
          onClick={e => {
            e.stopPropagation()
            setActiveTooltipId(null)
          }}
        />
      )}

      {/* Redeem Success Popup */}
      <RedeemSuccessPopup
        isOpen={isSuccessPopupOpen}
        onClose={() => setIsSuccessPopupOpen(false)}
        comicCoinsEarned={20}
      />
    </>
  )
}

export default ComicCoinsPage
