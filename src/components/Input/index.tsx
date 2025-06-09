"use client";

import { aktivGrotesk } from "@/app/layout";
import { IInput } from "@/interfaces";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Input: React.FC<IInput> = ({
  type,
  value,
  placeholder,
  name,
  onChange,
  error = "",
  readonly = false,
  fontSize = "text-[14px]",
  bgColor = "bg-[#F3F3F3]",
  options = [],
  isSearchable = false,
  paddingClass = "pl-[16px] pr-[16px] py-[16px] md:py-[19px] md:pl-[25px]",
  className = "",
  borderRadius = "rounded-[100px]",
  rows,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(
    (option: { value: string; label: string }) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (type === "date") {
    const parseDate = (dateString: string) => {
      const [year, month, day] = dateString.split("/");
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    };

    return (
      <div className="flex flex-col gap-[6px] w-full">
        <Popover>
          <PopoverTrigger asChild>
            <div
              className={`w-full cursor-pointer flex items-center justify-between ${
                error !== "" ? "border-[#FD0202] border-[1px]" : ""
              } outline-none ${fontSize} font-[400] ${
                aktivGrotesk.className
              } ${paddingClass} ${bgColor} rounded-[100px] border border-transparent transition-all duration-200 hover:border-gray-200 data-[state=open]:border-[#11A64B] focus-visible:border-[#11A64B]`}
            >
              <span className={!value ? "text-[rgba(0,0,0,0.3)]" : ""}>
                {value || placeholder}
              </span>
              <CalendarIcon className="h-5 w-5" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value ? parseDate(value) : undefined}
              onSelect={(date) => {
                if (date) {
                  const formattedDate = format(date, "yyyy/MM/dd");
                  onChange(name, formattedDate);
                }
              }}
              initialFocus
              className="rounded-md border"
              classNames={{
                day_selected:
                  "bg-[#11A64B] text-white hover:bg-[#11A64B] hover:text-white focus:bg-[#11A64B] focus:text-white",
                day_today: "bg-accent text-accent-foreground",
                day_range_middle: "bg-[#11A64B] text-white",
                day_range_end: "bg-[#11A64B] text-white",
                day_range_start: "bg-[#11A64B] text-white",
              }}
            />
          </PopoverContent>
        </Popover>
        {error !== "" && (
          <span className="text-[#FD0202] font-[400] text-[12px]">{error}</span>
        )}
      </div>
    );
  }

  if (type === "select") {
    return (
      <div
        className="flex flex-col gap-[6px] w-full relative"
        ref={dropdownRef}
      >
        <div
          className={`w-full cursor-pointer flex items-center justify-between ${
            error !== "" ? "border-[#FD0202] border-[1px]" : ""
          } outline-none ${fontSize} font-[400] ${
            aktivGrotesk.className
          } ${paddingClass} ${bgColor} rounded-[100px] border border-transparent transition-all duration-200 hover:border-gray-200 focus-visible:border-[#11A64B] ${
            isOpen ? "border-[#11A64B]" : ""
          }`}
          onClick={() => !readonly && setIsOpen(!isOpen)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (!readonly) {
                setIsOpen(!isOpen);
              }
            }
          }}
        >
          <span
            className={!value ? "text-[rgba(0,0,0,0.3)] leading-tight" : ""}
          >
            {value
              ? options.find(
                  (opt: { value: string; label: string }) => opt.value === value
                )?.label
              : placeholder}
          </span>
          <ChevronDown
            className={`h-5 w-5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-[12px] shadow-lg z-10 max-h-[200px] overflow-y-auto border border-gray-100">
            {isSearchable && (
              <div className="p-2 border-b border-gray-100">
                <input
                  type="text"
                  className={`w-full outline-none ${fontSize} font-[400] ${aktivGrotesk.className} px-3 py-2 rounded-[100px] border border-transparent transition-all duration-200 hover:border-gray-200 focus:border-[#11A64B]`}
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            <div className="py-1">
              {filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`px-[16px] py-[12px] cursor-pointer transition-colors duration-200 ${
                    option.value === value
                      ? "bg-[#11A64B] text-white hover:bg-[#11A64B] hover:text-white"
                      : "hover:bg-[#11A64B]/10"
                  }`}
                  onClick={() => {
                    onChange(name, option.value);
                    setIsOpen(false);
                    setSearchQuery("");
                  }}
                >
                  {option.label}
                </div>
              ))}
              {filteredOptions.length === 0 && (
                <div className="px-[16px] py-[12px] text-gray-500">
                  No options found
                </div>
              )}
            </div>
          </div>
        )}
        {error !== "" && (
          <span className="text-[#FD0202] font-[400] text-[12px]">{error}</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[6px] w-full">
      {type !== "textarea" && (
        <input
          className={`w-full ${className} ${
            error !== "" ? "border-[#FD0202] border-[1px]" : ""
          } outline-none ${fontSize} font-[400] placeholder:text-[rgba(0,0,0,0.3)] ${
            aktivGrotesk.className
          } ${paddingClass} leading-tight ${bgColor} ${borderRadius} border border-transparent transition-all duration-200 hover:border-gray-200 focus:border-[#11A64B]`}
          onChange={(event) => onChange(event.target.name, event.target.value)}
          type={type}
          readOnly={readonly}
          value={value}
          placeholder={placeholder}
          name={name}
          {...(rows ? { rows } : {})}
        />
      )}
      {type === "textarea" && (
        <textarea
          className={`w-full ${className} ${
            error !== "" ? "border-[#FD0202] border-[1px]" : ""
          } outline-none ${fontSize} font-[400] placeholder:text-[rgba(0,0,0,0.3)] ${
            aktivGrotesk.className
          } ${paddingClass} ${bgColor} ${borderRadius} border border-transparent transition-all duration-200 hover:border-gray-200 focus:border-[#11A64B]`}
          onChange={(event) => onChange(event.target.name, event.target.value)}
          value={value}
          placeholder={placeholder}
          name={name}
          {...(rows ? { rows } : {})}
        />
      )}
      {error !== "" && (
        <span className="text-[#FD0202] font-[400] text-[12px]">{error}</span>
      )}
    </div>
  );
};

export default Input;
