"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, ChevronDown } from "lucide-react";
import { ILogoAndProfileImageProps } from "@/interfaces";
import NotificationItem from "../../NotificationItem/NotificationItem";

const DesktopNav: React.FC<ILogoAndProfileImageProps> = ({
  spriteLogo,
  profileImage,
}) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const exploreDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  const exploreMenuItems = [
    { id: 1, label: "Scroll & LOL", href: "/scroll-and-lol" },
    { id: 2, label: "PJ Challenge?", href: "/pj-challenge" },
    { id: 3, label: "Pick your mood", href: "/pick-mood" },
    { id: 4, label: "Joke Box", href: "/joke-box" },
    { id: 5, label: "HALL-OF-LAME 😜", href: "/hall-of-lame" },
    { id: 6, label: "Refer A Friend", href: "/refer" },
    { id: 7, label: "Have an Invite Code?", href: "/invite" },
  ];

  const languages = [
    { value: "en", id: "1", label: "ENGLISH" },
    { value: "hi", id: "2", label: "हिन्दी" },
    { value: "te", id: "3", label: "తెలుగు" },
    { value: "or", id: "4", label: "ଓରିୟା" },
    { value: "ba", id: "5", label: "বাংলা" },
    { value: "mr", id: "6", label: "मराठी" },
    { value: "kn", id: "7", label: "ಕನ್ನಡ" },
    { value: "bho", id: "9", label: "भोजपुरी" },
    { value: "mai", id: "10", label: "मैथिली" },
  ];

  // Sample notification data based on the image
  const notifications = [
    {
      id: 1,
      title: "Let's Break The Ice",
      description:
        "Complete your profile to earn more Comic Coins, laugh and gain access to our treasured rewards!",
      timestamp: "0 min",
      iconBg: "bg-green",
    },
    {
      id: 2,
      title: "Cha-Ching Alert!",
      description: "You just earned 1 Comic Coins! 🪙",
      timestamp: "20 hr",
      iconBg: "bg-green",
    },
    {
      id: 3,
      title: "Cha-Ching Alert!",
      description: "You just earned 1 Comic Coins! 🪙",
      timestamp: "20 hr",
      iconBg: "bg-green",
    },
    {
      id: 4,
      title: "Cha-Ching Alert!",
      description: "You just earned 1 Comic Coins! 🪙",
      timestamp: "20 hr",
      iconBg: "bg-green",
    },
    {
      id: 5,
      title: "Cha-Ching Alert!",
      description: "You just earned 1 Comic Coins! 🪙",
      timestamp: "20 hr",
      iconBg: "bg-green",
    },
    {
      id: 6,
      title: "Let's Break The Ice",
      description:
        "Complete your profile to earn more Comic Coins, laugh and gain access to our treasured rewards!",
      timestamp: "22 hr",
      iconBg: "bg-green",
    },
    {
      id: 7,
      title: "Let's Break The Ice",
      description:
        "Complete your profile to earn more Comic Coins, laugh and gain access to our treasured rewards!",
      timestamp: "120 hr",
      iconBg: "bg-green",
    },
    {
      id: 8,
      title: "Let's Break The Ice",
      description:
        "Complete your profile to earn more Comic Coins, laugh and gain access to our treasured rewards!",
      timestamp: "138 hr",
      iconBg: "bg-green",
    },
    {
      id: 9,
      title: "Cha-Ching Alert!",
      description: "You just earned 1 Comic Coins! 🪙",
      timestamp: "160 hr",
      iconBg: "bg-green",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLangDropdownOpen(false);
      }
      if (
        exploreDropdownRef.current &&
        !exploreDropdownRef.current.contains(event.target as Node)
      ) {
        setIsExploreDropdownOpen(false);
      }
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target as Node)
      ) {
        setIsNotificationDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      setIsVisible(!isScrollingDown || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const getSelectedLanguageLabel = () => {
    const selected = languages.find((lang) => lang.value === selectedLang);
    return selected ? selected.label : "ENGLISH";
  };

  const isLoggedIn: boolean = true;

  return (
    <div
      className={`w-full bg-white fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center container mx-auto py-4">
        <div className="flex items-center space-x-12">
          <Link href="/">
            <Image src={spriteLogo} alt="Sprite Logo" width={110} />
          </Link>

          <div className="flex items-center space-x-8">
            <div className="relative" ref={exploreDropdownRef}>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setIsExploreDropdownOpen(!isExploreDropdownOpen)}
              >
                <span className="mr-1">Explore</span>
                <ChevronDown className="h-5 w-5" />
              </div>

              {isExploreDropdownOpen && (
                <div className="absolute top-full left-0 mt-4 w-[300px] bg-white border border-[#ebebeb] rounded-lg shadow-lg z-30 pb-4 pt-2">
                  <div className="flex flex-col space-y-1">
                    {exploreMenuItems.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className="px-6 py-2 hover:bg-gray-50 text-md font-normal"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div className="px-6 pt-2">
                      <Link
                        href="/vote"
                        className="block bg-green text-white rounded-lg p-3"
                      >
                        <div className="text-sm font-medium">
                          Vote for the funniest PJs
                        </div>
                        <div className="text-md font-bold">
                          Collect Comic Coins!
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link href="/contest" className="cursor-pointer">
              Contest
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-[24px]">
          {isLoggedIn ? (
            <div className="relative" ref={notificationDropdownRef}>
              <div
                className="cursor-pointer"
                onClick={() =>
                  setIsNotificationDropdownOpen(!isNotificationDropdownOpen)
                }
              >
                <Bell className="h-6 w-6" />
                <div className="absolute -top-0.5 right-0 bg-yellow text-black rounded-full w-[12px] h-[12px] flex items-center justify-center text-[6.86px] font-semibold">
                  10
                </div>
              </div>

              {isNotificationDropdownOpen && (
                <div className="absolute top-full right-0 mt-4 w-[450px] bg-white border border-[#ebebeb] rounded-lg shadow-lg z-30 max-h-[500px] overflow-y-auto">
                  <div className="py-2">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="pl-4 pr-8">
                        <NotificationItem

                          title={notification.title}
                          description={notification.description}
                          timestamp={notification.timestamp}
                          iconBg={notification.iconBg}
                          titleFontSize={{
                            desktop: "md:text-[16px]",
                          }}
                          descriptionFontSize={{
                            desktop: "md:text-[12px]",
                          }}
                          timestampFontSize={{
                            desktop: "md:text-[10px] mr-2",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-6 h-6" />
          )}
          <div className="relative w-[120px]" ref={langDropdownRef}>
            <div
              className="border border-black rounded px-3 py-1 flex justify-between items-center cursor-pointer"
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            >
              <span className="mr-1">{getSelectedLanguageLabel()}</span>
              <ChevronDown className="h-5 w-5" />
            </div>

            {isLangDropdownOpen && (
              <div className="absolute top-full mt-1 w-auto min-w-full rounded-md shadow-md z-20 bg-white">
                {languages.map((lang) => (
                  <div
                    key={lang.id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedLang(lang.value);
                      setIsLangDropdownOpen(false);
                    }}
                  >
                    {lang.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white cursor-pointer">
            <Image src={profileImage} alt="Profile Image" width={40} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
