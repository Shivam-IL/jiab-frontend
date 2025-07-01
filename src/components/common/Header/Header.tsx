"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";
interface HeaderProps {
  title: string;
  description?: string;
  viewAllUrl?: string;
  viewAllButtonText?: string;
  className?: string;
  id?: string;
  textTransform?: "uppercase" | "capitalize";
}

const Header: React.FC<HeaderProps> = ({
  title,
  description,
  viewAllUrl,
  viewAllButtonText,
  className = "",
  id,
  textTransform = "uppercase",
}) => {
  const { selectedLanguage } = useLanguage();
  const isTamil = selectedLanguage === "ta";

  return (
    <div
      className={`flex items-center justify-between w-full px-5 sm:px-0 ${className}`}
      id={id}
    >
      <div>
        <h2
          className={cn(
            `md:text-[30px] text-[16px] font-bold text-gray-900 ${textTransform}`,
            isTamil && "md:text-[25px] text-[14px]"
          )}
        >
          {title}
        </h2>
        {description && (
          <p
            className={cn(
              "md:mt-1 -mt-[1px] md:text-[20px] text-[12px] text-[#313131]",
              isTamil && "md:text-[15px] text-[10px]"
            )}
          >
            {description}
          </p>
        )}
      </div>
      {viewAllUrl && (
        <Link
          href={viewAllUrl}
          className={cn(
            `flex items-center md:text-[20px] text-[12px] font-[400] text-gray-900 group`,
            isTamil &&
              "md:text-[15px] text-[10px] text-right md:w-auto w-[90px]"
          )}
        >
          {viewAllButtonText}
          <span className="ml-1 group-hover:translate-x-1 transition-transform">
            <ChevronRight className="w-4 h-4" />
          </span>
        </Link>
      )}
    </div>
  );
};

export default Header;
