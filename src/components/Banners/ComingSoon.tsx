import React from "react";
import Image from "next/image";

const ComingSoon: React.FC<{
  topText?: string;
  mainText?: string;
}> = ({
  topText = "THE CONTEST IS OVER NOW.",
  mainText = "EXCITING NEW REWARDS COMING SOON...",
}) => {
  return (
    <div className="relative w-full">
      {/* Background Image */}
      <Image
        src="/assets/images/coming-soon.svg"
        alt="Coming Soon Banner"
        className="w-full h-auto"
        width={1200}
        height={400}
        priority
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center pl-4 md:pl-8 lg:pl-12 xl:pl-16 2xl:pl-20">
        {/* Left Side Content Container */}
        <div className="flex flex-col gap-2 md:gap-4 lg:gap-6 max-w-[43%] sm:max-w-[55%] md:max-w-[50%] lg:max-w-[45%]">
          {/* Top Text - "THE CONTEST IS OVER NOW." */}
          <div>
            <p
              className="text-white font-bold italic
              text-[10px] leading-[12px]
              sm:text-[14px] sm:leading-[16px]
              md:text-[18px] md:leading-[22px]
              lg:text-[24px] lg:leading-[28px]
              xl:text-[28px] xl:leading-[32px]
              2xl:text-[32px] 2xl:leading-[36px] uppercase"
            >
              {topText}
            </p>
          </div>

          {/* Main Text - "EXCITING NEW REWARDS COMING SOON..." */}
          <div>
            <h1
              className="text-yellow font-bold italic uppercase
              text-[14px] leading-[16px]
              sm:text-[22px] sm:leading-[24px]
              md:text-[32px] md:leading-[36px]
              lg:text-[42px] lg:leading-[46px]
              xl:text-[52px] xl:leading-[56px]
              2xl:text-[62px] 2xl:leading-[66px]"
            >
              {mainText}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
