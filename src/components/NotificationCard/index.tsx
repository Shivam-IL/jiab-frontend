import React from 'react'

const index = () => {
  return (
    <div className='flex w-full '>
      <div className='w-[95%] flex '>
        <div className='w-[38px] h-[38px] bg-[#00953B] rounded-[5px]'></div>
        <div className='flex flex-col gap-[5px]'>
          <p className={`font-[500] text-[12px]`}>
            Welcome to the chill-zone! 😎
          </p>
          <p className={` font-[500] text-[10px]`}>
            Enter the Unique Code from behind the label of a Sprite® promo pack
            to participate & win* prizes up to Rs.25,000!
          </p>
        </div>
      </div>
      <div className='flex flex-col justify-center w-[10%] items-end'>
        <span>2h</span>
      </div>
    </div>
  )
}

export default index
