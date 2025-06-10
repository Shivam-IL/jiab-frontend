import React, { useState } from 'react'
import AktivGroteskText from '../AktivGroteskText'
import AddressModal from '../AddressModal'
import AddressCard from '@/components/AddressCard'
import useAppSelector from '@/hooks/useSelector'
import { AddressModalType } from '@/types'

const UserAddressCard = () => {
  const [open, setOpen] = useState<boolean>(false)

  const { addresses } = useAppSelector(state => state.profile)
  return (
    <div className='bg-white p-[16px] md:py-[25px] md:px-[33px] gap-[10px] flex flex-col md:gap-[32px] rounded-[5px] md:rounded-[20px]'>
      <div className='flex justify-between items-center'>
        <AktivGroteskText
          text='Address'
          fontSize='text-[16px] md:text-[28px]'
          fontWeight='font-[700]'
        />
        <button
          onClick={() => setOpen(true)}
          className='bg-transparent shadow-none text-[#11A64B] p-0 m-0 font-[500] text-[12px] md:text-[24px]'
        >
          +Add
        </button>
      </div>
      {addresses?.length > 0 && (
        <div className='flex flex-col gap-2 md:gap-[20px]'>
          {addresses?.map((address, index) => (
            <AddressCard
              address={address}
              index={index}
              allowBottomBorder={index !== addresses.length - 1}
              key={address?.id}
            />
          ))}
        </div>
      )}
      {open && (
        <AddressModal
          type={AddressModalType.ADD}
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  )
}

export default UserAddressCard
