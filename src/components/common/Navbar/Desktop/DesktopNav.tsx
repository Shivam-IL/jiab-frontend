"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, ChevronDown, ChevronRight } from "lucide-react";
import { ILogoAndProfileImageProps } from "@/interfaces";
import NotificationItem from "../../NotificationItem/NotificationItem";
import {
  ICONS_NAMES,
  INVITE_CODE_POPUP_DATA,
  REFER_NOW_MODAL_DATA,
  REFFERAL_STATUS_POPUP_DATA,
} from "@/constants";
import ReferNowModal from "../../ReferNowModal";
import InviteCodePopupWrapper from "@/components/InviteCodePopus";
import CustomPopupWrapper from "../../CustomPopupWrapper";
import AktivGroteskText from "../../AktivGroteskText";
import useAppDispatch from "@/hooks/useDispatch";
import {
  updateIsAuthenticated,
  updateLoginModal,
  updateOtpFilled,
  updateOtpStatus,
  updateOtpVerified,
  updateToken,
} from "@/store/auth/auth.slice";
import SvgIcons from "../../SvgIcons";
import useAppSelector from "@/hooks/useSelector";
import { removeLocalStorageItem } from "@/utils";
import { LOCAL_STORAGE_KEYS } from "@/api/client/config";
import useLogout from "@/hooks/useLogout";

