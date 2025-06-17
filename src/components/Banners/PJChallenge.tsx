import React from "react";
import Image from "next/image";

const PJChallenge: React.FC<{
  heading: string;
  subheading: string;
  buttonText: string;
  onClick: () => void;
}> = ({ heading, subheading, buttonText, onClick }) => {
  return (
    <div className="relative w-full">
      {/* Background Image */}
      <Image
        src="/assets/images/pj-challenge-bg.svg"
        alt="PJ Challenge"
        className="w-full h-auto"
        width={1200}
        height={400}
        priority
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Main Container */}
        <div className="relative w-full h-full flex flex-col items-center justify-center px-4">
          {/* Heading - "PJ Challenge?" */}
          <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2">
            <h1
              className="text-black font-bold italic text-center whitespace-nowrap
              text-[16px] leading-[20px]
              sm:text-[24px] sm:leading-[30px]
              md:text-[32px] md:leading-[40px]
              lg:text-[40px] lg:leading-[50px]
              xl:text-[48px] xl:leading-[58px]
              2xl:text-[56px] 2xl:leading-[66px]"
            >
              {heading}
            </h1>
          </div>

          {/* Subheading - "BOTTLE YOUR JOKES..." */}
          <div className="absolute top-[35%] left-1/2 transform -translate-x-1/2 -w-[60%]">
            <h2
              className="text-green font-bold italic uppercase text-center
              text-[14px] leading-[15px] max-w-[200px]
              sm:text-[16px] sm:leading-[20px] sm:max-w-[200px]
              md:text-[24px] md:leading-[30px] md:max-w-[300px]
              lg:text-[32px] lg:leading-[40px] lg:max-w-[415px]
              xl:text-[40px] xl:leading-[48px] xl:max-w-[500px]
              2xl:text-[48px] 2xl:leading-[56px] 2xl:max-w-[750px]"
            >
              {subheading}
            </h2>
          </div>

          {/* Submit Button */}
          <div className="absolute bottom-[20%] left-1/2 2xl:top-[69%] transform -translate-x-1/2">
            <button
              onClick={onClick}
              className="bg-black text-white font-bold rounded-full 
              transition-all duration-200 hover:bg-gray-800 active:scale-95
              px-[12px] py-[6px] text-[8px]
              sm:px-[20px] sm:py-[10px] sm:text-[12px]
              md:px-[28px] md:py-[14px] md:text-[16px]
              lg:px-[36px] lg:py-[18px] lg:text-[20px]
              xl:px-[67.2px] xl:py-[22px] xl:text-[28px]
              2xl:px-[67.2px] 2xl:py-[22px] 2xl:text-[30px]"
            >
              <span className="whitespace-nowrap">{buttonText}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PJChallenge;
