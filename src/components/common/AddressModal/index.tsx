import { Dialog, DialogContent } from '@/components/ui/dialog'
import React, { useEffect, useState } from 'react'
import SvgIcons from '../SvgIcons'
import { ICONS_NAMES, REDUX_UPDATION_TYPES } from '@/constants'
import AktivGroteskText from '../AktivGroteskText'
import Input from '@/components/Input'
import GreenCTA from '@/components/GreenCTA'
import { Checkbox } from '@/components/ui/checkbox'
import useAppDispatch from '@/hooks/useDispatch'
import { IAddressData, IAddressError, IAddressModal } from '@/interfaces'
import { validateInput } from '@/utils/inputValidation'
import { useAddNewAddress, useEditAddress } from '@/api/hooks/ProfileHooks'
import { AddressModalType } from '@/types'
import { editAddress, updateAddresses } from '@/store/profile/profile.slice'
import useAppSelector from '@/hooks/useSelector'
import { useCMSData } from '@/data'

const AddressModal: React.FC<IAddressModal> = ({
  open,
  setOpen,
  type,
  addressId
}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cmsData = useCMSData(mounted)

  const [data, setData] = useState<IAddressData>({
    address_line_1: '',
    address_line_2: '',
    nearest_landmark: '',
    alternate_phone_number: '',
    pincode: '',
    state: '',
    city: '',
    default: false
  })

  const [error, setError] = useState<IAddressError>({
    address_line_1: '',
    pincode: '',
    state: '',
    city: ''
  })

  const { addresses } = useAppSelector(state => state.profile)
  const dispatch = useAppDispatch()
  const {
    mutate: addNewAddress,
    isPending,
    data: addNewAddressData
  } = useAddNewAddress()
  const {
    mutate: editNewAddress,
    isPending: isEditAddressPending,
    data: editNewAddressData
  } = useEditAddress()

  const handleChange = (key: string, value: string | boolean) => {
    if (key === 'pincode') {
      const numericValue = value?.toString()?.replace(/[^0-9]/g, '')
      const valueString = numericValue?.slice(0, 6)
      setData({ ...data, [key]: valueString })
    } else if (key === 'alternate_phone_number') {
      const numericValue = value?.toString()?.replace(/[^0-9]/g, '')
      const valueString = numericValue?.slice(0, 10)
      setData({ ...data, [key]: valueString ?? '' })
    } else {
      setData({ ...data, [key]: value })
    }
  }

  const submitAddress = () => {
    let errorValidation = false
    if (data?.address_line_1 === '') {
      setError(prev => ({
        ...prev,
        address_line_1: 'Address Line 1 is required'
      }))
      errorValidation = true
    }
    if (data?.pincode?.length < 6) {
      setError(prev => ({ ...prev, pincode: 'Invalid Pincode' }))
      errorValidation = true
    }
    if (data?.state === '') {
      setError(prev => ({ ...prev, state: 'State is required' }))
      errorValidation = true
    }
    if (data?.city === '') {
      setError(prev => ({ ...prev, city: 'City is required' }))
      errorValidation = true
    }

    if (errorValidation) {
      return
    }

    if (!errorValidation) {
      const addressData = {
        address1: data?.address_line_1 || '',
        address2: data?.address_line_2 || '',
        city: data?.city || '',
        is_default: data?.default || false,
        nearest_landmark: data?.nearest_landmark || '',
        pincode: parseInt(data?.pincode) ?? 0,
        shipping_mobile: data?.alternate_phone_number || '',
        state: data?.state || ''
      }
      if (type === AddressModalType.ADD) {
        addNewAddress(addressData)
      } else {
        if (addressId) {
          editNewAddress({ ...addressData, address_id: addressId })
        }
      }
    }
  }

  useEffect(() => {
    if (!isPending && addNewAddressData?.ok) {
      const { data } = addNewAddressData ?? {}
      dispatch(
        updateAddresses({
          type: REDUX_UPDATION_TYPES.SINGLE_ADDED,
          address: [data]
        })
      )
      setOpen(false)
    }
  }, [isPending, addNewAddressData])

  useEffect(() => {
    if (editNewAddressData?.ok && addressId) {
      const { data } = editNewAddressData ?? {}
      dispatch(
        editAddress({
          addressId: addressId,
          address: data
        })
      )
      setOpen(false)
    }
  }, [editNewAddressData])

  useEffect(() => {
    if (addressId && type === AddressModalType.EDIT) {
      const address = addresses?.find(address => address.id === addressId)
      if (address) {
        setData({
          address_line_1: address?.address1 || '',
          address_line_2: address?.address2 || '',
          nearest_landmark: address?.nearest_landmark || '',
          alternate_phone_number: address?.shipping_mobile || '',
          pincode: address?.pincode.toString() || '',
          state: address?.state || '',
          city: address?.city || '',
          default: address?.is_default || false
        })
      }
    }
  }, [addressId])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='rounded-[5px] md:max-w-[401px] flex flex-col px-0 gap-[18px] md:gap-[28px]  py-[20px] md:pt-[28px] md:pb-[20px] max-w-[358px]'>
        <div className='w-full flex px-[15px] md:px-[19px] justify-between items-center box-border '>
          <AktivGroteskText
            text={
              type === AddressModalType.ADD ? 'Add Address' : 'Edit Address'
            }
            className='leading-tight'
            fontSize='text-[16px] md:text-[20px]'
            fontWeight='font-[700]'
          />
          <button
            className='flex justify-center items-center'
            onClick={() => {
              setOpen(false)
            }}
          >
            <SvgIcons name={ICONS_NAMES.CROSS} className='w-[13px] h-[13px]' />
          </button>
        </div>
        <form
          onSubmit={event => {
            event.preventDefault()
          }}
          className='flex flex-col px-[8px] md:px-[16px] gap-[20px]'
        >
          <div className='flex flex-col gap-[24px]'>
            <Input
              name='address_line_1'
              type='text'
              placeholder={cmsData?.plusAddInsideProfile?.addressLine1}
              value={data.address_line_1}
              onChange={handleChange}
              error={error.address_line_1}
              paddingClass='py-[16px] px-[20px] md:py-[14px]'
            />
            <Input
              name='address_line_2'
              type='text'
              placeholder={cmsData?.plusAddInsideProfile?.addressLine2}
              value={data.address_line_2}
              onChange={handleChange}
              paddingClass='py-[16px] px-[20px] md:py-[14px]'
            />
            <Input
              name='nearest_landmark'
              type='text'
              placeholder={cmsData?.plusAddInsideProfile?.nearestLandmark}
              value={data.nearest_landmark}
              onChange={handleChange}
              paddingClass='py-[16px] px-[20px] md:py-[14px]'
            />
            <Input
              name='alternate_phone_number'
              type='text'
              placeholder={cmsData?.plusAddInsideProfile?.altMobileNumber}
              value={data.alternate_phone_number}
              onChange={handleChange}
              paddingClass='py-[16px] px-[20px] md:py-[14px]'
            />
            <Input
              name='pincode'
              type='text'
              placeholder={cmsData?.plusAddInsideProfile?.pincode}
              value={data.pincode}
              error={error.pincode}
              onChange={handleChange}
              paddingClass='py-[16px] px-[20px] md:py-[14px]'
            />
            <Input
              name='state'
              type='text'
              placeholder={cmsData?.plusAddInsideProfile?.state}
              value={data.state}
              error={error.state}
              paddingClass='py-[16px] px-[20px] md:py-[14px]'
              onChange={handleChange}
            />
            <Input
              name='city'
              type='text'
              placeholder={cmsData?.plusAddInsideProfile?.city}
              value={data.city}
              error={error.city}
              paddingClass='py-[16px] px-[20px] md:py-[14px]'
              onChange={handleChange}
            />
          </div>
          <div className='px-[8px] flex gap-3'>
            <Checkbox
              checked={data.default}
              name='default'
              onCheckedChange={() => {
                handleChange('default', !data.default)
              }}
            />
            <AktivGroteskText
              text={cmsData?.plusAddInsideProfile?.setAsDefault}
              fontSize='text-[12px]'
              fontWeight='font-[400]'
            />
          </div>
          <div className='px-[8px] flex justify-between items-center box-border py-[10px]'>
            <GreenCTA
              disabled={isPending}
              paddingClass='py-[13px]'
              fontSize='text-[16px] md:text-[18px]'
              fontWeight='font-[700]'
              text={cmsData?.plusAddInsideProfile?.saveAddress}
              className='leading-tight w-full'
              onClick={submitAddress}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddressModal
