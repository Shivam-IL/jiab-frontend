import React, { useState } from 'react'
import AktivGroteskText from '../AktivGroteskText'
import AddressModal from '../AddressModal'
import AddressCard from '@/components/AddressCard'

const UserAddressCard = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div className='bg-white p-[16px] md:py-[25px] md:px-[33px] gap-[10px] flex flex-col md:gap-[32px] rounded-[5px] md:rounded-[20px]'>
      <div className='flex justify-between items-center'>
        <AktivGroteskText
          text='Address'
          fontSize='text-[16px] md:text-[28px]'
          fontWeight='font-[700]'
        />
        <button onClick={() => setOpen(true)} className='bg-transparent shadow-none text-[#11A64B] p-0 m-0 font-[500] text-[12px] md:text-[24px]'>
            +Add
        </button>
      </div>
      <div className='flex flex-col gap-2 md:gap-[20px]'>
        {Array.from({ length: 3 }).map((_, index) => (
          <AddressCard index={index} allowBottomBorder={index !== 2} key={index} />
        ))}
      </div>
     {open && <AddressModal open={open} setOpen={setOpen} />} 
    </div>
  )
}

export default UserAddressCard
