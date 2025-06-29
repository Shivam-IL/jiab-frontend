import React from "react";
import Image from "next/image";

interface NotificationItemProps {
  title: string;
  description: string;
  timestamp: string;
  iconBg?: string;
  iconUrl?: string | null;
  isRead?: boolean;
  isNew?: boolean;
  isLast?: boolean;
  onClick?: () => void;
  titleFontSize?: {
    mobile?: string;
    desktop?: string;
  };
  descriptionFontSize?: {
    mobile?: string;
    desktop?: string;
  };
  timestampFontSize?: {
    mobile?: string;
    desktop?: string;
  };
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  description,
  timestamp,
  iconUrl,
  onClick,
  isLast = false,
  titleFontSize = {
    mobile: "text-[12px]",
    desktop: "md:text-[20px]",
  },
  descriptionFontSize = {
    mobile: "text-[10px]",
    desktop: "md:text-[16px]",
  },
  timestampFontSize = {
    mobile: "text-[8px]",
    desktop: "md:text-sm",
  },
}) => {
  return (
    <div
      className={`flex items-center gap-[8px] md:py-4 py-1 ${
        !isLast ? "border-b border-[#D3D3D3]" : ""
      } md:mb-3 mb-0 h-[73px] md:h-auto ${
        onClick ? "cursor-pointer transition-colors" : ""
      }`}
      onClick={onClick}
    >
      <div
        className={`md:w-12 md:h-12 w-[38px] h-[38px] rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden`}
      >
        {iconUrl ? (
          <Image
            src={iconUrl}
            alt="Notification icon"
            width={38}
            height={38}
            className="object-contain"
            onError={(e) => {
              // Fallback if image fails to load
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className={`text-gray-900 font-bold ${titleFontSize.desktop} ${titleFontSize.mobile} leading-tight`}
        >
          {title}
        </h3>
        <p
          className={`text-gray-600 ${descriptionFontSize.desktop} ${descriptionFontSize.mobile} leading-tight`}
        >
          {description}
        </p>
      </div>

      {/* Timestamp */}
      <div
        className={`text-gray-400 ${timestampFontSize.desktop} ${timestampFontSize.mobile} flex-shrink-0 md:mt-0 mt-[-24px] absolute right-1`}
      >
        {timestamp}
      </div>
    </div>
  );
};

export default NotificationItem;
