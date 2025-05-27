'use client'

import React, { useState } from 'react'
import { aktivGrotesk } from '@/app/layout'

interface IClampedText {
  text: string
  className?: string
  fontSize?: string
  fontWeight?: string
  maxLines?: number
  readMoreText?: string
  readLessText?: string
  readMoreClassName?: string
  readLessClassName?: string
}

const ClampedAktivGroteskText: React.FC<IClampedText> = ({
  text,
  className = '',
  fontSize = 'text-[16px]',
  fontWeight = 'font-[600]',
  maxLines = 4,
  readMoreText = 'Read more',
  readLessText = 'Read less',
  readMoreClassName = '',
  readLessClassName = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className='relative'>
      <div className=''>
        <div
          style={{
            display: isExpanded ? 'block' : '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: isExpanded ? 'unset' : maxLines,
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <p className={`${aktivGrotesk.className} ${className} ${fontSize} ${fontWeight} inline`}>
            {text}
            {!isExpanded && <span>...</span>}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`inline-flex ml-1 text-[#1985D3] transition-colors text-sm font-medium ${
                isExpanded ? readLessClassName : readMoreClassName
              }`}
            >
              {isExpanded ? readLessText : readMoreText}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ClampedAktivGroteskText
