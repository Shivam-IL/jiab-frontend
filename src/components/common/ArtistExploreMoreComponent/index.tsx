import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AktivGroteskText from "../AktivGroteskText";
import ExploreMoreArtistCard from "@/components/ExploreMoreArtistCard";
import { useRouter } from "next/navigation";
import {
  ARTIST_DATA,
  EXPLORE_MORE,
  TAP_TO_SEE_THE_FUNNIEST_LINE_UPS,
} from "@/constants";
import CustomCarousel from "../CustomCarousel";

const ArtistExploreMoreComponent = () => {
  const router = useRouter();
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  return (
    <div className="relative flex flex-col gap-[24px] w-full mt-[23px]">
      <div className="flex flex-col gap-[2px] w-full">
        <div className="flex justify-between items-center">
          <AktivGroteskText
            text={EXPLORE_MORE}
            fontSize="text-[16px] md:text-[30px]"
            fontWeight="font-[700]"
          />
          <button
            onClick={() => {
              router.push("./");
            }}
          >
            <AktivGroteskText
              text="View all >"
              fontSize="text-[12px] md:text-[20px]"
              fontWeight="font-[400]"
            />
          </button>
        </div>
        <AktivGroteskText
          text={TAP_TO_SEE_THE_FUNNIEST_LINE_UPS}
          fontSize="text-[12px] md:text-[20px]"
          fontWeight="font-[400]"
        />
      </div>

      {/* Mobile View (below md breakpoint) */}
      <div className="w-full md:hidden flex gap-[15px] overflow-scroll scrollbar-hide">
        {ARTIST_DATA.map((item: any) => (
          <ExploreMoreArtistCard
            key={item.id}
            name={item.profile.fullName}
            image={item.profile.profileImageUrl}
            followers={item.followers}
            id={item.id}
          />
        ))}
      </div>
      <div className="hidden w-full md:block gap-[15px] overflow-scroll scrollbar-hide">
        <CustomCarousel>
          {ARTIST_DATA.map((item) => {
            return (
              <div key={item.id}>
                <ExploreMoreArtistCard
                  key={item.id}
                  name={item.profile.fullName}
                  image={item.profile.profileImageUrl}
                  followers={item.followers}
                  id={item.id}
                />
              </div>
            );
          })}
        </CustomCarousel>
      </div>
    </div>
  );
};

export default ArtistExploreMoreComponent;
