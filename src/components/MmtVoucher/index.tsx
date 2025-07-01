import React, { useState } from 'react'
import WalletCard from '../WalletCard'
import GreenCTA from '../GreenCTA'
import AktivGroteskText from '../common/AktivGroteskText'
import SvgIcons from '../common/SvgIcons'
import { ICONS_NAMES } from '@/constants'
import { IVoucherInfo } from '../ComicCoinMyWinSection'
import { converDateToHumanReadable } from '@/utils'
import PhonePeVoucherPopup from '../PhonePeVoucherPopup'

const MmtVoucher = ({ voucherInfo }: { voucherInfo: IVoucherInfo }) => {
  const [openTooltip, setOpenTooltip] = useState(false)
  const [isVoucherPopupOpen, setIsVoucherPopupOpen] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState<IVoucherInfo | null>(
    null
  )

  return (
    <>
      <WalletCard
        imageUrl={voucherInfo?.voucher_image}
        imageClassName='w-full h-auto'
        imageAlt='my-win'
        containerClassName='bg-white mt-[20px] rounded-[10.68px] px-[13px] py-[14.57px] md:pt-[16px] md:pb-[35px] md:px-[33.5px] flex flex-col md:gap-[18.5px] gap-[8px] w-full'
      >
        <div className='flex flex-col items-center gap-[24px] md:gap-[36px]'>
          <div className='flex flex-col items-center gap-[0px] md:gap-[20px]'>
            <div className='flex items-center gap-[10px] relative'>
              <AktivGroteskText
                text={voucherInfo?.voucher_name}
                fontSize='text-[20px] md:text-[28px]'
                fontWeight='font-[700]'
              />
              <button
                onClick={e => {
                  e.stopPropagation()
                  setOpenTooltip(!openTooltip)
                }}
                className='relative'
              >
                <SvgIcons
                  name={ICONS_NAMES.INFO}
                  className='w-[20px] h-[20px] cursor-pointer'
                />
                {openTooltip && (
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
                        Win* with every unique code. Find the code behind the
                        label of a Sprite<sup>®</sup> promotion pack.
                      </div>
                    </div>
                  </div>
                )}
              </button>
            </div>
            <p className='text-[#313131] md:text-[20px] text-[16px] text-center max-w-[355px]'>
              {voucherInfo?.voucher_description}
            </p>
          </div>
          {true ? (
            <GreenCTA
              text={voucherInfo?.button_value ?? 'Redeem'}
              onClick={() => {
                setSelectedVoucher(voucherInfo)
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
        {true ? (
          <span className='text-[#313131] font-medium text-center md:text-[20px] text-[12px] md:mt-[24px] mt-[8px]'>
            Last day to redeem:{' '}
            <span className='text-green'>
              {converDateToHumanReadable(voucherInfo?.last_date_to_redeem)}
            </span>
          </span>
        ) : (
          <span className='text-[#C4C5C6] font-medium text-center md:text-[20px] text-[12px] md:mt-[24px] mt-[8px]'>
            Last day to redeem:{' '}
            {converDateToHumanReadable(voucherInfo?.last_date_to_redeem)}
          </span>
        )}
      </WalletCard>
      <PhonePeVoucherPopup
        isOpen={isVoucherPopupOpen}
        onClose={() => {
          setIsVoucherPopupOpen(false)
          setSelectedVoucher(null)
        }}
        title={selectedVoucher?.voucher_name}
        description={selectedVoucher?.voucher_description}
        voucherCode={selectedVoucher?.voucher_code}
        pin={selectedVoucher?.secure_code?.toString()}
        expiryDate={selectedVoucher?.last_date_to_redeem}
        imageUrl={selectedVoucher?.voucher_image}
        buttonValue={selectedVoucher?.button_value ?? 'Redeem'}
        onRedeem={() => {
          if (selectedVoucher?.voucher_url) {
            const url = selectedVoucher.voucher_url

            // Ensure URL is absolute - handle www. URLs and other URLs without protocol
            const absoluteUrl =
              url.startsWith('http://') || url.startsWith('https://')
                ? url
                : `https://` + url?.toString()?.trim()

            const link = document.createElement('a')
            link.href = absoluteUrl
            link.target = '_blank'
            link.rel = 'noopener noreferrer' // 🔐 prevents access to window.opener

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }
        }}
      />
    </>
  )
}

export default MmtVoucher
