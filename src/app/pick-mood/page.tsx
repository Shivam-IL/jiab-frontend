"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/common/Header/Header";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import MobileTempNavBar from "@/components/common/MobileTempNavBar";
import AktivGroteskText from "@/components/common/AktivGroteskText";
import Image from "next/image";
import useAppSelector from "@/hooks/useSelector";
import SurpriseMeLockModal from "@/components/common/SurpriseMeLockModal";
import useAppDispatch from "@/hooks/useDispatch";
import { updateLoginModal } from "@/store/auth/auth.slice";
import { triggerGAEvent } from "@/utils/gTagEvents";
import { GA_EVENTS, CATEGORY_ID_CMS_KEY_MAPPING } from "@/constants";
import { useGlobalLoader } from "@/hooks/useGlobalLoader";
import SurpriseMeModal from "@/components/common/SurpriseMeModal";
import { useCMSData } from "@/data";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";
import { getLanguageId } from "@/utils/languageUtils";

const PickMood: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const cmsData = useCMSData(mounted);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get genres from Redux store and auth state
  const { genres } = useAppSelector((state) => state.reference);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { forceHideLoader } = useGlobalLoader();
  const { selectedLanguage } = useLanguage();
  const isTamil = selectedLanguage === "ta";
  // Genre-specific surprise me modal state
  const [genreSurpriseModal, setGenreSurpriseModal] = useState<boolean>(false);
  const [selectedGenreId, setSelectedGenreId] = useState<number | undefined>(
    undefined
  );

  // Get language ID for the selected language
  const languageId = getLanguageId(selectedLanguage);

  // Transform genres from API to match the expected structure
  const categories =
    genres?.map((genre) => {
      const CATEGORY_ID_CMS_KEY_MAPPING_TYPED =
        CATEGORY_ID_CMS_KEY_MAPPING as Record<number, string>;
      const key = CATEGORY_ID_CMS_KEY_MAPPING_TYPED[genre.id];
      const isValidKey =
        typeof key === "string" && key in cmsData.jokeBoxFilter;

      return {
        id: genre.id.toString(),
        name: isValidKey
          ? (cmsData.jokeBoxFilter[
              key as keyof typeof cmsData.jokeBoxFilter
            ] as string)
          : genre.genre, // fallback to original genre name
        image_url: genre.image_url,
        url: "/scroll-and-lol",
      };
    }) || [];

  // Handle category click
  const handleCategoryClick = (category: {
    id: string;
    name: string;
    image_url: string;
    url: string;
  }) => {
    setSelectedCategory(category.id);

    // Check if user is authenticated before showing modal
    if (isAuthenticated) {
      setSelectedGenreId(parseInt(category.id));
      setGenreSurpriseModal(true);
      triggerGAEvent(GA_EVENTS.SPRITE_J24_SURPRISE_ME);
    } else {
      // Show login modal for unauthenticated users
      dispatch(updateLoginModal({ loginModal: true }));
    }
  };

  const closeGenreSurpriseMe = () => {
    forceHideLoader();
    setGenreSurpriseModal(false);
    setSelectedGenreId(undefined);
  };

  console.log(
    "genreSurpriseModal",
    genreSurpriseModal,
    isAuthenticated,
    selectedGenreId
  );

  return (
    <>
      <MobileTempNavBar
        title={cmsData.homePage.pickYourMoodHeading}
        subtitle={cmsData.homePage.pickYourMoodSubheading}
      />
      <ScreenWrapper className="md:bg-[#F2F2F2] bg-white border-t-[14px] border-[#F2F2F2] md:mt-[100px] mt-0">
        <Header
          title={cmsData.homePage.pickYourMoodHeading}
          description={cmsData.homePage.pickYourMoodSubheading}
          className="md:block hidden"
        />
        <div className="grid md:grid-cols-5 grid-cols-3 md:mt-[40px] md:gap-y-[24px] gap-y-[20px] justify-between">
          {categories.map((category) => (
            <div
              className={`flex flex-col items-center justify-center gap-[8px] cursor-pointer `}
              key={category.id}
              onClick={() => handleCategoryClick(category)}
            >
              <div
                className={`w-[90px] md:w-[140px] h-[90px] md:h-[140px] rounded-full flex items-center justify-center gap-[8px] hover:border-2 hover:border-green bg-white transition-border duration-600 overflow-hidden shadow-md ${
                  selectedCategory === category.id
                    ? "border-2 border-green"
                    : ""
                }`}
              >
                <Image
                  src={category.image_url}
                  alt={category.name}
                  width={86}
                  height={86}
                  className="md:w-[5rem] w-[3rem] h-auto object-cover"
                />
              </div>
              <AktivGroteskText
                text={category.name}
                fontSize={cn(
                  "text-[12px] md:text-[20px]",
                  isTamil &&
                    "text-[10px] md:text-[15px] md:max-w-[160px] max-w-[100px] text-center"
                )}
                fontWeight="font-[400]"
              />
            </div>
          ))}
        </div>
      </ScreenWrapper>

      {/* Genre-specific Surprise Me Modal */}
      {genreSurpriseModal && isAuthenticated && (
        <SurpriseMeModal
          category={
            categories?.find(
              (category) => category.id === selectedGenreId?.toString()
            )?.name ?? ""
          }
          genreId={selectedGenreId}
          languageId={languageId}
          pullJoke={true}
          onClose={() => {
            closeGenreSurpriseMe();
            setGenreSurpriseModal(false);
          }}
        />
      )}

      {/* Show login modal for unauthenticated users */}
      {genreSurpriseModal && !isAuthenticated && (
        <SurpriseMeLockModal onClose={closeGenreSurpriseMe} />
      )}
    </>
  );
};

export default PickMood;
