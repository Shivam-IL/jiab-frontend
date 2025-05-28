"use client";

import { ChevronRight } from "lucide-react";
import React from "react";

interface HeaderProps {
  title: string;
  description?: string;
  viewAllUrl?: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  description,
  viewAllUrl,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center justify-between w-full px-5 sm:px-0 ${className}`}
    >
      <div>
        <h2 className="md:text-[30px] text-[16px] font-bold text-gray-900 uppercase">
          {title}
        </h2>
        {description && (
          <p className="md:mt-1 -mt-[1px] md:text-lg text-[12px] text-[#313131]">
            {description}
          </p>
        )}
      </div>
      {viewAllUrl && (
        <a
          href={viewAllUrl}
          className="flex items-center md:text-lg text-[12px] font-medium text-gray-900 group"
        >
          View All
          <span className="ml-1 group-hover:translate-x-1 transition-transform">
            <ChevronRight className="w-4 h-4" />
          </span>
        </a>
      )}
    </div>
  );
};

export default Header;