const DesktopNav: React.FC<ILogoAndProfileImageProps> = ({
  spriteLogo,
  profileImage,
}) => {
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const exploreDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const exploreMenuItems = [
    { id: 1, label: "Scroll & LOL", href: "/scroll-and-lol" },
    { id: 2, label: "PJ Challenge?", href: "/submit-your-joke" },
    { id: 3, label: "Pick your mood", href: "/pick-mood" },
    { id: 4, label: "Joke Box", href: "/user-generated-jokes" },
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
    { value: "ta", id: "11", label: "தமிழ்" },
    { value: "tu", id: "12", label: "ತುಳು" },
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
    const selected = languages.find((lang) => lang.value === selectedLang);
    return selected ? selected.label : "ENGLISH";
  };

  const [refer1, setRefer1] = useState<boolean>(false);
  const [refer2, setRefer2] = useState<boolean>(false);
  const [refer3, setRefer3] = useState<boolean>(false);
  const [referPhoneNumber, setReferPhoneNumber] = useState<string>("");
  const [referStatus1, setReferStatus1] = useState<boolean>(false);
  const [referStatus2, setReferStatus2] = useState<boolean>(false);
  const [referStatus3, setReferStatus3] = useState<boolean>(false);

  const { logoutHandler } = useLogout();

  const [invite1, setInvite1] = useState<boolean>(false);
  const [invite2, setInvite2] = useState<boolean>(false);
  const [inviteCode, setInviteCode] = useState<string>("");

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleChange = (key: string, value: string) => {
    setReferPhoneNumber(value);
  };

  const handleChangeInvite = (key: string, value: string) => {
    setInviteCode(value);
  };

  const isLoggedIn: boolean = true;

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
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setIsExploreDropdownOpen(!isExploreDropdownOpen)}
              >
                <span className="mr-1">Explore</span>
                {isExploreDropdownOpen ? (
                  <ChevronDown className="h-5 w-5" />
                ) : (
                  <ChevronRight className="h-5 w-5" />
                )}
              </div>

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
                        href="/my-wallet"
                        className="block bg-green text-white rounded-lg p-3"
                        onClick={() => setIsExploreDropdownOpen(false)}
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

          <div
            className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-black cursor-pointer relative"
            ref={profileDropdownRef}
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            {isLoggedIn ? (
              <Image src={profileImage} alt="Profile Image" width={40} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl font-bold">
                ?
              </div>
            )}

            {isProfileDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-[#ebebeb] rounded-lg shadow-lg z-30 text-[18px] min-w-[183px]">
                {isLoggedIn ? (
                  <>
                    {isAuthenticated && (
                      <Link
                        href="/profile"
                        className="hover:bg-gray-50 flex justify-between items-center px-[20px] py-[10px]"
                      >
                        My Profile
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
                        Comic Coins
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
                        <span>Logout</span>
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
                        <span>Login</span>
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
                    Login
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {refer1 && (
        <ReferNowModal
          onSubmit={() => {
            setRefer1(false);
            setRefer2(true);
          }}
          title={REFER_NOW_MODAL_DATA.DEFAULT.title}
          subtitle={REFER_NOW_MODAL_DATA.DEFAULT.subtitle}
          ctaText={REFER_NOW_MODAL_DATA.DEFAULT.ctaText}
          phoneNumber={referPhoneNumber}
          onChange={handleChange}
          open={refer1}
          onClose={() => {
            setRefer1(false);
            setRefer2(true);
          }}
        />
      )}
      {refer2 && (
        <ReferNowModal
          onSubmit={() => {
            setRefer2(false);
            setRefer3(true);
          }}
          title={REFER_NOW_MODAL_DATA.PRANK_US.title}
          subtitle={REFER_NOW_MODAL_DATA.PRANK_US.subtitle}
          ctaText={REFER_NOW_MODAL_DATA.PRANK_US.ctaText}
          phoneNumber={referPhoneNumber}
          onChange={handleChange}
          open={refer2}
          onClose={() => {
            setRefer2(false);
            setRefer3(true);
          }}
        />
      )}
      {refer3 && (
        <ReferNowModal
          onSubmit={() => {
            setRefer3(false);
            setReferStatus1(true);
          }}
          title={REFER_NOW_MODAL_DATA.SELF_LOVE.title}
          subtitle={REFER_NOW_MODAL_DATA.SELF_LOVE.subtitle}
          ctaText={REFER_NOW_MODAL_DATA.SELF_LOVE.ctaText}
          phoneNumber={referPhoneNumber}
          onChange={handleChange}
          open={refer3}
          onClose={() => {
            setRefer3(false);
            setReferStatus1(true);
          }}
        />
      )}
      {referStatus1 && (
        <CustomPopupWrapper
          open={referStatus1}
          onClose={() => {
            setReferStatus1(false);
            setReferStatus2(true);
          }}
          icon={REFFERAL_STATUS_POPUP_DATA.EASY.ICON}
          title={REFFERAL_STATUS_POPUP_DATA.EASY.TITLE}
          subtitle={REFFERAL_STATUS_POPUP_DATA.EASY.SUB_TITLE}
        >
          <div className="flex flex-col gap-[20px]">
            <AktivGroteskText
              fontSize="text-[16px]"
              fontWeight="font-[700]"
              className="text-[#00953B] text-center"
              text={REFFERAL_STATUS_POPUP_DATA.EASY.SECOND_TEXT}
            />
            <AktivGroteskText
              fontSize="text-[12px]"
              fontWeight="font-[400] text-center"
              text={REFFERAL_STATUS_POPUP_DATA.EASY.THIRD_TEXT}
            />
          </div>
        </CustomPopupWrapper>
      )}
      {referStatus2 && (
        <CustomPopupWrapper
          open={referStatus2}
          onClose={() => {
            setReferStatus2(false);
          }}
          icon={REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.ICON}
          title={REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.TITLE}
          subtitle={REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.SUB_TITLE}
          singleButton={REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.SINGLE_BUTTON}
          singleButtonText={
            REFFERAL_STATUS_POPUP_DATA.PAST_ON_US.SINGLE_BUTTON_TEXT
          }
          singleButtonOnClick={() => {
            setReferStatus2(false);
            setReferStatus3(true);
          }}
        />
      )}
      {referStatus3 && (
        <CustomPopupWrapper
          open={referStatus3}
          onClose={() => {
            setReferStatus3(false);
          }}
          icon={REFFERAL_STATUS_POPUP_DATA.TRUE_COLORS.ICON}
          title={REFFERAL_STATUS_POPUP_DATA.TRUE_COLORS.TITLE}
          subtitle={REFFERAL_STATUS_POPUP_DATA.TRUE_COLORS.SUB_TITLE}
          singleButton={REFFERAL_STATUS_POPUP_DATA.TRUE_COLORS.SINGLE_BUTTON}
          singleButtonText={
            REFFERAL_STATUS_POPUP_DATA.TRUE_COLORS.SINGLE_BUTTON_TEXT
          }
          singleButtonOnClick={() => {
            setReferStatus3(false);
          }}
        />
      )}
      {invite1 && (
        <InviteCodePopupWrapper
          title={INVITE_CODE_POPUP_DATA.INVITE_CODE.TITLE}
          subtitle={INVITE_CODE_POPUP_DATA.INVITE_CODE.SUB_TITLE}
          ctaText={INVITE_CODE_POPUP_DATA.INVITE_CODE.CTA_TEXT}
          code={inviteCode}
          onChange={handleChangeInvite}
          open={invite1}
          onClose={() => {
            setInvite1(false);
            setInvite2(true);
          }}
        />
      )}
      {invite2 && (
        <InviteCodePopupWrapper
          title={INVITE_CODE_POPUP_DATA.CHEAT_CODE_NOT_ALLOWED.TITLE}
          subtitle={INVITE_CODE_POPUP_DATA.CHEAT_CODE_NOT_ALLOWED.SUB_TITLE}
          ctaText={INVITE_CODE_POPUP_DATA.CHEAT_CODE_NOT_ALLOWED.CTA_TEXT}
          code={inviteCode}
          onChange={handleChangeInvite}
          open={invite2}
          onClose={() => {
            setInvite2(false);
          }}
        />
      )}
    </div>
  );
};

export default DesktopNav;
