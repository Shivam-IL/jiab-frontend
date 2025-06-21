import React, { useEffect, useState } from 'react'
import AktivGroteskText from '../common/AktivGroteskText'
import SvgIcons from '../common/SvgIcons'
import { ICONS_NAMES } from '@/constants'
import { Checkbox } from '../ui/checkbox'
import {
  deleteAddress,
  IUserAddressData,
  updateDefaultAddress
} from '@/store/profile/profile.slice'
import { useDeleteAddress, useEditAddress } from '@/api/hooks/ProfileHooks'
import useAppDispatch from '@/hooks/useDispatch'
import { AddressModalType } from '@/types'
import AddressModal from '../common/AddressModal/index'
import {
  AddressCDPEventPayload,
  CDPEventPayloadBuilder
} from '@/api/utils/cdpEvents'
import { useSendCDPEvent } from '@/api/hooks/CDPHooks'
import useAppSelector from '@/hooks/useSelector'

const AddressCard = ({
  allowBottomBorder = false,
  address,
  addressLength
}: {
  index: number
  allowBottomBorder?: boolean
  address?: IUserAddressData | null
  addressLength?: number
}) => {
  const [openAddressModal, setOpenAddressModal] = useState<boolean>(false)
  const [addressId, setAddressId] = useState<number | null>(null)
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.profile)
  const { mutate: sendCDPEvent } = useSendCDPEvent()
  const {
    mutate: deleteAddess,
    data: deleteAddressData
  } = useDeleteAddress()

  const {
    mutate: editAddressApi,
    data: editAddressData
  } = useEditAddress()

  const handleDeleteAddress = (id: number) => {
    if (!id) return
    deleteAddess({ address_id: id })
  }
  useEffect(() => {
    if (deleteAddressData?.ok && address?.id) {
      dispatch(deleteAddress({ addressId: address?.id }))
    }
  }, [deleteAddressData])

  const trigger_CDP_UPDATE_ADDRESS = ({
    address_line_1,
    address_line_2,
    pincode,
    state,
    city
  }: {
    address_line_1: string
    address_line_2?: string
    pincode: string
    state: string
    city: string
  }) => {
    if (address_line_1 && pincode && state && city && user?.id) {
      const payload: AddressCDPEventPayload =
        CDPEventPayloadBuilder.buildUpdateAddressPayload({
          address_line1: address_line_1,
          address_line2: address_line_2 ?? '',
          address_city: city,
          address_state: state,
          geo_postal_code: pincode,
          user_identifier: user.id ?? ''
        })
      sendCDPEvent(payload)
    }
  }

  useEffect(() => {
    if (editAddressData?.ok) {
      const { data } = editAddressData ?? {}
      trigger_CDP_UPDATE_ADDRESS({
        address_line_1: data?.address1,
        address_line_2: data?.address2 ?? '',
        pincode: data?.pincode.toString(),
        state: data?.state,
        city: data?.city
      })
      dispatch(updateDefaultAddress({ addressId: address?.id }))
    }
  }, [editAddressData])

  return (
    <div
      className={`flex flex-col gap-[10px] md:gap-[20px] justify-between  w-full border-[#CDCDCD] pt-4 pb-4 md:pt-0 md:pb-[23px] ${
        allowBottomBorder ? 'border-b-[1px]' : ''
      }`}
    >
      <div className='flex flex-col gap-[5px] md:gap-[12px]'>
        <div className='flex justify-between items-start gap-2 md:gap-4'>
          <div className='flex flex-col gap-2'>
            {address?.address1 && (
              <AktivGroteskText
                fontSize='text-[14px] md:text-[20px]'
                fontWeight='font-[400]'
                text={`${address?.address1 ? `${address.address1} ,` : ''} 
                ${address?.address2 ? `${address.address2} ,` : ''} ${
                  address?.nearest_landmark
                    ? `${address.nearest_landmark} ,`
                    : ''
                } ${address?.city ? `${address.city} ,` : ''} ${
                  address?.state ? `${address.state}` : ''
                } ${address?.pincode ? `${address.pincode}` : ''}`}
              />
            )}
          </div>
          <button
            onClick={() => {
              if (!address?.id) return
              setOpenAddressModal(true)
              setAddressId(address.id)
            }}
          >
            <SvgIcons
              name={ICONS_NAMES.PENCIL}
              className='w-[13px] h-[15px] md:w-[16px] md:h-[18px]'
            />
          </button>
        </div>
        <AktivGroteskText
          fontSize='text-[14px] md:text-[20px]'
          fontWeight='font-[400]'
          text={`${address?.shipping_mobile}`}
        />
      </div>
      <div className='flex justify-between items-center gap-2'>
        <div className='flex items-center gap-2'>
          <Checkbox
            onClick={() => {
              if (!address?.id || addressLength === 1 || address?.is_default)
                return
              editAddressApi({
                address_id: address?.id,
                address1: address?.address1,
                address2: address?.address2,
                nearest_landmark: address?.nearest_landmark,
                city: address?.city,
                state: address?.state,
                pincode: address?.pincode,
                shipping_mobile: address?.shipping_mobile,
                is_default: !address?.is_default
              })
            }}
            checked={address?.is_default ?? false}
            className='w-[16px] h-[16px] md:w-[19px] md:h-[19px]'
          />
          <AktivGroteskText
            fontSize='text-[12px] md:text-[18px]'
            fontWeight='font-[400]'
            text='Set as Default'
          />
        </div>
        <button
          onClick={() => {
            if (!address?.id || addressLength === 1 || address?.is_default)
              return
            handleDeleteAddress(address.id)
          }}
        >
          <SvgIcons
            name={ICONS_NAMES.TRASH}
            className='w-[15px] h-[15px] md:w-[18px] md:h-[18px]'
          />
        </button>
      </div>
      {openAddressModal && (
        <AddressModal
          type={AddressModalType.EDIT}
          addressId={addressId}
          open={openAddressModal}
          setOpen={setOpenAddressModal}
          addressLength={addressLength}
        />
      )}
    </div>
  )
}

export default AddressCard
