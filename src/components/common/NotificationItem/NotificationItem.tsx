import React from "react";

interface NotificationItemProps {
  title: string;
  description: string;
  timestamp: string;
  iconBg?: string;
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
  iconBg = "bg-green",
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
    <div className="flex items-center gap-4 md:py-4 py-1 border-b border-[#D3D3D3] md:mb-3 mb-0 h-[73px] md:h-auto">
      {/* Icon placeholder - green block */}
      <div
        className={`md:w-12 md:h-12 w-[38px] h-[38px] ${iconBg} rounded-lg flex-shrink-0 flex items-center justify-center`}
      >
        {/* Placeholder for future SVG icon */}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className={`text-gray-900 font-medium ${titleFontSize.desktop} ${titleFontSize.mobile} mb-1`}
        >
          {title}
        </h3>
        <p
          className={`text-gray-600 ${descriptionFontSize.desktop} ${descriptionFontSize.mobile} leading-relaxed`}
        >
          {description}
        </p>
      </div>

      {/* Timestamp */}
      <div
        className={`text-gray-400 ${timestampFontSize.desktop} ${timestampFontSize.mobile} flex-shrink-0 md:mt-0 mt-[50px] absolute right-1`}
      >
        {timestamp}
      </div>
    </div>
  );
};

export default NotificationItem;
