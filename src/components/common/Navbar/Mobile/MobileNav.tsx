"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { ILogoAndProfileImageProps } from "@/interfaces";
import Image from "next/image";
import { Bell, ChevronDown } from "lucide-react";
import hamburgerMenu from "../../../../../public/other-svgs/hamburger-menu.svg";
import Sidebar from "./Sidebar";
import {
  ROUTES_WHICH_DOES_NOT_NEED_DEFAULT_NAVBAR_FOR_MOBILE,
  LANGUAGE_MNEMONICS,
} from "../../../../constants/index";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BoxIds } from "../../CircularBoxesModal";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageHydration from "../../LanguageHydration";
import useAppSelector from "@/hooks/useSelector";
import { useGetNotificationCount } from "@/api/hooks/NotificationHooks";

const MobileNav: React.FC<ILogoAndProfileImageProps> = ({
  spriteLogo,
  profileImage,
}) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const { selectedLanguage, changeLanguage } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hideNavbar, setHideNavbar] = useState<boolean>(false);
  const isVisible = true;
  const { user } = useAppSelector((state) => state.profile);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Fetch notification count
  const { data: notificationCountResponse } = useGetNotificationCount();

  // Extract notification count from response
  const notificationCount = notificationCountResponse?.data?.count || 0;

  console.log(profileImage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSidebarOpen]);

  const languages = [
    { value: LANGUAGE_MNEMONICS.ENGLISH, id: "1", label: "ENGLISH" },
    { value: LANGUAGE_MNEMONICS.HINDI, id: "2", label: "हिन्दी" },
    { value: LANGUAGE_MNEMONICS.TELUGU, id: "3", label: "తెలుగు" },
    { value: LANGUAGE_MNEMONICS.ORIYA, id: "4", label: "ଓରିୟା" },
    { value: LANGUAGE_MNEMONICS.BENGALI, id: "5", label: "বাংলা" },
    { value: LANGUAGE_MNEMONICS.MARATHI, id: "6", label: "मराठी" },
    { value: LANGUAGE_MNEMONICS.KANNADA, id: "7", label: "ಕನ್ನಡ" },
    { value: LANGUAGE_MNEMONICS.BHOJPURI, id: "8", label: "भोजपुरी" },
    { value: LANGUAGE_MNEMONICS.MAITHILI, id: "9", label: "मैथिली" },
    { value: LANGUAGE_MNEMONICS.TAMIL, id: "10", label: "தமிழ்" },
    { value: LANGUAGE_MNEMONICS.TULU, id: "11", label: "ತುಳು" },
  ];

  const getSelectedLanguageLabel = () => {
    return (
      languages.find((lang) => lang.value === selectedLanguage)?.label ??
      "ENGLISH"
    );
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const pathName = usePathname();

  const handleHideNavbarForMobile = useCallback(() => {
    for (const route of ROUTES_WHICH_DOES_NOT_NEED_DEFAULT_NAVBAR_FOR_MOBILE) {
      if (pathName === route) {
        setHideNavbar(true);
        break;
      } else if (pathName.toString().startsWith(route.toString())) {
        setHideNavbar(true);
        break;
      } else {
        setHideNavbar(false);
      }
    }
  }, [pathName, setHideNavbar]);

  useEffect(() => {
    handleHideNavbarForMobile();
  }, [pathName, handleHideNavbarForMobile]);

  return (
    <>
      <div
        className={`w-full ${
          hideNavbar ? "hidden" : "block"
        } bg-white fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-[17px] pb-[20px] pt-[17.45px] flex items-center relative">
          {/* Menu */}
          <div id={BoxIds.MENU_BAR} className="absolute left-[17px]">
            <button
              onClick={handleSidebarToggle}
              className={`p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 transform hover:scale-110 ${
                isSidebarOpen ? "bg-gray-100 scale-110" : ""
              }`}
              aria-label="Open menu"
            >
              <Image
                src={hamburgerMenu}
                alt="hamburger-menu"
                className={`transition-transform duration-200 ${
                  isSidebarOpen ? "rotate-90" : ""
                }`}
              />
            </button>
          </div>

          {/* Logo - Centered */}
          <div className="flex-1 flex justify-center">
            <Image src={spriteLogo} alt="Sprite Logo" />
          </div>

          <div className="flex items-center gap-4 absolute right-[17px]">
            {/* Bell Icon Conditional Rendering */}
            {isAuthenticated ? (
              <Link
                id={BoxIds.NOTIFICATIONS}
                className="relative"
                href="/notifications"
              >
                <Image
                  src="/other-svgs/bell-icon.svg"
                  alt="Notification"
                  width={20}
                  height={20}
                />
                {notificationCount > 0 && (
                  <div className="absolute -top-0.5 right-0 bg-yellow text-black rounded-full w-[12px] h-[12px] flex items-center justify-center text-[6.86px] font-semibold">
                    {notificationCount > 99 ? "99+" : notificationCount}
                  </div>
                )}
              </Link>
            ) : (
              ""
            )}

            {/* Language Selector */}
            <LanguageHydration
              fallback={
                <div id={BoxIds.LANG} className="relative">
                  <div className="w-[66px] border border-black px-1 py-0.5 flex justify-between items-center cursor-pointer rounded-[2px]">
                    <span className="mr-1 text-[10px]">ENGLISH</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              }
            >
              <div id={BoxIds.LANG} className="relative" ref={langDropdownRef}>
                <div
                  className="w-[66px] border border-black px-1 py-0.5 flex justify-between items-center cursor-pointer rounded-[2px]"
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                >
                  <span className="mr-1 text-[10px]">
                    {getSelectedLanguageLabel()}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </div>

                {isLangDropdownOpen && (
                  <div className="absolute top-full right-0 mt-1 w-auto min-w-full rounded-md shadow-md z-20 bg-white">
                    {languages.map((lang) => (
                      <div
                        key={lang.id}
                        className="px-3 py-1.5 hover:bg-gray-100 cursor-pointer text-[10px]"
                        onClick={() => {
                          changeLanguage(lang.value);
                          setIsLangDropdownOpen(false);
                        }}
                      >
                        {lang.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </LanguageHydration>
          </div>
        </div>
      </div>

      {/* Sidebar Component */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
        spriteLogo={spriteLogo}
      />
    </>
  );
};

export default MobileNav;
