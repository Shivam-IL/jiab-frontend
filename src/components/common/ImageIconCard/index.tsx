import { IImageIconCard } from '@/interfaces'
import { generateImageurl } from '@/utils'
import React from 'react'
import SvgIcons from '../SvgIcons'
import { aktivGrotesk } from '@/app/layout'

const ImageIconCard: React.FC<IImageIconCard> = ({
  text,
  image,
  icon,
  iconClassName,
  iconHeight,
  iconWidth,
  className,
  itemsGapClass = 'gap-[20px]',
  fontSize = 'text-[16px]',
  fontWeight = 'font-[500]',
  boxWidth = 'min-w-full',
  imageUrl = '',
  imageClassName = 'w-[56px] h-[34px]',
  textColor = 'text-[#121212]'
}) => {
  return (
    <div
      className={`flex ${itemsGapClass} ${boxWidth} items-center ${className}`}
    >
      {icon && (
        <SvgIcons
          width={iconWidth ? Number(iconWidth) : undefined}
          height={iconHeight ? Number(iconHeight) : undefined}
          className={iconClassName}
          name={icon}
        />
      )}
      {image && (
        <img
          className={imageClassName}
          src={image ? generateImageurl(image) : ''}
          alt={text}
        />
      )}
      <p
        className={`${aktivGrotesk.className} ${fontSize} ${fontWeight}  ${textColor}`}
      >
        {text}
      </p>
    </div>
  )
}

export default ImageIconCard
