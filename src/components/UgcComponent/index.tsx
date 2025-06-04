import React, { useState, useEffect } from "react";
import SvgIcons from "../common/SvgIcons";
import { ICONS_NAMES } from "@/constants";
import { aktivGrotesk } from "@/app/layout";
import AktivGroteskText from "../common/AktivGroteskText";
import UgcCard from "../common/UgcCard";
import UgcFilterModal from "../UgcFilterModal";
import { Dialog, DialogContent } from "../ui/dialog";
import GreenCTA from "../GreenCTA";
import { IUgcComponent } from "@/interfaces";

const UgcComponent: React.FC<IUgcComponent> = ({ isUnmounting }) => {
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    if (isUnmounting) {
      setShowExitModal(true);
    }
  }, [isUnmounting]);

  return (
    <div className="py-[16px] md:py-[24px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px] md:gap-x-[94px] md:gap-y-[24px]">
        {Array.from({ length: 9 }).map((_, index) => (
          <UgcCard key={index} />
        ))}
      </div>
      <div className="flex justify-center items-center md:mt-[32px] mt-[16px]">
        <GreenCTA
          text="Load More"
          className="leading-tight"
          paddingClass="md:py-[16px] md:px-[50px] px-[20px] py-[10px]"
          fontSize="md:text-[28px] text-[16px]"
          fontWeight="font-[700]"
          onClick={() => {}}
        />
      </div>

      <Dialog open={showExitModal} onOpenChange={setShowExitModal}>
        <DialogContent className="max-w-[343px] rounded-[10px] py-[16px] px-[16px]">
          <div className="flex items-center justify-end pb-[8px]">
            <button
              onClick={() => setShowExitModal(false)}
              className="border-none outline-none bg-transparent hover:opacity-70 transition-opacity"
            >
              <SvgIcons
                name={ICONS_NAMES.CROSS}
                className="w-[16px] h-[16px]"
              />
            </button>
          </div>
          <div className="flex flex-col gap-[24px]">
            <AktivGroteskText
              text="Are you sure you want to leave?"
              fontSize="text-[16px]"
              fontWeight="font-[700]"
            />
            <AktivGroteskText
              text="Your selected filters will be lost."
              fontSize="text-[12px]"
              fontWeight="font-[400]"
              className="text-gray-600"
            />
            <div className="flex flex-col gap-[12px]">
              <GreenCTA
                onClick={() => {
                  // Apply filters before unmounting
                  setShowExitModal(false);
                }}
                text="Apply and Exit"
                className="w-full"
                paddingClass="pt-[19px] pb-[14px]"
                fontSize="text-[16px]"
                fontWeight="font-[700]"
              />
              <button
                onClick={() => {
                  setShowExitModal(false);
                }}
                className="w-full border border-gray-200 rounded-full pt-[19px] pb-[14px] hover:bg-gray-50"
              >
                <AktivGroteskText
                  text="Exit Without Applying"
                  fontSize="text-[16px]"
                  fontWeight="font-[700]"
                  className="text-gray-600"
                />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UgcComponent;
