import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import Banner from "@/components/common/Banner/Banner";
import { LANGUAGE_MNEMONICS } from "@/constants";

const ChillGuyBanner = () => {
  const { selectedLanguage } = useLanguage();

  // Determine the banner type based on selected language
  const getBannerType = () => {
    return selectedLanguage === LANGUAGE_MNEMONICS.ENGLISH ? "video" : "image";
  };

  // Determine the banner image based on selected language
  const getBannerImage = () => {
    switch (selectedLanguage) {
      case LANGUAGE_MNEMONICS.ENGLISH:
        return "/videos/home-banner-en.mp4";
      case LANGUAGE_MNEMONICS.HINDI:
        return "/assets/images/home-banner-hi.jpg";
      case LANGUAGE_MNEMONICS.TELUGU:
        return "/assets/images/home-banner-3.jpg";
      case LANGUAGE_MNEMONICS.ORIYA:
        return "/assets/images/home-banner-4.jpg";
      case LANGUAGE_MNEMONICS.BENGALI:
        return "/assets/images/home-banner-5.jpg";
      case LANGUAGE_MNEMONICS.KANNADA:
        return "/assets/images/home-banner-6.jpg";
      case LANGUAGE_MNEMONICS.MARATHI:
        return "/assets/images/home-banner-7.jpg";
      case LANGUAGE_MNEMONICS.BHOJPURI:
        return "/assets/images/home-banner-8.jpg";
      default:
        return "/assets/images/home-banner-9.jpg";
    }
  };

  return (
    <Banner
      type={getBannerType()}
      src={getBannerImage()}
      className="rounded-lg banner-section mx-5 md:mx-0"
    />
  );
};

export default ChillGuyBanner;
