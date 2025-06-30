import React, { useEffect, useState } from 'react'
import { VOUCHER_TYPES } from '@/constants'
import AktivGroteskText from '../common/AktivGroteskText'
import GreenCTA from '../GreenCTA'
import ComiCoinPagination from '../ComiCoinPagination'
import PhonePeVoucherPopup from '../PhonePeVoucherPopup'
import { useGetVoucherInfo } from '@/api/hooks/ProfileHooks'
import MmtVoucher from '../MmtVoucher'
import { converDateDayMonthYear } from '@/utils'

export interface IVoucherInfo {
  assigned_on: string
  id: number
  last_date_to_redeem: string
  secure_code: number
  secure_code_available: boolean
  voucher_code: string
  voucher_description: string
  voucher_image: string
  voucher_name: string
  voucher_url: string
  type?: string
}

const ComicCoinCard = ({
  index,
  totalPhonePayVoucher,
  voucherInfo
}: {
  index: number
  totalPhonePayVoucher: number
  voucherInfo: IVoucherInfo
}) => {
  const [isVoucherPopupOpen, setIsVoucherPopupOpen] = useState(false)
  const [selectedVoucher, setSelectedVoucher] = useState<IVoucherInfo | null>(
    null
  )

  return (
    <>
      {voucherInfo?.type === VOUCHER_TYPES.PHONE_PAY_VOUCHER && (
        <div
          className={`md:px-[47.5px] px-[11.47px] md:pt-[20px] pt-[13px] md:pb-[28px] pb-[12px] relative w-full bg-white ${
            index === 0 ? 'md:rounded-t-[10px] rounded-t-[8px]' : ''
          } ${
            index === totalPhonePayVoucher - 1
              ? 'md:rounded-b-[10px] rounded-b-[8px]'
              : ''
          } ${
            index !== totalPhonePayVoucher - 1
              ? 'border-b-[2px] border-[#E5E5E5]'
              : ''
          }`}
        >
          <div className='flex items-center justify-between w-full relative'>
            <div className='flex md:gap-[19px] gap-[5px]'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className='md:max-w-[94px] self-center object-cover md:min-w-[94px] md:max-h-[90px] md:min-h-[90px] max-w-[42px] max-h-[40px] min-w-[42px] min-h-[40px]'
                src={voucherInfo?.voucher_image}
                alt='comic-coin-voucher'
              />
              <div className='flex flex-col items-start justify-end md:gap-[8px] gap-[2px]'>
                <AktivGroteskText
                  text={voucherInfo?.voucher_name}
                  fontSize='text-[16px] md:text-[28px]'
                  fontWeight='font-[500]'
                  className='leading-tight'
                />
                <AktivGroteskText
                  text={converDateDayMonthYear(
                    voucherInfo?.last_date_to_redeem
                  )}
                  fontSize='text-[12px] md:text-[20px]'
                  fontWeight='font-[400]'
                  className='text-[#898A8D] leading-tight'
                />
              </div>
            </div>
            <GreenCTA
              onClick={() => {
                setIsVoucherPopupOpen(true)
                setSelectedVoucher(voucherInfo)
              }}
              text='Redeem'
              paddingClass='md:px-[40px] md:py-[16px] px-[24px] py-[8px]'
              fontSize='md:text-[20px] text-[12px]'
              fontWeight='font-[700]'
              className=''
            />
          </div>
        </div>
      )}
      {voucherInfo?.type === VOUCHER_TYPES.MMT_VOUCHER && (
        <MmtVoucher voucherInfo={voucherInfo} />
      )}
      {/* PhonePe Voucher Popup */}
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
        onRedeem={() => {
          // Handle redeem logic here
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

const ComicCoinMyWinSection = () => {
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const { data: voucherInfoData, isLoading } = useGetVoucherInfo()
  const [totalPhonePayVoucher, setTotalPhonePayVoucher] = useState(0)
  const [allVoucherData, setAllVoucherData] = useState<IVoucherInfo[]>([])
  const [currentPageData, setCurrentPageData] = useState<IVoucherInfo[]>([])

  useEffect(() => {
    if (voucherInfoData?.ok) {
      const { data } = voucherInfoData
      const totalPages = Math.ceil(data?.length / 3)
      setPages(totalPages)
      setAllVoucherData(data)

      const getThreeData = data?.slice(0, 3)
      const getPhonePayVoucherData = getThreeData
        ?.filter(
          (item: IVoucherInfo) =>
            item.voucher_name === VOUCHER_TYPES.PHONE_PAY_VOUCHER
        )
        ?.map((item: IVoucherInfo) => {
          return {
            ...item,
            type: VOUCHER_TYPES.PHONE_PAY_VOUCHER
          }
        })
      const getMMTVoucherData = getThreeData
        ?.filter(
          (item: IVoucherInfo) =>
            item.voucher_name === VOUCHER_TYPES.MMT_VOUCHER
        )
        ?.map((item: IVoucherInfo) => {
          return {
            ...item,
            type: VOUCHER_TYPES.MMT_VOUCHER
          }
        })
      setTotalPhonePayVoucher(getPhonePayVoucherData?.length)
      setCurrentPageData([...getPhonePayVoucherData, ...getMMTVoucherData])
    }
  }, [voucherInfoData])

  useEffect(() => {
    if (page && allVoucherData?.length > 0) {
      const startIndex = (page - 1) * 3
      const endIndex = startIndex + 3
      const getThreeData = allVoucherData?.slice(startIndex, endIndex)
      const getPhonePayVoucherData = getThreeData
        ?.filter(
          (item: IVoucherInfo) =>
            item.voucher_name === VOUCHER_TYPES.PHONE_PAY_VOUCHER
        )
        ?.map((item: IVoucherInfo) => {
          return {
            ...item,
            type: VOUCHER_TYPES.PHONE_PAY_VOUCHER
          }
        })
      const getMMTVoucherData = getThreeData
        ?.filter(
          (item: IVoucherInfo) =>
            item.voucher_name === VOUCHER_TYPES.MMT_VOUCHER
        )
        ?.map((item: IVoucherInfo) => {
          return {
            ...item,
            type: VOUCHER_TYPES.MMT_VOUCHER
          }
        })
      setTotalPhonePayVoucher(getPhonePayVoucherData?.length)
      setCurrentPageData([...getPhonePayVoucherData, ...getMMTVoucherData])
    }
  }, [page, allVoucherData])

  return (
    <div className='flex flex-col md:gap-[28px] gap-[16px] md:my-[40px] my-[16px]'>
      {allVoucherData?.length > 0 && (
        <>
          <div>
            {currentPageData?.map((item, index) => (
              <ComicCoinCard
                key={index}
                index={index}
                totalPhonePayVoucher={totalPhonePayVoucher}
                voucherInfo={item}
              />
            ))}
          </div>
          <ComiCoinPagination
            currentPage={page}
            totalPages={pages}
            onPageChange={page => {
              setPage(page)
            }}
          />
        </>
      )}
      {allVoucherData?.length === 0 && !isLoading && (
        <div className='bg-white rounded-[10.68px] flex flex-col items-center text-center p-6 md:p-10 gap-6'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src='/other-svgs/bummer.svg'
            alt='no-wins'
            className='w-[120px] md:w-[180px] h-auto md:h-[30vh] object-contain'
          />
        </div>
      )}
    </div>
  )
}

export default ComicCoinMyWinSection
