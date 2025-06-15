import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import Banner from "@/components/common/Banner/Banner";

const ChillGuyBanner = () => {
  const { selectedLanguage } = useLanguage();

  // Determine the banner type based on selected language
  const getBannerType = () => {
    return selectedLanguage === "en" ? "video" : "image";
  };

  // Determine the banner image based on selected language
  const getBannerImage = () => {
    switch (selectedLanguage) {
      case "en":
        return "/videos/home-banner-en.mp4";
      case "hi":
        return "/assets/images/home-banner-hi.jpg";
      case "te":
        return "/assets/images/home-banner-3.jpg";
      case "or":
        return "/assets/images/home-banner-4.jpg";
      case "ba":
        return "/assets/images/home-banner-5.jpg";
      case "mr":
        return "/assets/images/home-banner-6.jpg";
      case "kn":
        return "/assets/images/home-banner-7.jpg";
      case "bho":
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
