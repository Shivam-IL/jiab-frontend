import React from "react";
import { useLanguage } from "@/hooks/useLanguage";
import Banner from "@/components/common/Banner/Banner";

const ChillGuyBanner = () => {
  const { selectedLanguage } = useLanguage();

  // Determine the banner image based on selected language
  const getBannerImage = () => {
    if (selectedLanguage === "en") {
      return "/videos/home-banner-en.gif";
    } else {
      // Assuming Hindi or other languages use a different banner
      return "/assets/images/home-banner-hi.svg";
    }
  };

  return (
    <Banner
      type="image"
      src={getBannerImage()}
      className="rounded-lg banner-section mx-5 md:mx-0"
    />
  );
};

export default ChillGuyBanner;
