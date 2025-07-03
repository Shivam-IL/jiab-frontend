import { EXIT_POPUP_DATA } from "@/constants";
import CustomPopupWrapper from "../common/CustomPopupWrapper";
import { useCMSData } from "@/data";
import { useEffect, useState } from "react";

const DonTstealThunderExitPopup = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <CustomPopupWrapper
      open={open}
      onClose={onClose}
      icon={EXIT_POPUP_DATA.DONT_STEAL_THUNDER.ICON}
      title={EXIT_POPUP_DATA.DONT_STEAL_THUNDER.TITLE}
      subtitle={EXIT_POPUP_DATA.DONT_STEAL_THUNDER.SUB_TITLE}
      singleButton={EXIT_POPUP_DATA.DONT_STEAL_THUNDER.SINGLE_BUTTON}
      singleButtonText={EXIT_POPUP_DATA.DONT_STEAL_THUNDER.SINGLE_BUTTON_TEXT}
      singleButtonOnClick={onClose}
    />
  );
};

const MakeLaughExitPopup = ({
  open,
  onClose,
  setOpen,
  yesButtonClick,
  noButtonClick,
}: {
  open: boolean;
  onClose: () => void;
  setOpen?: (open: boolean) => void;
  yesButtonClick: () => void;
  noButtonClick: () => void;
}) => {
  const { didThatMakeYouLaugh } = useCMSData();
  return (
    <CustomPopupWrapper
      open={open}
      onClose={() => {
        onClose()
      }}
      icon={EXIT_POPUP_DATA.MAKE_LAUGH.ICON}
      title={didThatMakeYouLaugh?.didThatMakeYouLaughHeading}
      subtitle={didThatMakeYouLaugh?.didThatMakeYouLaughSubHeading1}
      sureToExitText={didThatMakeYouLaugh?.didThatMakeYouLaughSubHeading2}
      yesButtonText={didThatMakeYouLaugh?.didThatMakeYouLaughYesButton}
      noButtonText={didThatMakeYouLaugh?.didThatMakeYouLaughNoButton}
      doubleButton={true}
      setOpen={setOpen}
      yesButtonClick={() => yesButtonClick()}
      noButtonClick={() => noButtonClick()}
    />
  );
};

const FOMOExitPopup = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <CustomPopupWrapper
      open={open}
      onClose={onClose}
      icon={EXIT_POPUP_DATA.FOMO.ICON}
      title={EXIT_POPUP_DATA.FOMO.TITLE}
      subtitle={EXIT_POPUP_DATA.FOMO.SUB_TITLE}
      doubleButton={true}
    />
  );
};

const BreakTheIceExitPopup = ({
  open,
  yesButtonClick,
  noButtonClick,
  onClose,
}: {
  open: boolean;
  yesButtonClick: () => void;
  noButtonClick: () => void;
  onClose: () => void;
}) => {
  const { breakTheIce } = useCMSData();
  console.log("breakTheIce", breakTheIce);
  return (
    <CustomPopupWrapper
      open={open}
      onClose={onClose}
      yesButtonClick={yesButtonClick}
      noButtonClick={noButtonClick}
      icon={EXIT_POPUP_DATA.BREAK_THE_ICE.ICON}
      title={breakTheIce?.breakTheIceHeading}
      subtitle={breakTheIce?.breakTheIceSubHeading1}
      sureToExitText={breakTheIce?.breakTheIceSubHeading2}
      yesButtonText={breakTheIce?.breakTheIceYesButton}
      noButtonText={breakTheIce?.breakTheIceNoButton}
      doubleButton={true}
    />
  );
};

const DontMissOutExitPopup = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <CustomPopupWrapper
      open={open}
      onClose={onClose}
      icon={EXIT_POPUP_DATA.DONT_MISS_OUT.ICON}
      title={EXIT_POPUP_DATA.DONT_MISS_OUT.TITLE}
      subtitle={EXIT_POPUP_DATA.DONT_MISS_OUT.SUB_TITLE}
      doubleButton={true}
    />
  );
};

const MadeYouLaughExitPopup = ({
  open,
  onClose,
  yesButtonClick,
  noButtonClick,
}: {
  open: boolean;
  onClose: () => void;
  yesButtonClick: () => void;
  noButtonClick: () => void;
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const cmsData = useCMSData(mounted);
  return (
    <CustomPopupWrapper
      open={open}
      onClose={onClose}
      icon={EXIT_POPUP_DATA.MADE_YOU_LAUGH.ICON}
      title={cmsData?.madeYouLoL?.madeYouLolHeading}
      subtitle={cmsData?.madeYouLoL?.madeYouLolSubHeading}
      sureToExitText={cmsData?.madeYouLoL?.madeYouLolSubHeading2}
      yesButtonClick={yesButtonClick}
      noButtonClick={noButtonClick}
      yesButtonText={cmsData?.madeYouLoL?.madeYouLolYesButtonText}
      noButtonText={cmsData?.madeYouLoL?.madeYouLolNoButtonText}
      doubleButton={true}
    />
  );
};

export {
  MakeLaughExitPopup,
  FOMOExitPopup,
  BreakTheIceExitPopup,
  DontMissOutExitPopup,
  MadeYouLaughExitPopup,
  DonTstealThunderExitPopup,
};
