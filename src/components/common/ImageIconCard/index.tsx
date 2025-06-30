import { IImageIconCard } from '@/interfaces'
import { generateImageurl } from '@/utils'
import React from 'react'
import SvgIcons from '../SvgIcons'
import Image from 'next/image'

const ImageIconCard: React.FC<IImageIconCard> = ({
  text,
  image,
  imageUrl='',
  icon,
  iconClassName,
  iconHeight,
  iconWidth,
  className,
  itemsGapClass = 'gap-[20px]',
  fontSize = 'text-[16px]',
  fontWeight = 'font-[500]',
  boxWidth = 'min-w-full',
  imageClassName = 'w-[56px] h-[34px]',
  textColor = 'text-[#121212]'
}) => {
  return (
    <div
      className={`flex ${itemsGapClass} ${boxWidth} items-center ${className}`}
    >
      {icon && (
        <SvgIcons
          {...(iconWidth && { width: Number(iconWidth) })}
          {...(iconHeight && { height: Number(iconHeight) })}
          className={iconClassName}
          name={icon}
        />
      )}
      {image!=='' && !imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <Image
          className={imageClassName}
          src={image ? generateImageurl(image) : ''}
          alt={text}
          width={56}
          height={34}
        />
      )}
      {imageUrl && !image && (
        <Image
          className={imageClassName}
          src={imageUrl}
          alt={text}
          width={56}
          height={34}
        />
      )}
      <p
        className={`${fontSize} ${fontWeight}  ${textColor}`}
      >
        {text}
      </p>
    </div>
  )
}

export default ImageIconCard
