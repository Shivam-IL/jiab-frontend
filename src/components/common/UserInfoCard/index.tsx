import { IUserInfoCard } from '@/interfaces'
import React from 'react'
import SvgIcons from '../SvgIcons'
import AktivGroteskText from '../AktivGroteskText'

const UserInfoCard: React.FC<IUserInfoCard> = ({
  iconName,
  text,
  className,
  iconWidth,
  iconHeight,
  iconClassName = '',
  textFontSize = 'text-[12px] md:text-[24px]',
  textFontWeight = 'font-[400]'
}) => {
  return (
    <div className={`flex items-center gap-2 md:gap-[16px] ${className}`}>
      <SvgIcons
        className={iconClassName}
        name={iconName}
        {...(iconWidth && { width: iconWidth })}
        {...(iconHeight && { height: iconHeight })}
      />
      <AktivGroteskText
        text={text}
        fontSize={textFontSize}
        fontWeight={textFontWeight}
      />
    </div>
  )
}

export default UserInfoCard
