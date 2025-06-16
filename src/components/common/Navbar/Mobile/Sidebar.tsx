"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import useAppDispatch from "@/hooks/useDispatch";
import { updateLoginModal } from "@/store/auth/auth.slice";
import { GA_EVENTS } from "@/constants";
import useAppSelector from "@/hooks/useSelector";
import useLogout from "@/hooks/useLogout";
import { useCMSData } from "@/data";
import ContactCard from "@/components/ContactCard";
import ReferNowComponent from "@/components/common/ReferNowComponent";
import InviteCodeComponent from "../../InviteCodeComponent";
import { triggerGAEvent } from "@/utils/gTagEvents";
import { useRouter } from "next/navigation";
import { useGetComicCoins } from "@/api/hooks/JokeHooks";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  spriteLogo?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, spriteLogo }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Use effect to handle client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get mapped CMS data using our data layer
  const cmsData = useCMSData(mounted);
  const dispatch = useAppDispatch();

  console.log(isAnimating, spriteLogo);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { user, current_balance } = useAppSelector((state) => state.profile);
  const coinImage = "/assets/images/coin-final-sidebar.svg";
  const mainMenuItems = [
    {
      icon: "/other-svgs/home-nav-mobile.svg",
      label: cmsData.navBar.home,
      href: "/",
    },
    {
      icon: "/other-svgs/contest-nav-mobile.svg",
      label: cmsData.navBar.contest,
      href: "/contest",
    },
  ];

  const exploreSubItems = [
    { label: cmsData.navBar.scrollAndLol, href: "/scroll-and-lol" },
    { label: cmsData.navBar.pjChallenge, href: "/submit-your-joke" },
    { label: cmsData.navBar.pickYourMood, href: "/pick-mood" },
    { label: cmsData.navBar.jokeBox, href: "/user-generated-jokes" },
    { label: cmsData.navBar.hallOfLame, href: "/hall-of-lame" },
    { label: cmsData.navBar.referAFriend, href: "/" },
    { label: cmsData.navBar.haveAnInviteCode, href: "/" },
  ];

  const bottomMenuItems = [
    {
      icon: "/other-svgs/contact-nav-mobile.svg",
      label: cmsData.navBar.contactUs,
      href: "/",
    },
    {
      icon: "/other-svgs/faq-nav-mobile.svg",
      label: cmsData.navBar.faqs,
      href: "/faqs",
    },
    {
      icon: "/other-svgs/terms-nav-mobile.svg",
      label: cmsData.navBar.termsAndConditions,
      href: "/terms-and-conditions",
    },
    {
      icon: "/other-svgs/privacy-nav-mobile.svg",
      label: cmsData.navBar.privacyPolicy,
      href: "/privacy-policy",
    },
  ];

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const [refer1, setRefer1] = useState<boolean>(false);

  const [invite1, setInvite1] = useState<boolean>(false);
  const { logoutHandler } = useLogout();
  const router = useRouter();

  const [isContactCardOpen, setIsContactCardOpen] = useState(false);

  // Fetch comic coins data
  const {
    data: comicCoinsData,
    isLoading: isComicCoinsLoading,
    isError: isComicCoinsError,
  } = useGetComicCoins();

  // Get comic coins value with fallback
  const comicCoinsValue =
    comicCoinsData?.data?.comic_coin ?? current_balance ?? 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black z-[60] transition-all duration-300 ease-out ${
          isOpen ? "bg-opacity-70 visible" : "bg-opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[258px] bg-white z-[70] transform transition-all duration-300 ease-out shadow-2xl scrollbar-hide ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } overflow-y-auto`}
      >
        {/* User Profile Section */}
        {isAuthenticated ? (
          <Link href="/profile" onClick={onClose}>
            <div
              className={`mt-5 mx-4 bg-[#fef6b3] transition-all duration-500 delay-100 rounded-lg ${
                isOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {user?.userImage ? (
                        <img
                          src={user?.userImage}
                          alt="Sprite"
                          className="h-[35px] rounded-full w-[35px] ml-[11px] my-[11px]"
                        />
                      ) : (
                        <Image
                          src="/profile-images/profile-image-guest.svg"
                          alt="Sprite"
                          className="h-[35px] w-[35px] ml-[11px] my-[11px]"
                          width={35}
                          height={35}
                        />
                      )}
                    </span>
                  </div>
                  <div className="ml-3 mt-[10px] mb-[7px]">
                    <h3 className="text-xs font-[600] text-black">
                      {user?.name ? user?.name : ""}
                    </h3>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-800 mr-1 leading-[28px]">
                        {isComicCoinsLoading ? "--" : comicCoinsValue}
                      </span>
                      {coinImage && (
                        <Image
                          src={coinImage}
                          alt="Sprite"
                          className="h-[18px] w-[18px]  "
                          width={18}
                          height={18}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-[8px] py-[8px] bg-white mr-[8px] rounded-full">
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <button
            className="w-full"
            onClick={() => {
              dispatch(updateLoginModal({ loginModal: true }));
              setTimeout(() => {
                onClose();
              }, 100);
            }}
          >
            <div
              className={`mt-5 mx-4 bg-[#fef6b3] transition-all duration-500 delay-100 rounded-lg ${
                isOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center py-[12px]">
                  <div className="ml-3">
                    <h3 className="font-bold text-gray-800">Login</h3>
                  </div>
                </div>
                <div className="px-[4px] py-[4px] bg-white mr-[8px] rounded-full">
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </div>
              </div>
            </div>
          </button>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 py-4">
          <ul>
            {/* Main Menu Items */}
            {mainMenuItems.map((item, index) => (
              <li
                key={index}
                className={`transition-all duration-300 ease-out ${
                  isOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
                style={{
                  transitionDelay: isOpen ? `${100 + index * 50}ms` : "0ms",
                }}
              >
                <Link
                  href={item.href}
                  className="flex items-center justify-between px-[16px] pb-[24px] text-black"
                  onClick={onClose}
                >
                  <div className="flex items-center">
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={14}
                      height={14}
                      className="mr-3"
                    />
                    <span className="font-[400] text-black text-sm">
                      {item.label}
                    </span>
                  </div>
                </Link>
              </li>
            ))}

            {/* Explore Section */}
            <li
              className={`transition-all duration-300 ease-out ${
                isOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{
                transitionDelay: isOpen
                  ? `${100 + mainMenuItems.length * 50}ms`
                  : "0ms",
              }}
            >
              <button
                onClick={() => setIsExploreOpen(!isExploreOpen)}
                className="flex items-center justify-between px-[16px] text-black w-full"
              >
                <div className="flex items-center">
                  <Image
                    src="/other-svgs/explore-nav-mobile.svg"
                    alt="Explore"
                    width={14}
                    height={14}
                    className="mr-3"
                  />
                  <span className="font-[400] text-black text-sm">
                    {cmsData.navBar.explore}
                  </span>
                </div>
                {isExploreOpen ? (
                  <ChevronDown className="h-4 w-4 text-black" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </button>

              {/* Explore Sub-items */}
              {isExploreOpen && (
                <ul className="pt-2">
                  {exploreSubItems.map((subItem: any, subIndex: any) => {
                    if (subItem.label === cmsData.navBar.referAFriend) {
                      return (
                        <li key={subIndex} className="text-xs  ml-8">
                          <button
                            onClick={() => {
                              setRefer1(true);
                              onClose();
                            }}
                            className="block px-4 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200"
                          >
                            {subItem.label}
                          </button>
                        </li>
                      );
                    }
                    if (subItem.label === cmsData.navBar.haveAnInviteCode) {
                      return (
                        <li key={subIndex} className="text-xs ml-8">
                          <button
                            onClick={() => {
                              setInvite1(true);
                              onClose();
                            }}
                            key={subItem.label}
                            className="block px-4 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200"
                          >
                            {subItem.label}
                          </button>
                        </li>
                      );
                    }
                    if (subItem.label === cmsData.navBar.pjChallenge) {
                      return (
                        <li key={subIndex} className="text-xs ml-8">
                          <button
                            onClick={() => {
                              triggerGAEvent(GA_EVENTS.SPRITE_J24_SUBMIT_JOKE);
                              router.push(subItem.href);
                              onClose();
                            }}
                            className="block px-4 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200"
                          >
                            {subItem.label}
                          </button>
                        </li>
                      );
                    }
                    return (
                      <li key={subIndex} className="text-xs ml-8">
                        <Link
                          href={subItem.href}
                          className="block px-4 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200"
                          onClick={onClose}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    );
                  })}
                  {/* Vote Button */}
                  <li
                    className={`transition-all duration-300 ease-out mx-4 ${
                      isOpen
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-8"
                    }`}
                    style={{
                      transitionDelay: isOpen
                        ? `${100 + (mainMenuItems.length + 1) * 50}ms`
                        : "0ms",
                    }}
                  >
                    <div className="mt-4 ml-[24px]">
                      <Link href="/user-generated-jokes" onClick={onClose}>
                        <button className="w-full bg-green text-white text-[10px] py-3 px-4 transition-colors duration-200 text-left rounded-[5px] font-[700] ">
                          {cmsData.navBar.navBarInsideExploreBannerHeading}
                          <br />
                          <span className="font-[700] text-[12px]">
                            {cmsData.navBar.navBarInsideExploreBannerSubHeading}
                          </span>
                        </button>
                      </Link>
                    </div>
                  </li>
                </ul>
              )}
            </li>

            {/* Text me, Maybe? */}
            <li
              className={`transition-all duration-300 ease-out ${
                isOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{
                transitionDelay: isOpen
                  ? `${100 + (mainMenuItems.length + 2) * 50}ms`
                  : "0ms",
              }}
            >
              <div className="flex items-center justify-between px-4 mx-2 my-[23px]">
                <span className="text-gray-800 font-[400] text-[14px]">
                  {cmsData.navBar.textMeMaybe}
                </span>
                <button className="bg-green text-white px-[14px] py-1 rounded-full flex items-center gap-[4px] text-xs transition-colors duration-200">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.24742 6.04941L7.24371 6.08288C6.33833 5.59383 6.24363 5.52869 6.1267 5.71877C6.0456 5.8504 5.80927 6.14891 5.73804 6.23726C5.66599 6.32427 5.59435 6.33097 5.47206 6.27073C5.34855 6.2038 4.95206 6.06324 4.48269 5.60811C4.11708 5.25338 3.87169 4.81833 3.79923 4.68446C3.67859 4.45868 3.93098 4.42656 4.16072 3.95536C4.20189 3.86166 4.1809 3.78803 4.15043 3.72155C4.11955 3.65462 3.87375 2.99869 3.77082 2.73722C3.672 2.47663 3.57031 2.50965 3.49414 2.50965C3.25699 2.48734 3.08365 2.49091 2.9309 2.66315C2.26638 3.45472 2.43395 4.27128 3.00254 5.13959C4.11996 6.72452 4.71531 7.01634 5.80391 7.4215C6.09788 7.52278 6.36592 7.50851 6.57795 7.47549C6.81428 7.43488 7.30547 7.15377 7.40799 6.8392C7.51298 6.52462 7.51298 6.26359 7.4821 6.20335C7.45163 6.14311 7.37094 6.10965 7.24742 6.04941Z"
                      fill="white"
                    />
                    <path
                      d="M8.55 1.43724C5.34625 -1.65979 0.0441667 0.586419 0.0420833 4.95551C0.0420833 5.82882 0.270833 6.68048 0.706667 7.43255L0 10L2.63958 9.31168C5.93333 11.0908 9.99833 8.72836 10 4.95801C10 3.6347 9.48333 2.3893 8.54375 1.45349L8.55 1.43724ZM9.1675 4.94426C9.165 8.12462 5.67375 10.1108 2.9125 8.48753L2.7625 8.39836L1.2 8.80461L1.61875 7.28588L1.51917 7.12963C-0.199167 4.39427 1.775 0.819332 5.03 0.819332C6.13583 0.819332 7.17375 1.25057 7.95542 2.03181C8.73667 2.80638 9.1675 3.84428 9.1675 4.94426Z"
                      fill="white"
                    />
                  </svg>
                  Chat
                </button>
              </div>
            </li>

            <div className="mt-[61px]">
              {/* Bottom Menu Items */}
              {bottomMenuItems.map((item, index) => (
                <li
                  key={index}
                  className={`transition-all duration-300 ease-out ${
                    isOpen
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  }`}
                  style={{
                    transitionDelay: isOpen
                      ? `${100 + (mainMenuItems.length + 3 + index) * 50}ms`
                      : "0ms",
                  }}
                >
                  {item.label === cmsData.navBar.contactUs ? (
                    <button
                      onClick={() => {
                        setIsContactCardOpen(true);
                        onClose();
                      }}
                      className="w-full flex items-center px-4 py-3 mx-2 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-lime-50 hover:shadow-sm transition-all duration-200 group"
                    >
                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={14}
                        height={14}
                        className="mr-3"
                      />
                      <span className="font-[400] text-sm text-black">
                        {item.label}
                      </span>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center px-4 py-3 mx-2 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-lime-50 hover:shadow-sm transition-all duration-200 group"
                      onClick={onClose}
                    >
                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={14}
                        height={14}
                        className="mr-3"
                      />
                      <span className="font-[400] text-sm text-black">
                        {item.label}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </div>

            {/* Logout */}
            {isAuthenticated && (
              <li
                className={`transition-all duration-300 ease-out ${
                  isOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
                style={{
                  transitionDelay: isOpen
                    ? `${
                        100 +
                        (mainMenuItems.length + 3 + bottomMenuItems.length) * 50
                      }ms`
                    : "0ms",
                }}
              >
                <button
                  onClick={() => {
                    logoutHandler();
                    onClose();
                  }}
                  className="w-full flex items-center px-4 py-[50px] mx-2 text-[#00953B] "
                >
                  <span className="font-[700]">{cmsData.navBar.logout}</span>
                </button>
              </li>
            )}
          </ul>
        </nav>
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
      <ContactCard
        isOpen={isContactCardOpen}
        onClose={() => setIsContactCardOpen(false)}
      />
    </>
  );
};

export default Sidebar;
