import { Dialog, DialogContent } from '@/components/ui/dialog'
import React, { useState } from 'react'
import SvgIcons from '../SvgIcons'
import { ICONS_NAMES } from '@/constants'
import AktivGroteskText from '../AktivGroteskText'
import { IAddressModal } from '@/interfaces'
import Input from '@/components/Input'
import GreenCTA from '@/components/GreenCTA'
import { Checkbox } from '@/components/ui/checkbox'
import useAppDispatch from '@/hooks/useDispatch'
import { updateAddressData } from '@/store/auth/auth.slice'

interface IAddressData {
  address_line_1: string
  address_line_2: string
  nearest_landmark: string
  alternate_phone_number: string
  pan_card_number: string
  pincode: string
  state: string
  city: string
  default: boolean
}

const AddressModal: React.FC<IAddressModal> = ({ open, setOpen }) => {
  const [data, setData] = useState<IAddressData>({
    address_line_1: '',
    address_line_2: '',
    nearest_landmark: '',
    alternate_phone_number: '',
    pan_card_number: '',
    pincode: '',
    state: '',
    city: '',
    default: false
  })

  const dispatch = useAppDispatch()

  const handleChange = (key: string, value: any) => {
    setData({ ...data, [key]: value })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='rounded-[5px] md:max-w-[401px] p-0 max-w-[358px] gap-2'>
        <div className='w-full flex justify-between items-center box-border px-[8px] py-[10px]'>
          <AktivGroteskText
            text='Add Address'
            fontSize='text-[16px]'
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
        <div className='flex flex-col gap-[20px]'>
          <div className='px-[8px] flex flex-col gap-[24px]'>
            <Input
              name='address_line_1'
              type='text'
              placeholder='Address Line 1'
              value={data.address_line_1}
              onChange={handleChange}
              paddingClass='py-[16px] px-[20px] md:py-[14px]'
              
            />
            <Input
              name='address_line_2'
              type='text'
              placeholder='Address Line 2'
              value={data.address_line_2}
              onChange={handleChange}
              paddingClass='py-[16px] px-[20px] md:py-[14px]'

            />
            <Input
              name='nearest_landmark'
              type='text'
              placeholder='Nearest Landmark'
              value={data.nearest_landmark}
              onChange={handleChange}
              paddingClass='py-[16px] px-[20px] md:py-[14px]'

            />
            <Input
              name='alternate_phone_number'
              type='text'
              placeholder='Alternate Phone Number'
              value={data.alternate_phone_number}
              onChange={handleChange}
              paddingClass='py-[16px] px-[20px] md:py-[14px]'

            />
            <Input
              name='pan_card_number'
              type='text'
              placeholder='PAN Card Number'
              value={data.pan_card_number}
              onChange={handleChange}
              paddingClass='py-[16px] px-[20px] md:py-[14px]'

            />
            <Input
              name='pincode'
              type='text'
              placeholder='Pincode'
              value={data.pincode}
              onChange={handleChange}
              paddingClass='py-[16px] px-[20px] md:py-[14px]'

            />
            <Input
              name='state'
              type='text'
              placeholder='State'
              value={data.state}
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
              text='Set as Default'
              fontSize='text-[12px]'
              fontWeight='font-[400]'
            />
          </div>
          <div className='px-[8px] flex justify-between items-center box-border py-[10px]'>
            <GreenCTA
              paddingClass='py-[16px]'
              text='Save Address'
              onClick={() => {
                dispatch(updateAddressData({ addressData: data }))
                setOpen(false)
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddressModal
