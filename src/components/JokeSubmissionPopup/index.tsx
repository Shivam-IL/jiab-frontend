import CustomPopupWrapper from '../common/CustomPopupWrapper'
import { JOKES_POPUP_DATA } from '@/constants'

const ApproveJokePopup = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  return (
    <CustomPopupWrapper
      title={JOKES_POPUP_DATA.JOKE_SUBMITTED.TITLE}
      subtitle={JOKES_POPUP_DATA.JOKE_SUBMITTED.SUB_TITLE}
      icon={JOKES_POPUP_DATA.JOKE_SUBMITTED.ICON}
      singleButton={JOKES_POPUP_DATA.JOKE_SUBMITTED.SINGLE_BUTTON}
      singleButtonText={JOKES_POPUP_DATA.JOKE_SUBMITTED.SINGLE_BUTTON_TEXT}
      open={open}
      onClose={onClose}
    />
  )
}

const JokeFeaturedPopup = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  return (
    <CustomPopupWrapper
      title={JOKES_POPUP_DATA.JOKE_FEATURED.TITLE}
      subtitle={JOKES_POPUP_DATA.JOKE_FEATURED.SUB_TITLE}
      icon={JOKES_POPUP_DATA.JOKE_FEATURED.ICON}
      singleButton={JOKES_POPUP_DATA.JOKE_FEATURED.SINGLE_BUTTON}
      singleButtonText={JOKES_POPUP_DATA.JOKE_FEATURED.SINGLE_BUTTON_TEXT}
      open={open}
      onClose={onClose}
    />
  )
}

const JokeNotSuitablePopup = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  return (
    <CustomPopupWrapper
      title={JOKES_POPUP_DATA.JOKE_NOT_SUITABLE.TITLE}
      subtitle={JOKES_POPUP_DATA.JOKE_NOT_SUITABLE.SUB_TITLE}
      icon={JOKES_POPUP_DATA.JOKE_NOT_SUITABLE.ICON}
      singleButton={JOKES_POPUP_DATA.JOKE_NOT_SUITABLE.SINGLE_BUTTON}
      singleButtonText={JOKES_POPUP_DATA.JOKE_NOT_SUITABLE.SINGLE_BUTTON_TEXT}
      open={open}
      onClose={onClose}
    />
  )
}

const JokeNotGoodEnoughPopup = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  return (
    <CustomPopupWrapper
      title={JOKES_POPUP_DATA.JOKE_NOT_GOOD_ENOUGH.TITLE}
      subtitle={JOKES_POPUP_DATA.JOKE_NOT_GOOD_ENOUGH.SUB_TITLE}
      icon={JOKES_POPUP_DATA.JOKE_NOT_GOOD_ENOUGH.ICON}
      singleButton={JOKES_POPUP_DATA.JOKE_NOT_GOOD_ENOUGH.SINGLE_BUTTON}
      singleButtonText={
        JOKES_POPUP_DATA.JOKE_NOT_GOOD_ENOUGH.SINGLE_BUTTON_TEXT
      }
      open={open}
      onClose={onClose}
    />
  )
}

const JokeOffensivePopup = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  return (
    <CustomPopupWrapper
      title={JOKES_POPUP_DATA.JOKE_OFFENSIVE.TITLE}
      subtitle={JOKES_POPUP_DATA.JOKE_OFFENSIVE.SUB_TITLE}
      icon={JOKES_POPUP_DATA.JOKE_OFFENSIVE.ICON}
      singleButton={JOKES_POPUP_DATA.JOKE_OFFENSIVE.SINGLE_BUTTON}
      singleButtonText={JOKES_POPUP_DATA.JOKE_OFFENSIVE.SINGLE_BUTTON_TEXT}
      open={open}
      onClose={onClose}
    />
  )
}

export {
  ApproveJokePopup,
  JokeFeaturedPopup,
  JokeNotSuitablePopup,
  JokeNotGoodEnoughPopup,
  JokeOffensivePopup,
}