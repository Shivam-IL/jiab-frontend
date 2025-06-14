import React from "react";
import Image from "next/image";

const PJChallenge: React.FC<{
  heading: string;
  subheading: string;
  buttonText: string;
}> = ({ heading, subheading, buttonText }) => {
  return (
    <div className="relative">
      <Image
        src="/assets/images/pj-challenge-bg.svg"
        alt="PJ Challenge"
        className="w-full h-full md:px-0 px-4"
        width={100}
        height={100}
      />
      <div className="flex flex-col items-center justify-center text-center absolute top-[23.19px] sm:top-[31px] md:top-[71px] left-[50%] translate-x-[-50%] gap-[2px] md:gap-[8.95px]">
        <p className="text-black text-[18px] leading-[22px] sm:text-[24px] sm:leading-[52px] lg:text-[35px] lg:leading-[45px] xl:text-[25px] 2xl:text-[48px] font-bold italic">
          {heading}
        </p>
        <p className="text-green text-[12px] leading-[16px] sm:text-[24px] sm:leading-[60px] lg:text-[35px] lg:leading-[45px] lg:w-[460px] xl:text-[25px] 2xl:text-[48px] uppercase font-bold md:w-[450px] 2xl:w-[615px] w-[156px] italic">
          {subheading}
        </p>
        <button className="absolute top-[60px] sm:top-[164px] lg:top-[184px] xl:top-[200px] 2xl:top-[232px] left-[50%] translate-x-[-50%] bg-black rounded-full py-[8px] px-[16px] sm:py-[18px] sm:px-[30px] md:py-[24px] md:px-[40px]">
          <p className="text-white text-[10px] sm:text-[16px] lg:text-[25px] xl:text-[25px] 2xl:text-[32px] font-bold whitespace-nowrap">
            {buttonText}
          </p>
        </button>
      </div>
    </div>
  );
};

export default PJChallenge;
