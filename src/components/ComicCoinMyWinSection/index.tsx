import React, { useState } from 'react'
import { IMAGES } from '@/constants'
import { generateImageurl } from '@/utils'
import AktivGroteskText from '../common/AktivGroteskText'
import GreenCTA from '../GreenCTA'
import ComiCoinPagination from '../ComiCoinPagination'
import PhonePeVoucherPopup from '../PhonePeVoucherPopup'

const ComicCoinCard = ({ index }: { index: number }) => {
  const [isVoucherPopupOpen, setIsVoucherPopupOpen] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState<any>(null)
  const [redemptionStates, setRedemptionStates] = useState<any>({})
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false)
  return (
    <>
      <div
        className={`md:px-[47.5px] px-[11.47px] md:pt-[20px] pt-[13px] md:pb-[28px] pb-[12px] relative w-full bg-white ${
          index === 1 ? 'md:rounded-t-[10px] rounded-t-[8px]' : ''
        } ${index === 3 ? 'md:rounded-b-[10px] rounded-b-[8px]' : ''} ${
          index !== 3 ? 'border-b-[2px] border-[#E5E5E5]' : ''
        }`}
      >
        <div className='flex items-center justify-between w-full relative'>
          <div className='flex md:gap-[19px] gap-[3px]'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className='md:max-w-[94px] md:min-w-[94px] md:max-h-[90px] md:min-h-[90px] max-w-[42px] max-h-[40px] min-w-[42px] min-h-[40px]'
              src={generateImageurl(IMAGES.COMIC_COIN_VOUCHER)}
              alt='comic-coin-voucher'
            />
            <div className='flex flex-col items-start justify-end md:gap-[8px] gap-[2px]'>
              <AktivGroteskText
                text='Rs.10 Voucher'
                fontSize='text-[16px] md:text-[28px]'
                fontWeight='font-[500]'
                className='leading-tight'
              />
              <AktivGroteskText
                text='16-07-2024'
                fontSize='text-[12px] md:text-[20px]'
                fontWeight='font-[400]'
                className='text-[#898A8D] leading-tight'
              />
            </div>
          </div>
          <GreenCTA
            onClick={() => {
              setIsVoucherPopupOpen(true)
              setSelectedVoucher({
                id: index,
                title: 'Rs.10 Voucher',
                description: "Here's a pocket-sized perk just for you. Grab this Rs. 10 PhonePe voucher now!",
                voucherCode: 'AJ5739EY93HYS',
                pin: '315724',
                expiryDate: '16-07-2024'
              })
            }}
            text='Redeem'
            paddingClass='md:px-[40px] md:py-[16px] px-[24px] py-[8px]'
            fontSize='md:text-[20px] text-[12px]'
            fontWeight='font-[700]'
            className=''
          />
        </div>
      </div>
      {/* PhonePe Voucher Popup */}
      <PhonePeVoucherPopup
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
            setRedemptionStates((prev: any) => ({
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
      />
    </>
  )
}

const ComicCoinMyWinSection = () => {
  const [page, setPage] = useState(1)
  return (
    <div className='flex flex-col md:gap-[28px] gap-[16px] md:my-[40px] my-[16px]'>
      <div>
        {Array.from({ length: 3 }).map((_, index) => (
          <ComicCoinCard key={index} index={index + 1} />
        ))}
      </div>
      <ComiCoinPagination
        currentPage={page}
        totalPages={10}
        onPageChange={page => {
          setPage(page)
        }}
      />
    </div>
  )
}

export default ComicCoinMyWinSection
