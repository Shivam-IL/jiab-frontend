"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, ChevronDown, ChevronRight } from "lucide-react";
import { ILogoAndProfileImageProps } from "@/interfaces";
import NotificationItem from "../../NotificationItem/NotificationItem";
import { GA_EVENTS, ICONS_NAMES } from "@/constants";
import useAppDispatch from "@/hooks/useDispatch";
import { updateLoginModal } from "@/store/auth/auth.slice";
import SvgIcons from "../../SvgIcons";
import useAppSelector from "@/hooks/useSelector";
import useLogout from "@/hooks/useLogout";
import ReferNowComponent from "@/components/common/ReferNowComponent";
import InviteCodeComponent from "@/components/common/InviteCodeComponent";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageHydration from "../../LanguageHydration";
import { useCMSData } from "@/data";
import { triggerGAEvent } from "@/utils/gTagEvents";
import { useRouter } from "next/navigation";
import { DesktopBoxIds } from "../../HomePageDesktopOnboarding";
import { LANGUAGE_MNEMONICS } from "@/constants";

const DesktopNav: React.FC<ILogoAndProfileImageProps> = ({
  spriteLogo,
  profileImage,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { selectedLanguage, changeLanguage } = useLanguage();
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const exploreDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    setMounted(true);
  }, []);

  const cmsData = useCMSData(mounted);

  const exploreMenuItems = [
    { id: 1, label: cmsData.navBar.scrollAndLol, href: "/scroll-and-lol" },
    { id: 2, label: cmsData.navBar.pjChallenge, href: "/submit-your-joke" },
    { id: 3, label: cmsData.navBar.pickYourMood, href: "/pick-mood" },
    { id: 4, label: cmsData.navBar.jokeBox, href: "/user-generated-jokes" },
    { id: 5, label: cmsData.navBar.hallOfLame, href: "/hall-of-lame" },
    { id: 6, label: cmsData.navBar.referAFriend, href: "/refer" },
    { id: 7, label: cmsData.navBar.haveAnInviteCode, href: "/invite" },
  ];

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
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getSelectedLanguageLabel = () => {
    const selected = languages.find((lang) => lang.value === selectedLanguage);
    return selected ? selected.label : "ENGLISH";
  };

  const [refer1, setRefer1] = useState<boolean>(false);

  const { logoutHandler } = useLogout();

  const [invite1, setInvite1] = useState<boolean>(false);

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.profile);

  const loginHandler = () => {
    dispatch(updateLoginModal({ loginModal: true }));
  };

  return (
    <div className="w-full bg-white fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center container mx-auto py-4">
        <div className="flex items-center space-x-12">
          <Link href="/">
            <Image src={spriteLogo} alt="Sprite Logo" width={110} />
          </Link>

          <div className="flex items-center space-x-8">
            <div className="relative" ref={exploreDropdownRef}>
              <button
                id={DesktopBoxIds.EXPLORE}
                className="flex items-center cursor-pointer"
                onClick={() => setIsExploreDropdownOpen(!isExploreDropdownOpen)}
              >
                <span className="mr-1">{cmsData.navBar.explore}</span>
                {isExploreDropdownOpen ? (
                  <ChevronDown className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </button>

              {isExploreDropdownOpen && (
                <div className="absolute top-full left-0 mt-4 w-[300px] bg-white border border-[#ebebeb] rounded-lg shadow-lg z-30 pb-4 pt-2">
                  <div className="flex flex-col space-y-1">
                    {exploreMenuItems.map((item) => {
                      if (item.label === "Refer A Friend") {
                        return (
                          <button
                            onClick={() => {
                              setRefer1(true);
                            }}
                            key={item.id}
                            className="px-6 py-2 hover:bg-gray-50 text-start text-md font-normal"
                          >
                            {item.label}
                          </button>
                        );
                      }
                      if (item.label === "Have an Invite Code?") {
                        return (
                          <button
                            onClick={() => {
                              setInvite1(true);
                            }}
                            key={item.id}
                            className="px-6 py-2 text-start hover:bg-gray-50 text-md font-normal"
                          >
                            {item.label}
                          </button>
                        );
                      }
                      if (item.label === cmsData.navBar.pjChallenge) {
                        return (
                          <button
                            onClick={() => {
                              triggerGAEvent(GA_EVENTS.SPRITE_J24_SUBMIT_JOKE);
                              setIsExploreDropdownOpen(false);
                              router.push(item.href);
                            }}
                            key={item.id}
                            className="px-6 py-2 text-start hover:bg-gray-50 text-md font-normal"
                          >
                            {item.label}
                          </button>
                        );
                      }
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          className="px-6 py-2 hover:bg-gray-50 text-md font-normal"
                          onClick={() => setIsExploreDropdownOpen(false)}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                    <div className="px-6 pt-2">
                      <Link
                        href="/user-generated-jokes"
                        className="block bg-green text-white rounded-lg p-3"
                        onClick={() => setIsExploreDropdownOpen(false)}
                      >
                        <div className="text-sm font-medium">
                          {cmsData.navBar.navBarInsideExploreBannerHeading}
                        </div>
                        <div className="text-md font-bold">
                          {cmsData.navBar.navBarInsideExploreBannerSubHeading}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              id={DesktopBoxIds.CONTEST}
              href="/contest"
              className="cursor-pointer"
            >
              {cmsData.navBar.contest}
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-[24px]">
          {isAuthenticated ? (
            <div className="relative" ref={notificationDropdownRef}>
              <button
                className="cursor-pointer"
                onClick={() =>
                  setIsNotificationDropdownOpen(!isNotificationDropdownOpen)
                }
              >
                <Bell className="h-6 w-6" />
                <div className="absolute -top-0.5 right-0 bg-yellow text-black rounded-full w-[12px] h-[12px] flex items-center justify-center text-[6.86px] font-semibold">
                  3
                </div>
              </button>

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
          <LanguageHydration
            fallback={
              <div className="relative w-[120px]">
                <div className="border border-black rounded px-3 py-1 flex justify-between items-center cursor-pointer">
                  <span className="mr-1">ENGLISH</span>
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>
            }
          >
            <div className="relative" ref={langDropdownRef}>
              <button
                className="w-[116.71px] border border-black rounded px-3 py-1 flex justify-between items-center cursor-pointer"
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              >
                <span id={DesktopBoxIds.LANGUAGE} className="mr-1">
                  {getSelectedLanguageLabel()}
                </span>
                <ChevronDown className="h-5 w-5" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute top-full mt-1 w-[116.71px] rounded-md shadow-md z-20 bg-white">
                  {languages.map((lang) => (
                    <div
                      key={lang.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
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

          <div
            className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-black cursor-pointer relative"
            ref={profileDropdownRef}
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <div id={DesktopBoxIds.PROFILE_ELEMENT}>
              {isAuthenticated ? (
                user?.userImage ? (
                  <img
                    src={user?.userImage ?? ""}
                    className="rounded-full w-[40px] h-[40px]"
                    alt="Profile Image"
                  />
                ) : (
                  <Image
                    src={profileImage}
                    className="rounded-full w-[40px] h-[40px]"
                    alt="Profile Image"
                    width={40}
                  />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl font-bold">
                  <Image
                    src={profileImage}
                    className="rounded-full w-[40px] h-[40px]"
                    alt="Profile Image"
                    width={40}
                  />
                </div>
              )}
            </div>

            {isProfileDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-[#ebebeb] rounded-lg shadow-lg z-30 text-[18px] min-w-[183px]">
                {isAuthenticated ? (
                  <>
                    {isAuthenticated && (
                      <Link
                        href="/profile"
                        className="hover:bg-gray-50 flex justify-between items-center px-[20px] py-[10px]"
                      >
                        {cmsData.navBar.myProfile}
                        <SvgIcons
                          name={ICONS_NAMES.PROFILE_ICON}
                          width={20}
                          height={20}
                        />
                      </Link>
                    )}
                    {isAuthenticated && (
                      <Link
                        href="/my-wallet"
                        className="px-[20px] py-[10px] hover:bg-gray-50 flex justify-between items-center"
                      >
                        {cmsData.navBar.comicCoins}
                        <SvgIcons
                          name={ICONS_NAMES.WALLET_ICON}
                          width={20}
                          height={20}
                        />
                      </Link>
                    )}
                    {isAuthenticated && (
                      <button
                        onClick={logoutHandler}
                        className="w-full text-left px-[20px] py-[10px] hover:bg-gray-50 text-red-500 flex items-center justify-between"
                      >
                        <span>{cmsData.navBar.logout}</span>
                        <SvgIcons
                          name={ICONS_NAMES.LOGOUT_ICON}
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    {!isAuthenticated && (
                      <button
                        onClick={loginHandler}
                        className="w-full text-left px-[20px] py-[10px] hover:bg-gray-50 text-red-500 flex items-center justify-between"
                      >
                        <span>{cmsData.navBar.login}</span>
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-50"
                    onClick={() => {
                      dispatch(updateLoginModal({ loginModal: true }));
                      setIsProfileDropdownOpen(false);
                    }}
                  >
                    {cmsData.navBar.login}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <ReferNowComponent
        setOpen={setRefer1}
        open={refer1}
        onClose={() => {
          setRefer1(false);
        }}
      />

      <InviteCodeComponent
        setOpen={setInvite1}
        open={invite1}
        onClose={() => {
          setInvite1(false);
        }}
      />
    </div>
  );
};

export default DesktopNav;
