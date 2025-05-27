import { aktivGrotesk } from '@/app/layout'
import { IAktivGroteskText } from '@/interfaces'
import React from 'react'

const AktivGroteskText: React.FC<IAktivGroteskText> = ({
  text,
  className,
  fontSize = 'text-[16px]',
  fontWeight = 'font-[600]'
}) => {
  return (
    <h1
      className={`${aktivGrotesk.className} ${className} ${fontSize} ${fontWeight}`}
    >
      {text}
    </h1>
  )
}

export default AktivGroteskText
