import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import comicCoin from "../../../../../public/other-svgs/comic-coin-footer.svg";
import { BoxIds } from "../../../common/CircularBoxesModal";

const MobileFooter = () => {
  const [currentPath, setCurrentPath] = useState("/");

  
  useEffect(() => {
    // Set initial path
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }

    // Listen for route changes
    const handleRouteChange = () => {
      if (typeof window !== "undefined") {
        setCurrentPath(window.location.pathname);
      }
    };

    // Listen for popstate events (back/forward buttons)
    window.addEventListener("popstate", handleRouteChange);

    // Listen for pushstate/replacestate (programmatic navigation)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(history, args);
      handleRouteChange();
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(history, args);
      handleRouteChange();
    };

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  return (
    <>
      <div className="bg-white w-full h-[71px] fixed bottom-0 left-0 right-0 flex flex-col z-10">
        <div className="h-[54px] w-full bg-white text-black border-t border-gray-200">
          <div className="flex justify-evenly items-end h-full py-[5px]">
            {/* Home */}
            <div className="relative flex-1">
              <Link
                href="/"
                id={BoxIds.HOME}
                className="flex flex-col items-center justify-center"
              >
                {currentPath === "/" && (
                  <div className="absolute w-[48px] h-[48px] bg-[#FFE200] rounded-full -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
                {currentPath === "/" ? (
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.9628 9.18634C19.9623 9.18588 19.9618 9.18542 19.9614 9.18497L11.8021 1.02686C11.4544 0.678955 10.992 0.487305 10.5001 0.487305C10.0083 0.487305 9.54589 0.678802 9.19796 1.0267L1.04298 9.18069C1.04024 9.18344 1.03749 9.18634 1.03474 9.18909C0.320559 9.90732 0.32178 11.0726 1.03825 11.789C1.36559 12.1165 1.79791 12.3062 2.26015 12.326C2.27892 12.3278 2.29784 12.3287 2.31692 12.3287H2.64212V18.3326C2.64212 19.5207 3.60886 20.4873 4.79733 20.4873H7.98949C8.31301 20.4873 8.57549 20.225 8.57549 19.9014V15.1943C8.57549 14.6522 9.01651 14.2112 9.55871 14.2112H11.4415C11.9837 14.2112 12.4248 14.6522 12.4248 15.1943V19.9014C12.4248 20.225 12.6871 20.4873 13.0108 20.4873H16.2029C17.3914 20.4873 18.3581 19.5207 18.3581 18.3326V12.3287H18.6597C19.1514 12.3287 19.6138 12.1372 19.9618 11.7893C20.6791 11.0717 20.6794 9.90442 19.9628 9.18634Z"
                      fill="#00953B"
                    />
                  </svg>
                ) : (
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5 1.1123C10.7852 1.1123 11.0535 1.20816 11.2705 1.38672L11.3604 1.46875L19.5195 9.62695V9.62793H19.5205C19.9639 10.0723 19.9908 10.7781 19.6025 11.2549L19.5195 11.3477C19.2887 11.5781 18.9856 11.704 18.6602 11.7041H17.7334V18.333C17.7332 19.1755 17.0463 19.8622 16.2031 19.8623H13.0498V15.1943C13.0498 14.307 12.3287 13.5859 11.4414 13.5859H9.55859C8.67133 13.586 7.9502 14.307 7.9502 15.1943V19.8623H4.79688C3.9538 19.8621 3.26779 19.1754 3.26758 18.333V11.7041H2.32129L2.30371 11.7021L2.28711 11.7012L2.17285 11.6914C1.948 11.6608 1.73886 11.5688 1.56445 11.4238L1.48047 11.3477V11.3467L1.39746 11.2549C1.00988 10.7795 1.03575 10.0754 1.47656 9.63086C1.47987 9.62756 1.48248 9.62401 1.48438 9.62207L1.48535 9.62305L9.63965 1.46875C9.87036 1.23806 10.174 1.11234 10.5 1.1123Z"
                      stroke="black"
                      strokeWidth="1.25"
                    />
                  </svg>
                )}

                <span
                  className={`text-[9px] mt-1 font-medium ${
                    currentPath === "/" ? "text-green" : "text-black"
                  }`}
                >
                  HOME
                </span>
              </Link>
            </div>

            {/* Contest */}
            <Link
              id={BoxIds.CONTEST_ELEMENT}
              href="/contest"
              className="flex flex-col items-center justify-center flex-1"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.75 9.3125C6.25 10.125 6.8125 10.875 7.5 11.5625C7.8125 13.125 7.125 14.625 5.25 16.125C5 16.3125 5 16.5625 5 16.875V19.375C5 19.75 5.25 20 5.625 20H14.375C14.75 20 15 19.75 15 19.375V16.875C15 16.5 15.0625 16.25 14.75 16.0625C12.875 14.375 12.1875 12.9375 12.5625 11.5625C13.25 10.875 13.8125 10.125 14.3125 9.3125C17.5625 8.75 20 5.9375 20 2.625V1.875C20 1.5 19.75 1.25 19.375 1.25H16.25C16.25 1 16.25 0.8125 16.25 0.5625C16.25 0.25 15.9375 0 15.625 0H4.375C4.0625 0 3.8125 0.25 3.75 0.5625C3.75 0.8125 3.6875 1 3.6875 1.25H0.625C0.25 1.25 0 1.5625 0 1.875V2.5625C0 5.9375 2.4375 8.75 5.75 9.3125ZM13.75 18.75H6.25V17.5H13.75V18.75ZM12.875 15.9375H7.25C8.4375 14.625 8.9375 13.25 8.8125 11.875H11.1875C11 13.4375 11.875 14.875 12.875 15.9375ZM18.75 2.625C18.75 5 17.25 7.0625 15.0625 7.8125C15.8125 6.1875 16.1875 4.4375 16.25 2.5H18.75V2.625ZM4.9375 1.25H15C15.125 5.0625 14 8.125 11.625 10.625H8.25C5.875 7.9375 4.75 4.875 4.9375 1.25ZM1.25 2.5H3.6875C3.75 4.375 4.125 6.1875 4.9375 7.8125C2.75 7.0625 1.25 5 1.25 2.625V2.5Z"
                  fill={currentPath === "/contest" ? "#00953B" : "black"}
                />
                <path
                  d="M8.74998 7.6875L9.99998 7L11.25 7.6875C11.375 7.75 11.4375 7.75 11.5625 7.75C11.6875 7.75 11.8125 7.6875 11.9375 7.625C12.125 7.5 12.25 7.25 12.1875 7L11.9375 5.5L12.9375 4.4375C13.125 4.25 13.1875 4 13.0625 3.8125C12.9375 3.625 12.8125 3.4375 12.5625 3.375L11.1875 3.1875L10.5625 1.8125C10.4375 1.625 10.25 1.5 9.99998 1.5C9.74998 1.5 9.56248 1.625 9.43748 1.875L8.81248 3.25L7.43748 3.4375C7.18748 3.5 6.99998 3.625 6.93748 3.875C6.87498 4.125 6.93748 4.3125 7.06248 4.5L8.06248 5.5625L7.81248 7.0625C7.74998 7.3125 7.87498 7.5625 8.06248 7.6875C8.31248 7.75 8.56248 7.8125 8.74998 7.6875ZM9.31248 4.375C9.49998 4.3125 9.68748 4.1875 9.81248 4L9.99998 3.625L10.1875 4.0625C10.25 4.25 10.4375 4.375 10.6875 4.4375L11.1875 4.5L10.8125 4.9375C10.6875 5 10.625 5.25 10.625 5.4375L10.6875 6C10.3125 5.8125 10.1875 5.6875 9.93748 5.6875C9.68748 5.6875 9.56248 5.8125 9.18748 6L9.24998 5.4375C9.31248 5.25 9.24998 5.0625 9.06248 4.875L8.68748 4.4375L9.31248 4.375Z"
                  fill={currentPath === "/contest" ? "#00953B" : "black"}
                />
              </svg>

              <span
                className={`text-[9px] mt-1 font-medium ${
                  currentPath === "/contest" ? "text-[#00953B]" : "text-black"
                }`}
              >
                CONTEST
              </span>
            </Link>

            {/* Comic Coins */}
            <Link
              id={BoxIds.COMIC_COINS}
              href="/my-wallet"
              className="flex flex-col items-center justify-center flex-1"
            >
              <div className="relative">
                <Image
                  src={comicCoin}
                  alt="comic-coins"
                  width={24}
                  height={24}
                  style={{
                    filter:
                      currentPath === "/my-wallet"
                        ? "brightness(0) saturate(100%) invert(20%) sepia(100%) saturate(2000%) hue-rotate(120deg) brightness(95%) contrast(105%)"
                        : "none",
                  }}
                />
                <div
                  className={`absolute -top-1 -right-1 bg-yellow-400 text-white
                 text-[7px] px-1 py-0.5 rounded-full font-bold ${
                   currentPath === "/my-wallet" ? "bg-green" : "bg-black"
                 }`}
                >
                  0
                </div>
              </div>
              <span
                className={`text-[9px] mt-1 font-medium ${
                  currentPath === "/my-wallet"
                    ? "text-[#00953B]"
                    : "text-black"
                }`}
              >
                COMIC COINS
              </span>
            </Link>

            {/* Refresh Rings */}
            <Link
              id={BoxIds.REFRESH}
              href="/refresh-rings"
              className="flex flex-col items-center justify-center flex-1"
            >
              <svg
                width="22"
                height="17"
                viewBox="0 0 22 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_28913_15130)">
                  <path
                    d="M1 14.602C1 15.4517 1.68764 16.1405 2.53589 16.1405H19.4642C20.3123 16.1405 21 15.4517 21 14.602V11.4727C19.6703 11.1117 18.6922 9.89437 18.6922 8.44817C18.6922 7.00197 19.6703 5.7846 21 5.4236V2.29432C21 1.44466 20.3123 0.755859 19.4642 0.755859H2.53589C1.68765 0.755859 1 1.44464 1 2.29432V5.41683C2.34262 5.76918 3.33317 6.9928 3.33317 8.44817C3.33317 9.90354 2.34262 11.1272 1 11.4795V14.602Z"
                    stroke={
                      currentPath === "/refresh-rings" ? "#00953B" : "#909090"
                    }
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 11.3834V8.61418C8 8.23184 8.30996 7.92188 8.69231 7.92188H13.5385C13.9208 7.92188 14.2308 8.23184 14.2308 8.61418V11.3834C14.2308 11.7658 13.9208 12.0757 13.5385 12.0757H8.69231C8.30996 12.0757 8 11.7658 8 11.3834Z"
                    stroke={
                      currentPath === "/refresh-rings" ? "#00953B" : "#909090"
                    }
                    strokeWidth="1.1"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 7.9215V6.53688C9 5.38983 9.92987 4.45996 11.0769 4.45996C12.224 4.45996 13.1538 5.38983 13.1538 6.53688V7.9215"
                    stroke={
                      currentPath === "/refresh-rings" ? "#00953B" : "#909090"
                    }
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_28913_15130">
                    <rect width="22" height="17" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <span
                className={`text-[9px] mt-1 font-medium ${
                  currentPath === "/refresh-rings"
                    ? "text-[#00953B]"
                    : "text-black"
                }`}
              >
                REFRESH RINGS
              </span>
            </Link>

            {/* Profile */}
            <Link
              id={BoxIds.PROFILE}
              href="/profile"
              className="flex flex-col items-center justify-center flex-1"
            >
              {currentPath === "/profile" ? (
                <svg
                  width="16"
                  height="18"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4958 8.34627C11.6318 7.50628 12.3716 6.14686 12.3716 4.61538C12.3716 2.07046 10.3294 0 7.81916 0C5.30893 0 3.2667 2.07046 3.2667 4.61538C3.2667 6.14686 4.00646 7.50628 5.14255 8.34627C2.31846 9.44191 0.307617 12.2179 0.307617 15.4615C0.307617 16.8613 1.43084 18 2.81146 18H12.8268C14.2075 18 15.3307 16.8613 15.3307 15.4615C15.3307 12.2179 13.3198 9.44191 10.4958 8.34627ZM4.63245 4.61538C4.63245 2.83395 6.06201 1.38463 7.81916 1.38463C9.5763 1.38463 11.0059 2.83395 11.0059 4.61538C11.0059 6.39682 9.5763 7.84617 7.81916 7.84617C6.06201 7.84617 4.63245 6.39682 4.63245 4.61538ZM12.8268 16.6154H2.81146C2.18392 16.6154 1.67337 16.0978 1.67337 15.4615C1.67337 12.0258 4.43032 9.23073 7.81919 9.23073C11.2081 9.23073 13.965 12.0258 13.965 15.4615C13.965 16.0978 13.4544 16.6154 12.8268 16.6154Z"
                    fill="#11A64B"
                  />
                  <path
                    d="M4.63245 4.61538C4.63245 2.83395 6.06201 1.38463 7.81916 1.38463C9.5763 1.38463 11.0059 2.83395 11.0059 4.61538C11.0059 6.39682 9.5763 7.84617 7.81916 7.84617C6.06201 7.84617 4.63245 6.39682 4.63245 4.61538ZM12.8268 16.6154H2.81146C2.18392 16.6154 1.67337 16.0978 1.67337 15.4615C1.67337 12.0258 4.43032 9.23073 7.81919 9.23073C11.2081 9.23073 13.965 12.0258 13.965 15.4615C13.965 16.0978 13.4544 16.6154 12.8268 16.6154Z"
                    fill="#11A64B"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="18"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.4958 8.34627C11.6318 7.50628 12.3716 6.14686 12.3716 4.61538C12.3716 2.07046 10.3294 0 7.81915 0C5.30893 0 3.2667 2.07046 3.2667 4.61538C3.2667 6.14686 4.00646 7.50628 5.14255 8.34627C2.31846 9.44191 0.307617 12.2179 0.307617 15.4615C0.307617 16.8613 1.43084 18 2.81146 18H12.8268C14.2075 18 15.3307 16.8613 15.3307 15.4615C15.3307 12.2179 13.3198 9.44191 10.4958 8.34627ZM4.63245 4.61538C4.63245 2.83395 6.06201 1.38463 7.81915 1.38463C9.5763 1.38463 11.0059 2.83395 11.0059 4.61538C11.0059 6.39682 9.5763 7.84617 7.81915 7.84617C6.06201 7.84617 4.63245 6.39682 4.63245 4.61538ZM12.8268 16.6154H2.81146C2.18392 16.6154 1.67337 16.0978 1.67337 15.4615C1.67337 12.0258 4.43032 9.23073 7.81919 9.23073C11.2081 9.23073 13.965 12.0258 13.965 15.4615C13.965 16.0978 13.4544 16.6154 12.8268 16.6154Z"
                    fill="black"
                  />
                </svg>
              )}
              <span
                className={`text-[9px] mt-1 font-medium ${
                  currentPath === "/profile" ? "text-[#00953B]" : "text-black"
                }`}
              >
                PROFILE
              </span>
            </Link>
          </div>
        </div>
        <div className="h-[17px] w-full bg-[#E0E0E0] flex flex-row items-center">
          <div className="px-5 flex flex-row gap-[2px]">
            <Link href="/terms-and-conditions">
              <p className="text-center text-[7px] text-black">T&C*</p>
            </Link>
            <p className="text-center text-[7px] text-black">|</p>
            <Link href="/privacy-policy">
              <p className="text-center text-[7px] text-black">
                Privacy Policy
              </p>
            </Link>
          </div>
          <div className="flex flex-row gap-[2px]">
            <p className="text-[7px] text-black flex flex-row gap-[2px] items-center">
              CARBONATED WATER. TRADEMARK OWNER: THE COCA-COLA COMPANY.
              <svg
                width="7"
                height="7"
                viewBox="0 0 7 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="1.06986"
                  y="0.821812"
                  width="5.10805"
                  height="5.10805"
                  fill="#00953B"
                  stroke="#00953B"
                  strokeWidth="0.356376"
                />
                <circle cx="3.62296" cy="3.37686" r="1.58389" fill="#E0E0E0" />
              </svg>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileFooter;
