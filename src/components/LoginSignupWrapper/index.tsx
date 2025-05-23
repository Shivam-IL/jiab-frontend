'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog2'
import { Input } from '@/components/ui/input'
import sprite from '../../../public/other-svgs/sprite.svg'
import Image from 'next/image'
import { ILoginSignupWrapper } from '@/interfaces'
import { aktivGrotesk } from '@/app/layout'
import SvgIcons from '../common/SvgIcons'
import { ICONS_NAMES } from '@/constants'

export const AuthHeading: React.FC<{ title: string }> = ({ title }) => {
  return (
    <span
      className={`${aktivGrotesk.className} uppercase font-[700] text-[20px]`}
    >
      {title}
    </span>
  )
}

const LoginSignupWrapper: React.FC<ILoginSignupWrapper> = ({
  children,
  logo = true,
  open,
  setOpen
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='rounded-[5px] md:max-w-[401px] max-w-[346px]'>
     
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default LoginSignupWrapper
