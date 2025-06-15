import React, { useState } from 'react'
import SvgIcons from '../common/SvgIcons'
import { ICONS_NAMES } from '@/constants'
import { IUserReaction } from '@/api/types/JokeTypes'
import { formatNumberToK } from '@/utils'

// Define a type for the values of ICONS_NAMES
type IconName = typeof ICONS_NAMES[keyof typeof ICONS_NAMES]

interface Reaction {
  icon: IconName // Use the new IconName type
  count: string
  name: string
}

interface ReactionEmojiesProps {
  onEmojiSelect: (reaction: Reaction) => void
  /**
   * Reaction counts coming from the API for the currently active joke/video.
   * If undefined, we gracefully fall back to 0 counts for all reactions.
   */
  userReaction?: IUserReaction
  /**
   * Total view count for the currently active joke/video.
   */
  viewCount?: number
  /**
   * Reaction type for the currently active joke/video.
   */
  reactionType?: string
  /**
   * Whether the user has reacted to the currently active joke/video.
   */
  isReacted?: boolean
  /**
   * Whether the user has reacted to the currently active joke/video.
   */
  videoId?: string
}

const ReactionEmojies: React.FC<ReactionEmojiesProps> = ({
  onEmojiSelect,
  userReaction,
  viewCount,
  isReacted,
  reactionType,
  videoId
}) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)

  // Safely derive counts using a helper to show numbers in a compact format (e.g. 2.3K).
  const formatCount = (num?: number) =>
    formatNumberToK(num ? parseInt(num.toString(), 10) : 0)

  const reactions: Reaction[] = [
    {
      icon: ICONS_NAMES.FUNNY,
      count: formatCount(userReaction?.laugh),
      name: 'laugh'
    },
    {
      icon: ICONS_NAMES.MAD,
      count: formatCount(userReaction?.neutral),
      name: 'neutral'
    },
    {
      icon: ICONS_NAMES.ANGRY,
      count: formatCount(userReaction?.sad),
      name: 'sad'
    },
    {
      icon: ICONS_NAMES.VIEWS,
      count: formatCount(viewCount),
      name: 'views'
    }
  ]

  const handleClick = (reaction: Reaction) => {
    setSelectedIcon(reaction.icon)
    onEmojiSelect(reaction)
  }

  const getClassName = (reactionType: string, isReacted: boolean | undefined, reactionName: string) => {
    console.log(reactionName, reactionType, isReacted)
    if(reactionName === 'views') return ''
    if(isReacted){
      if(reactionType === reactionName) return 'opacity-100'
      return 'opacity-50'
    }
    return ''
  }

  return (
    <div className='flex flex-col items-center gap-[22.5px] cursor-pointer rounded-full py-3 px-2 md:text-black text-white hover:text-black hover:bg-white'>
      {reactions.map(reaction => {
        const isViewIcon = reaction.icon === ICONS_NAMES.VIEWS
        const isHovered = hoveredIcon === reaction.icon
        const isSelected = selectedIcon === reaction.icon

        let scale = 1
        let opacity = 1

        if (!isViewIcon) {
          // Only apply hover/selected effects for clickable icons
          if (selectedIcon) {
            // An icon is selected
            if (isSelected) {
              scale = 1
              opacity = 1
            } else {
              scale = 1 // Other icons smaller when one is selected
              opacity = 0.5
            }
          } else if (hoveredIcon) {
            // No icon selected, but one is hovered
            if (isHovered) {
              scale = 1
              opacity = 1
            } else {
              opacity = 0.5
            }
          }
        }

        return (
          <div
            key={`${reaction.icon}-${videoId}`}
            className={`flex flex-col  items-center md:gap-[4.5px] gap-[2px] transition-all duration-300 ease-in-out ${
              isViewIcon ? 'cursor-default' : 'cursor-pointer'
            }`}
            style={{
              transform: `scale(${scale})`,
              opacity: opacity
            }}
            onMouseEnter={() => !isViewIcon && setHoveredIcon(reaction.icon)}
            onMouseLeave={() => !isViewIcon && setHoveredIcon(null)}
            onClick={() => {
              if (!isViewIcon && !isReacted) handleClick(reaction)
            }}
          >
            <SvgIcons
              name={reaction.icon}
              width={36.2}
              height={36.2}
              className={`md:w-[36.2px] ${getClassName(reaction.name, isReacted, reactionType ?? '')} md:h-[36.2px] w-[32px] h-[32px]`}
            />
            <span className='md:text-[22.5px] text-[10px] text-shadow-4xl md:text-shadow-none'>
              {reaction.count}
            </span>
          </div>
        )
      })}
    </div>
  )
}
export default ReactionEmojies
