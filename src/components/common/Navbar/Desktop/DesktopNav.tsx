"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ILogoAndProfileImageProps } from "@/interfaces";
import NotificationItem from "../../NotificationItem/NotificationItem";
import { GA_EVENTS, ICONS_NAMES, LANGUAGE_MNEMONICS } from "@/constants";
import useAppDispatch from "@/hooks/useDispatch";
import { updateLoginModal } from "@/store/auth/auth.slice";
import useAppSelector from "@/hooks/useSelector";
import useLogout from "@/hooks/useLogout";
import ReferNowComponent from "@/components/common/ReferNowComponent";
import InviteCodeComponent from "@/components/common/InviteCodeComponent";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageHydration from "../../LanguageHydration";
import { useCMSData } from "@/data";
import { triggerGAEvent } from "@/utils/gTagEvents";
import { usePathname, useRouter } from "next/navigation";
import { DesktopBoxIds } from "../../HomePageDesktopOnboarding";
import {
  useGetNotifications,
  useGetNotificationCount,
  useMarkAsRead,
} from "@/api/hooks/NotificationHooks";
import { INotification } from "@/api/types/NotificationTypes";
import { useQueryClient } from "@tanstack/react-query";
import { keys } from "@/api/utils";
import { cn } from "@/lib/utils";

