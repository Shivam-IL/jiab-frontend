import React, { useEffect, useState } from "react";
import { GA_EVENTS, LOCAL_IMAGES } from "@/constants";
import AktivGroteskText from "../common/AktivGroteskText";
import SurpriseMeModal from "../common/SurpriseMeModal";
import { generateImageurl } from "@/utils";
import useAppSelector from "@/hooks/useSelector";
import SurpriseMeLockModal from "../common/SurpriseMeLockModal";
import { useCMSData } from "@/data";
import { triggerGAEvent } from "@/utils/gTagEvents";
import { useGlobalLoader } from "@/hooks/useGlobalLoader";
import { useSessionModal } from "@/hooks/useSessionModal";

const HomePageSurpriseButton = () => {
  const { isAuthenticated, token, enableCoachMarks } = useAppSelector(
    (state) => state.auth
  );
  const [mounted, setMounted] = useState(false);
  const cmsData = useCMSData(mounted);
  const { forceHideLoader } = useGlobalLoader();

  useEffect(() => {
    setMounted(true);
  }, []);

  const [surpriseMeModal, setSurpriseMeModal] = useState<boolean>(false);
  const [serialChillerOpen, setSerialChillerOpen] = useState<boolean>(false);
  const { shouldShow: shouldShowSerialChiller, hasChecked: hasCheckedSerialChiller, markAsShown: markSerialChillerAsShown } = useSessionModal("hasShownSerialChiller");

  const openSurpriseMe = () => {
    setSurpriseMeModal(true);
    triggerGAEvent(GA_EVENTS.SPRITE_J24_SURPRISE_ME);
  };

  const closeSurpriseMe = () => {
    forceHideLoader(); // Ensure any loading states are cleared
    setSurpriseMeModal(false);
  };

  console.log("surpriseMeModal", surpriseMeModal && isAuthenticated && token && !enableCoachMarks);

  return (
    <>
      <button
        onClick={openSurpriseMe}
        className="fixed cursor-pointer md:top-[50%] top-[68%] right-[10px] border-[1px] border-[#11A64B] rounded-[100px] min-w-[78px] md:max-w-[185px]
    py-[8px] pl-[5px] pr-[8px] md:px-[24px] md:py-[15px] flex items-center gap-[5px] bg-yellow"
      >
        <div className="relative  min-w-[25px] min-h-[25px] md:min-w-[42px]  md:min-h-[42px]  rounded-full bg-white flex items-center justify-center">
          <img
            className="md:w-[33px] md:h-[33px] w-[20px] h-[20px]"
            src={generateImageurl(LOCAL_IMAGES.SURPRISE_ME)}
            alt="surprise me"
          />
          {/* <SvgIcons
          name={ICONS_NAMES.SURPRISE}
          className='md:w-[33px] md:h-[33px] w-[20px] h-[20px]'
        /> */}
        </div>
        <AktivGroteskText
          text={cmsData.comic.surpriseMe}
          className="text-[#11A64B] uppercase leading-tight text-center text-[9px] md:text-[16px] font-bold"
        />
      </button>
      {surpriseMeModal && isAuthenticated && token && !enableCoachMarks && (
        <SurpriseMeModal onClose={closeSurpriseMe}  />
      )}
      {surpriseMeModal && !isAuthenticated && !token && (
        <SurpriseMeLockModal onClose={closeSurpriseMe}/>
      )}
    </>
  );
};

export default HomePageSurpriseButton;
