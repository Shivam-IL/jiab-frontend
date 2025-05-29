import { EXIT_POPUP_DATA } from '@/constants'
import ExitPopupWrapper from '../common/ExitPopupWrapper'

const MakeLaughExitPopup = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  return (
    <ExitPopupWrapper
      open={open}
      onClose={onClose}
      icon={EXIT_POPUP_DATA.MADE_YOU_LAUGH.ICON}
      title={EXIT_POPUP_DATA.MADE_YOU_LAUGH.TITLE}
      subtitle={EXIT_POPUP_DATA.MADE_YOU_LAUGH.SUB_TITLE}
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
    <ExitPopupWrapper
      open={open}
      onClose={onClose}
      icon={EXIT_POPUP_DATA.FOMO.ICON}
      title={EXIT_POPUP_DATA.FOMO.TITLE}
      subtitle={EXIT_POPUP_DATA.FOMO.SUB_TITLE}
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
    <ExitPopupWrapper
      open={open}
      onClose={onClose}
      icon={EXIT_POPUP_DATA.BREAK_THE_ICE.ICON}
      title={EXIT_POPUP_DATA.BREAK_THE_ICE.TITLE}
      subtitle={EXIT_POPUP_DATA.BREAK_THE_ICE.SUB_TITLE}
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
    <ExitPopupWrapper
      open={open}
      onClose={onClose}
      icon={EXIT_POPUP_DATA.DONT_MISS_OUT.ICON}
      title={EXIT_POPUP_DATA.DONT_MISS_OUT.TITLE}
      subtitle={EXIT_POPUP_DATA.DONT_MISS_OUT.SUB_TITLE}
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
    <ExitPopupWrapper
      open={open}
      onClose={onClose}
      icon={EXIT_POPUP_DATA.MADE_YOU_LAUGH.ICON}
      title={EXIT_POPUP_DATA.MADE_YOU_LAUGH.TITLE}
      subtitle={EXIT_POPUP_DATA.MADE_YOU_LAUGH.SUB_TITLE}
    />
  )
}

export {
  MakeLaughExitPopup,
  FOMOExitPopup,
  BreakTheIceExitPopup,
  DontMissOutExitPopup,
  MadeYouLaughExitPopup
}
