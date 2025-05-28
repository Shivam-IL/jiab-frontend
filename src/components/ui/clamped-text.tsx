"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ClampedTextProps {
  text: string;
  maxLines?: number;
  className?: string;
  readMoreText?: string;
  readLessText?: string;
  readMoreClassName?: string;
  readLessClassName?: string;
  showReadMore?: boolean;
}

const ClampedText: React.FC<ClampedTextProps> = ({
  text,
  maxLines = 3,
  className = "",
  readMoreText = "Read more",
  readLessText = "Read less",
  readMoreClassName = "text-blue-600 hover:text-blue-800 font-medium cursor-pointer",
  readLessClassName = "text-blue-600 hover:text-blue-800 font-medium cursor-pointer",
  showReadMore = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const element = textRef.current;
        const lineHeight = parseInt(window.getComputedStyle(element).lineHeight);
        const maxHeight = lineHeight * maxLines;
        setIsOverflowing(element.scrollHeight > maxHeight);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [text, maxLines]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative">
      <div
        ref={textRef}
        className={cn(
          "transition-all duration-300 ease-in-out",
          !isExpanded && "overflow-hidden",
          className
        )}
        style={{
          display: !isExpanded ? "-webkit-box" : "block",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: !isExpanded ? maxLines : "unset",
        }}
      >
        {text} {isExpanded && (
        <button
          onClick={toggleExpanded}
          className={cn(
            "mt-1 transition-colors duration-200",
            isExpanded ? readLessClassName : readMoreClassName
          )}
        >
          {isExpanded ? readLessText : readMoreText}
        </button>
      )}
      </div>
      
      {showReadMore && isOverflowing && !isExpanded &&(
        <button
          onClick={toggleExpanded}
          className={cn(
            "mt-1 transition-colors duration-200",
            isExpanded ? readLessClassName : readMoreClassName
          )}
        >
          {isExpanded ? readLessText : readMoreText}
        </button>
      )}
    </div>
  );
};

export default ClampedText; 