"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import SvgIcons from "../SvgIcons";
import { ICONS_NAMES } from "@/constants";
import { aktivGrotesk } from "@/app/layout";
import SurpriseMeCTA from "@/components/SurpriseMeCTA";
import { MakeLaughExitPopup } from "@/components/ExitPopUps";

const SurpriseMeModal = () => {
  const [open, setOpen] = useState<boolean>(true);

  const [makeLaughExitPopup, setMakeLaughExitPopup] = useState<boolean>(false);
  console.log("open", open, makeLaughExitPopup);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="border-none md:max-w-[239px] max-w-[277px] shadow-none p-0 rounded-[10px]">
        <div className="absolute border-none outline-none top-[-105px] md:top-[-125px] left-0 flex justify-center items-center w-full">
          <SvgIcons
            name={ICONS_NAMES.SURPRISE_ME}
            className="w-[145px] h-[102px] md:w-[182px] md:h-[114px]"
          />
        </div>
        <div className="flex justify-between items-start px-[10px] pt-[10px]">
          <div className="w-[80%] relative flex gap-[10px]">
            <SvgIcons
              name={ICONS_NAMES.MAN_WITH_SEARCH}
              className="w-[23px] h-[28px]"
            />
            <div className="flex flex-col gap-[2px]">
              <p
                className={`${aktivGrotesk.className} font-[700] md:text-[9px] text-[12px] text-[#000000]`}
              >
                Observation_English_cool boy & cool girl
              </p>
              <p
                className={`${aktivGrotesk.className} font-[400] md:text-[7px] text-[8px] text-[#000000]`}
              >
                Chill guy and Chill girl,
              </p>
            </div>
          </div>
          <button
            className="flex justify-center items-center"
            onClick={() => {
              setMakeLaughExitPopup(true);
            }}
          >
            <SvgIcons
              name={ICONS_NAMES.CROSS}
              className="w-[16px] h-[16px] md:w-[13px] md:h-[13px]"
            />
          </button>
        </div>
        <div className="relative max-w-[255px] md:max-w-[220px] h-[429px] md:h-[371px] ml-[11px]">
          <video
            className="w-full h-full relative bg-[#11A64B] "
            controls
            autoPlay
            muted
            loop
            poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          >
            <source src="/videos/sample.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="bg-white rounded-[10px] px-[12px] pb-[16px] flex justify-between">
          <div className="flex gap-[24px] md:gap-[14px] pl-[10px]">
            <SurpriseMeCTA
              name={ICONS_NAMES.FUNNY}
              text="2.3k"
              onClick={() => {}}
            />
            <SurpriseMeCTA
              name={ICONS_NAMES.MAD}
              text="2.3k"
              onClick={() => {}}
            />
            <SurpriseMeCTA
              name={ICONS_NAMES.ANGRY}
              text="2.3k"
              onClick={() => {}}
            />
          </div>
          <div className="pr-[10px]">
            <SurpriseMeCTA
              name={ICONS_NAMES.VIEWS}
              text="2.3k"
              onClick={() => {}}
            />
          </div>
        </div>
      </DialogContent>
      {makeLaughExitPopup && (
        <MakeLaughExitPopup
          open={makeLaughExitPopup}
          onClose={() => {
            setMakeLaughExitPopup(false);
            setOpen(false);
          }}
        />
      )}
    </Dialog>
  );
};

export default SurpriseMeModal;
