import React, { useState, useEffect } from "react";
import { useCMSData } from "@/data";
import Image from "next/image";

interface ContactCardProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  isOpen = false,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cmsData = useCMSData(mounted);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClose) {
      onClose();
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-[#000000b0] flex items-center justify-center z-50 p-4 pt-safe-top pb-safe-bottom"
      onClick={handleBackdropClick}
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
      }}
    >
      <div
        className="bg-white rounded-lg w-full max-w-sm mx-4 flex flex-col relative shadow-lg"
        onClick={handleModalClick}
      >
        {/* Close Button */}
        <div className="flex justify-end w-full px-3 py-4">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              className="fill-current text-gray-600"
            >
              <path d="M29.281 27.663l-11.719-11.719 11.663-11.607c0.446-0.446 0.446-1.172 0-1.618s-1.172-0.446-1.618 0l-11.607 11.663-11.663-11.663c-0.446-0.446-1.172-0.446-1.618 0s-0.446 1.172 0 1.618l11.663 11.663-11.663 11.663c-0.446 0.446-0.446 1.172 0 1.618 0.223 0.223 0.502 0.335 0.781 0.335s0.558-0.112 0.781-0.335l11.719-11.719 11.719 11.719c0.223 0.223 0.502 0.335 0.781 0.335s0.558-0.112 0.781-0.335c0.446-0.446 0.446-1.172 0-1.618z"></path>
            </svg>
          </button>
        </div>

        <div className="flex flex-col justify-center items-center px-6 pb-6 pt-2">
          <div className="justify-center items-center w-full">
            {/* Header */}
            <div className="text-center pb-[8px]">
              <h2 className="md:text-[28px] text-[20px] font-bold text-black">
                {cmsData?.contactUs?.contactUsHeading}
              </h2>
            </div>

            {/* Email Section */}
            <div className="text-center mb-6">
              <div className="bg-yellow rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3">
                <Image
                  src="/other-svgs/contact-email.svg"
                  alt="email"
                  width={70}
                  height={70}
                />
              </div>
              <h3 className="md:text-[28px] text-[20px] font-semibold text-black mb-2">
                {cmsData?.contactUs?.emailUs}
              </h3>
              <a
                href="mailto:indiahelpline@coca-cola.com"
                className="text-sm md:text-base break-all"
              >
                indiahelpline@coca-cola.com
              </a>
            </div>

            {/* Phone Section */}
            <div className="text-center">
              <div className="bg-yellow rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center mx-auto mb-3">
                <Image
                  src="/other-svgs/contact-call.svg"
                  alt="phone"
                  width={70}
                  height={70}
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-black mb-2">
                {cmsData?.contactUs?.callUsTollFreeHeading}
              </h3>
              <div className="text-black space-y-1">
                <a
                  href="tel:18002082653"
                  className="text-lg md:text-xl font-semibold block"
                >
                  1800 208 2653
                </a>
                <p className="text-sm md:text-base text-gray-700">
                  9:00am-9:00pm (Mon-Sat)
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  9:00am-6:00pm (Sun)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
