import React, { useState } from "react";
import SvgIcons from "../common/SvgIcons";
import { ICONS_NAMES } from "@/constants";

// Define a type for the values of ICONS_NAMES
type IconName = (typeof ICONS_NAMES)[keyof typeof ICONS_NAMES];

interface Reaction {
  icon: IconName; // Use the new IconName type
  count: string;
}

interface ReactionEmojiesProps {
  onEmojiSelect: (reaction: Reaction) => void;
}

const ReactionEmojies: React.FC<ReactionEmojiesProps> = ({ onEmojiSelect }) => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const reactions: Reaction[] = [
    {
      icon: ICONS_NAMES.FUNNY,
      count: "2.3k",
    },
    {
      icon: ICONS_NAMES.MAD,
      count: "2.3k",
    },
    {
      icon: ICONS_NAMES.ANGRY,
      count: "2.3k",
    },
    {
      icon: ICONS_NAMES.VIEWS,
      count: "2.3k",
    },
  ];

  const handleClick = (reaction: Reaction) => {
    setSelectedIcon(reaction.icon);
    onEmojiSelect(reaction);
  };

  return (
    <div className="flex flex-col items-center gap-[22.5px] cursor-pointer rounded-full py-3 px-2 md:text-black text-white hover:text-black hover:bg-white">
      {reactions.map((reaction) => {
        const isHovered = hoveredIcon === reaction.icon;
        const isSelected = selectedIcon === reaction.icon;
        let scale = 1;
        let opacity = 1;

        if (selectedIcon) {
          // An icon is selected
          if (isSelected) {
            scale = 1;
            opacity = 1;
          } else {
            scale = 1; // Other icons smaller when one is selected
            opacity = 0.5;
          }
        } else if (hoveredIcon) {
          // No icon selected, but one is hovered
          if (isHovered) {
            scale = 1;
            opacity = 1;
          } else {
            opacity = 0.5;
          }
        }
        // Default state (no hover, no selection) is scale 1, opacity 1 handled by initial values

        return (
          <div
            key={reaction.icon}
            className="flex flex-col items-center md:gap-[4.5px] gap-[2px] transition-all duration-300 ease-in-out "
            style={{
              transform: `scale(${scale})`,
              opacity: opacity,
            }}
            onMouseEnter={() => setHoveredIcon(reaction.icon)}
            onMouseLeave={() => setHoveredIcon(null)}
            onClick={() => handleClick(reaction)}
          >
            <SvgIcons
              name={reaction.icon}
              width={36.2}
              height={36.2}
              className="md:w-[36.2px] md:h-[36.2px] w-[32px] h-[32px]"
            />
            <span className="md:text-[22.5px] text-[10px]">
              {reaction.count}
            </span>
          </div>
        );
      })}
    </div>
  );
};
export default ReactionEmojies;
