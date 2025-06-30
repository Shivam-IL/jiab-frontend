"use client";

import { IInput } from "@/interfaces";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Calendar from "@/components/Calendar";

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
  errorClassName = "",
  onBlur,
  placeholderClassName = 'placeholder:text-[rgba(0,0,0,0.3)]',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState<"top" | "bottom">(
    "bottom"
  );
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

  const calculateDropdownPosition = () => {
    if (!dropdownRef.current) return "bottom";

    const rect = dropdownRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = 200; // max-h-[200px]
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    // If there's not enough space below but enough space above, position above
    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      return "top";
    }

    return "bottom";
  };

  const handleDropdownToggle = () => {
    if (!readonly) {
      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);

      if (newIsOpen) {
        // Calculate position when opening
        setDropdownPosition(calculateDropdownPosition());
      }
    }
  };

  const filteredOptions = options.filter(
    (option: { value: string; label: string }) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (type === "date") {
    console.log("🎯 INPUT COMPONENT IS RENDERING!");
    console.log("Input component rendered with value:", value);
    console.log("Input component type of value:", typeof value);
    return (
      <Calendar
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        error={error}
        fontSize={fontSize}
        paddingClass={paddingClass}
        bgColor={bgColor}
      />
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
            error !== ""
              ? "border-[#FD0202] border-[1px]"
              : "border border-transparent"
          } outline-none ${fontSize} font-[400] ${paddingClass} ${bgColor} rounded-[100px] transition-all duration-200 hover:border-gray-200 focus:border-[#11A64B] focus-visible:border-[#11A64B] ${
            isOpen ? "border-[#11A64B]" : ""
          }`}
          onClick={handleDropdownToggle}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleDropdownToggle();
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
          <div
            className={`absolute left-0 right-0 bg-white rounded-[12px] shadow-lg z-10 max-h-[200px] overflow-y-auto border border-gray-100 ${
              dropdownPosition === "top" ? "bottom-full mb-1" : "top-full mt-1"
            }`}
          >
            {isSearchable && (
              <div className="p-2 border-b border-gray-100">
                <input
                  type="text"
                  className={`w-full outline-none ${fontSize} font-[400] px-3 py-2 rounded-[100px] border border-transparent transition-all duration-200 hover:border-gray-200 focus:border-[#11A64B]`}
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
          <span
            className={`${errorClassName} text-[#FD0202] font-[400] text-[12px]`}
          >
            {error}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[6px] w-full">
      {type !== "textarea" && (
        <input
          className={`w-full ${className} ${
            error !== ""
              ? "border-[#FD0202] border-[1px]"
              : readonly
              ? ""
              : "hover:border-gray-200 focus:border-[#11A64B] border border-transparent"
          } ${
            readonly ? "cursor-not-allowed" : "cursor-pointer"
          } outline-none ${fontSize} ${
            readonly ? 'text-[rgba(0,0,0,0.3)]' : `text-black ${placeholderClassName}`
          } font-[400] ${paddingClass} leading-tight ${
            readonly ? "bg-[#f9f9f9]" : bgColor
          } ${borderRadius}  transition-all duration-200 `}
          onChange={(event) => onChange(event.target.name, event.target.value)}
          type={type}
          readOnly={readonly}
          value={value}
          placeholder={placeholder}
          name={name}
          {...(rows ? { rows } : {})}
          onBlur={onBlur}
        />
      )}
      {type === "textarea" && (
        <textarea
          className={`w-full ${className} ${
            error !== "" ? "border-[#FD0202] border-[1px]" : ""
          } outline-none ${fontSize} font-[400] placeholder:text-[rgba(0,0,0,0.3)] ${paddingClass} ${bgColor} ${borderRadius} border border-transparent transition-all duration-200 hover:border-gray-200 focus:border-[#11A64B]`}
          onChange={(event) => onChange(event.target.name, event.target.value)}
          value={value}
          placeholder={placeholder}
          name={name}
          {...(rows ? { rows } : {})}
        />
      )}
      {error !== "" && (
        <span
          className={`${errorClassName} text-[#FD0202] font-[400] text-[12px] pl-[10px]`}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
