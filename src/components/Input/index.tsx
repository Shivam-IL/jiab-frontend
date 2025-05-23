'use client'

import { aktivGrotesk } from '@/app/layout'
import { IInput } from '@/interfaces'
import React from 'react'

const Input: React.FC<IInput> = ({
  type,
  value,
  placeholder,
  name,
  onChange,
  error = '',
  readonly = false
}) => {
  return (
    <div className='flex flex-col gap-[6px] w-full'>
      <input
        className={`w-full ${
          error !== '' ? 'border-[#FD0202] border-[1px]' : ''
        } outline-none text-[14px] font-[400] placeholder:text-[rgba(0,0,0,0.3)] ${
          aktivGrotesk.className
        } pl-[16px] pr-[16px] py-[16px] md:py-[19px] md:pl-[25px] bg-[#F3F3F3] rounded-[100px]`}
        onChange={event => onChange(event.target.name, event.target.value)}
        type={type}
        readOnly={readonly}
        value={value}
        placeholder={placeholder}
        name={name}
      />
      {error !== '' && (
        <span className='text-[#FD0202] font-[400] text-[12px]'>{error}</span>
      )}
    </div>
  )
}

export default Input