const DesktopNav: React.FC<ILogoAndProfileImageProps> = ({
  spriteLogo,
  profileImage,
}) => {
  const [mounted, setMounted] = useState(false);
  const [isExploreDropdownOpen, setIsExploreDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { selectedLanguage, changeLanguage } = useLanguage();
  const exploreDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  const cmsData = useCMSData(mounted);

  // Fetch notifications data
  const { data: notificationsResponse, isLoading: notificationsLoading } =
    useGetNotifications({
      page_number: 1,
      page_size: 10, // Limit to 10 for dropdown
    });

  // Fetch notification count
  const { data: notificationCountResponse } = useGetNotificationCount();

  // Mark as read mutation
  const markAsReadMutation = useMarkAsRead();

  // Extract data from responses
  const notifications = notificationsResponse?.data?.notifications ?? [];
  const notificationCount = notificationCountResponse?.data?.count ?? 0;

  // Handle notification dropdown toggle and mark as read
  const handleNotificationDropdownToggle = async () => {
    const newState = !isNotificationDropdownOpen;
    setIsNotificationDropdownOpen(newState);

    // If opening dropdown and there are unread notifications, mark all as read
    if (newState && notificationCount > 0) {
      try {
        // Don't await - fire and forget to avoid blocking UI
        markAsReadMutation
          .mutateAsync()
          .then(() => {
            // Use a timeout to batch invalidations and prevent rapid refetching
            setTimeout(() => {
              queryClient.invalidateQueries({
                queryKey: [...keys.notifications.getNotifications()],
              });

              queryClient.invalidateQueries({
                queryKey: [...keys.notifications.getNotificationCount()],
              });
            }, 100);
          })
          .catch((error) => {
            console.error("Failed to mark notifications as read:", error);
          });
      } catch (error) {
        console.error("Failed to mark notifications as read:", error);
      }
    }
  };

  // Function to calculate time difference for timestamps
  const getTimeAgo = (launchDate: string | null): string => {
    if (!launchDate) return "Recently";

    const now = new Date();
    const launch = new Date(launchDate);
    const diffInMs = now.getTime() - launch.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays}d`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hr`;
    } else {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return diffInMinutes > 0 ? `${diffInMinutes} min` : "Now";
    }
  };

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

  const [refer1, setRefer1] = useState<boolean>(false);

  const { logoutHandler } = useLogout();

  const [invite1, setInvite1] = useState<boolean>(false);

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.profile);
  const isTamil = selectedLanguage === "ta";

  const loginHandler = () => {
    dispatch(updateLoginModal({ loginModal: true }));
  };

  const pathName = usePathname();

  return (
    <div className="w-full bg-white fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center  mx-auto py-4 md:w-[76.57%]">
        <div className="flex items-center space-x-12">
          <Link href="/">
            <Image src={spriteLogo} alt="Sprite Logo" width={110} />
          </Link>

          <div className="flex items-center space-x-8">
            <div className="relative" ref={exploreDropdownRef}>
              <button
                id={DesktopBoxIds.EXPLORE}
                className={`flex items-center cursor-pointer ${
                  isExploreDropdownOpen ? "explore-button-with-arrow" : ""
                }`}
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
                <div className="absolute top-full left-0 mt-4 w-[380px] bg-white border border-[#ebebeb] rounded-[5px] shadow-lg z-30 font-medium">
                  <div className="flex flex-col">
                    {exploreMenuItems.map((item) => {
                      if (item.label === cmsData.navBar.referAFriend) {
                        return (
                          <button
                            onClick={() => {
                              if (isAuthenticated) {
                                setRefer1(true);
                              } else {
                                dispatch(
                                  updateLoginModal({ loginModal: true })
                                );
                              }
                              setIsExploreDropdownOpen(false);
                            }}
                            key={item.id}
                            className={cn(
                              "px-[20px] py-[10px] hover:bg-gray-50 text-start text-[18px] font-normal leading-tight",
                              isTamil && "text-[14px]"
                            )}
                          >
                            {item.label}
                          </button>
                        );
                      }
                      if (item.label === cmsData.navBar.haveAnInviteCode) {
                        return (
                          <button
                            onClick={() => {
                              if (isAuthenticated) {
                                setInvite1(true);
                              } else {
                                dispatch(
                                  updateLoginModal({ loginModal: true })
                                );
                              }
                              setIsExploreDropdownOpen(false);
                            }}
                            key={item.id}
                            className={cn(
                              "px-[20px] py-[10px] text-start hover:bg-gray-50 text-[18px] font-normal leading-tight",
                              isTamil && "text-[14px]"
                            )}
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
                            className={cn(
                              "px-[20px] py-[10px] text-start hover:bg-gray-50 text-[18px] font-normal leading-tight",
                              isTamil && "text-[14px]"
                            )}
                          >
                            {item.label}
                          </button>
                        );
                      }
                      if (item.label === cmsData.navBar.hallOfLame) {
                        return (
                          <button
                            onClick={() => {
                              if (isAuthenticated) {
                                router.push(item.href);
                              } else {
                                dispatch(
                                  updateLoginModal({ loginModal: true })
                                );
                              }
                              setIsExploreDropdownOpen(false);
                            }}
                            key={item.id}
                            className="px-[20px] py-[10px] text-start hover:bg-gray-50 text-[18px] font-normal leading-tight"
                          >
                            {item.label}
                          </button>
                        );
                      }
                      return (
                        <Link
                          key={item.id}
                          href={item.href}
                          className={cn(
                            "px-[20px] py-[10px] hover:bg-gray-50 text-[18px] font-normal leading-tight",
                            isTamil && "text-[14px]"
                          )}
                          onClick={() => setIsExploreDropdownOpen(false)}
                        >
                          {item.label}
                        </Link>
                      );
                    })}

                    <div className="px-[20px] py-[10px]">
                      <Link
                        href="/user-generated-jokes"
                        className={cn(
                          "block bg-green text-white rounded-lg p-3",
                          isTamil && "p-2"
                        )}
                        onClick={() => setIsExploreDropdownOpen(false)}
                      >
                        <div
                          className={cn(
                            "text-sm font-[400]",
                            isTamil && "text-[12px]"
                          )}
                        >
                          {cmsData.navBar.navBarInsideExploreBannerHeading}
                        </div>
                        <div
                          className={cn(
                            "text-md font-bold",
                            isTamil && "text-[15px]"
                          )}
                        >
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
                className={`cursor-pointer ${
                  isNotificationDropdownOpen
                    ? "notification-button-with-arrow"
                    : ""
                }`}
                onClick={handleNotificationDropdownToggle}
              >
                <Image
                  src="/other-svgs/bell-icon.svg"
                  alt="Notification"
                  width={25}
                  height={25}
                />
                {notificationCount > 0 && (
                  <div className="absolute -top-0.5 right-0 bg-yellow text-black rounded-full w-[12px] h-[12px] flex items-center justify-center text-[6.86px] font-semibold">
                    {notificationCount > 99 ? "99+" : notificationCount}
                  </div>
                )}
              </button>

              {isNotificationDropdownOpen && (
                <div className="absolute top-full right-[-11px] mt-4 w-[450px] bg-white border border-[#ebebeb] shadow-lg z-30 max-h-[500px] overflow-y-auto rounded-[3px]">
                  <div className="py-2">
                    {notificationsLoading ? (
                      <div className="flex justify-center items-center py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      </div>
                    ) : notifications.length > 0 ? (
                      notifications.map(
                        (notification: INotification, index: number) => (
                          <div key={index} className="pl-4 pr-8">
                            <NotificationItem
                              title={notification.notification_title}
                              description={notification.notification_text}
                              timestamp={getTimeAgo(notification.launch_date)}
                              iconUrl={notification.icon_url}
                              isLast={index === notifications.length - 1}
                              onClick={() => {}} // No-op since we're already marking as read on dropdown open
                              titleFontSize={{
                                desktop: "md:text-[20px]",
                              }}
                              descriptionFontSize={{
                                desktop: "md:text-[12px]",
                              }}
                              timestampFontSize={{
                                desktop: "md:text-[10px] mr-2",
                              }}
                            />
                          </div>
                        )
                      )
                    ) : (
                      <div className="flex justify-center items-center py-8 text-gray-500"></div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-6 h-6" />
          )}
          <LanguageHydration
            fallback={
              <div className="w-[120px]">
                <select className="w-full border text-[18px] font-normal border-black rounded p-1 bg-white focus:outline-none focus:ring-0">
                  <option value="en">ENGLISH</option>
                </select>
              </div>
            }
          >
            <div className="w-[116.71px]">
              <select
                id={DesktopBoxIds.LANGUAGE}
                className="w-full border text-[18px] font-normal border-black rounded p-1 bg-white cursor-pointer focus:outline-none focus:ring-0"
                value={selectedLanguage}
                onChange={(e) => changeLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </LanguageHydration>

          <div
            className={`w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-black cursor-pointer relative ${
              isProfileDropdownOpen ? "profile-button-with-arrow" : ""
            }`}
            ref={profileDropdownRef}
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
          >
            <div id={DesktopBoxIds.PROFILE_ELEMENT}>
              {isAuthenticated ? (
                user?.userImage ? (
                  <Image
                    src={user?.userImage ?? ""}
                    className="rounded-full w-[40px] h-[40px]"
                    alt="Profile Image"
                    width={40}
                    height={40}
                  />
                ) : (
                  <Image
                    src={profileImage}
                    className="rounded-full w-[40px] h-[40px]"
                    alt="Profile Image"
                    width={40}
                    height={40}
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
              <div className="absolute top-full right-0 mt-[20px] bg-white border border-[#CDCDCD] rounded-lg shadow-lg z-30 text-[18px] min-w-[183px]">
                {isAuthenticated ? (
                  <>
                    {isAuthenticated && (
                      <Link
                        href="/profile"
                        className={cn(
                          "hover:bg-gray-50 flex justify-between items-center px-[20px] py-[10px] text-[16px]",
                          isTamil && "text-[10px]"
                        )}
                      >
                        {cmsData.navBar.myProfile}
                        <Image
                          src={`/static/sprite/icons/${ICONS_NAMES.PROFILE_ICON}.svg`}
                          alt={ICONS_NAMES.PROFILE_ICON}
                          width={20}
                          height={20}
                        />
                      </Link>
                    )}
                    {isAuthenticated && (
                      <Link
                        href="/my-wallet"
                        className={cn(
                          "px-[20px] py-[10px] hover:bg-gray-50 flex justify-between items-center text-[16px]",
                          isTamil && "text-[10px]"
                        )}
                      >
                        {cmsData.navBar.comicCoins}
                        <Image
                          src={`/static/sprite/icons/${ICONS_NAMES.WALLET_ICON}.svg`}
                          alt={ICONS_NAMES.WALLET_ICON}
                          width={20}
                          height={20}
                        />
                      </Link>
                    )}
                    {isAuthenticated && (
                      <button
                        onClick={logoutHandler}
                        className={cn(
                          "w-full text-left px-[20px] py-[10px] hover:bg-gray-50 text-red-500 flex items-center justify-between text-[16px]",
                          isTamil && "text-[10px]"
                        )}
                      >
                        <span>{cmsData.navBar.logout}</span>
                        <Image
                          src={`/static/sprite/icons/${ICONS_NAMES.LOGOUT_ICON}.svg`}
                          alt={ICONS_NAMES.LOGOUT_ICON}
                          width={20}
                          height={20}
                        />
                      </button>
                    )}
                    {!isAuthenticated && (
                      <button
                        onClick={loginHandler}
                        className={cn(
                          "w-full text-left px-[20px] py-[10px] hover:bg-gray-50 text-red-500 flex items-center justify-between text-[16px]",
                          isTamil && "text-[10px]"
                        )}
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
                      if (pathName !== "/") {
                        router.push("/");
                      }
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

      {isAuthenticated && (
        <ReferNowComponent
          setOpen={setRefer1}
          open={refer1}
          onClose={() => {
            setRefer1(false);
          }}
        />
      )}

      {isAuthenticated && (
        <InviteCodeComponent
          setOpen={setInvite1}
          open={invite1}
          onClose={() => {
            setInvite1(false);
          }}
        />
      )}
    </div>
  );
};

export default DesktopNav;
