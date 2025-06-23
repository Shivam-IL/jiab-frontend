import React, { useState, useEffect } from "react";
import { useCMSData } from "@/data";
import Image from "next/image";

interface ContactCardProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  isOpen = true,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cmsData = useCMSData(mounted);

  if (!isOpen) return null;

  const handleBackdropClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <button
      className="fixed inset-0 bg-[#000000b0] flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <button
        className="bg-white rounded-lg max-w-md mx-2 flex flex-col w-[400px]"
        onClick={handleModalClick}
      >
        {/* Close Button */}
        <div className="flex justify-end w-full px-[12px] py-[16px]">
          <button onClick={onClose} className="content-end">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
            >
              <path d="M29.281 27.663l-11.719-11.719 11.663-11.607c0.446-0.446 0.446-1.172 0-1.618s-1.172-0.446-1.618 0l-11.607 11.663-11.663-11.663c-0.446-0.446-1.172-0.446-1.618 0s-0.446 1.172 0 1.618l11.663 11.663-11.663 11.663c-0.446 0.446-0.446 1.172 0 1.618 0.223 0.223 0.502 0.335 0.781 0.335s0.558-0.112 0.781-0.335l11.719-11.719 11.719 11.719c0.223 0.223 0.502 0.335 0.781 0.335s0.558-0.112 0.781-0.335c0.446-0.446 0.446-1.172 0-1.618z"></path>
            </svg>
          </button>
        </div>

        <div className="flex flex-col justify-center items-center h-full px-[24px] pb-[20px] pt-[8px] md:px-[24px] md:pb-[20px] md:pt-[8px]">
          <div className="justify-center items-center">
            {/* Header */}
            <div className="text-center pb-[8px]">
              <h2 className="md:text-[28px] text-[20px] font-bold text-black">
                {cmsData?.contactUs?.contactUsHeading}
              </h2>
            </div>

            {/* Email Section */}
            <div className="text-center mb-[10px]">
              <div className="bg-yellow rounded-full md:w-[70px] md:h-[70px] w-[50px] h-[50px] flex items-center justify-center mx-auto mb-2">
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
              <p className="md:text-[24px] text-[16px] pb-[8px]">
                indiahelpline@coca-cola.com
              </p>
            </div>

            {/* Phone Section */}
            <div className="text-center">
              <div className="bg-yellow rounded-full md:w-[70px] md:h-[70px] w-[50px] h-[50px] flex items-center justify-center mx-auto mb-2">
                <Image
                  src="/other-svgs/contact-call.svg"
                  alt="phone"
                  width={70}
                  height={70}
                />
              </div>
              <h3 className="md:text-[28px] text-[20px] font-semibold text-black mb-2">
                {cmsData?.contactUs?.callUsTollFreeHeading}
              </h3>
              <div className="text-black">
                <p className="md:text-[24px] text-[16px] md:font-semibold md:mb-2">
                  1800 208 2653
                </p>
                <p className="md:text-[24px] text-[16px]">
                  9:00am-9:00pm (Mon-Sat)
                </p>
                <p className="md:text-[24px] text-[16px]">
                  9:00am-6:00pm (Sun)
                </p>
              </div>
            </div>
          </div>
        </div>
      </button>
    </button>
  );
};

export default ContactCard;
