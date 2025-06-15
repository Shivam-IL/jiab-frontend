import { EXIT_POPUP_DATA } from '@/constants'
import CustomPopupWrapper from '../common/CustomPopupWrapper'

const DonTstealThunderExitPopup = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
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
  )
}

const MakeLaughExitPopup = ({
  open,
  onClose,
  setOpen
}: {
  open: boolean
  onClose: () => void
  setOpen?: (open: boolean) => void
}) => {
  return (
    <CustomPopupWrapper
      open={open}
      onClose={onClose}
      icon={EXIT_POPUP_DATA.MAKE_LAUGH.ICON}
      title={EXIT_POPUP_DATA.MAKE_LAUGH.TITLE}
      subtitle={EXIT_POPUP_DATA.MAKE_LAUGH.SUB_TITLE}
      doubleButton={true}
      setOpen={setOpen}
    />
  )
}

const FOMOExitPopup = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
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
  )
}

const BreakTheIceExitPopup = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  return (
    <CustomPopupWrapper
      open={open}
      onClose={onClose}
      icon={EXIT_POPUP_DATA.BREAK_THE_ICE.ICON}
      title={EXIT_POPUP_DATA.BREAK_THE_ICE.TITLE}
      subtitle={EXIT_POPUP_DATA.BREAK_THE_ICE.SUB_TITLE}
      doubleButton={true}
    />
  )
}

const DontMissOutExitPopup = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
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
  )
}

const MadeYouLaughExitPopup = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  return (
    <CustomPopupWrapper
      open={open}
      onClose={onClose}
      icon={EXIT_POPUP_DATA.MADE_YOU_LAUGH.ICON}
      title={EXIT_POPUP_DATA.MADE_YOU_LAUGH.TITLE}
      subtitle={EXIT_POPUP_DATA.MADE_YOU_LAUGH.SUB_TITLE}
      doubleButton={true}
    />
  )
}

export {
  MakeLaughExitPopup,
  FOMOExitPopup,
  BreakTheIceExitPopup,
  DontMissOutExitPopup,
  MadeYouLaughExitPopup,
  DonTstealThunderExitPopup
}
