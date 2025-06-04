import { CLAIM_POPUP_DATA } from '@/constants'
import CustomPopupWrapper from '../common/CustomPopupWrapper'
import AktivGroteskText from '../common/AktivGroteskText'

const ClaimSuccessPopup = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  return (
    <CustomPopupWrapper
      title={CLAIM_POPUP_DATA.CLAIMED.TITLE}
      subtitle={CLAIM_POPUP_DATA.CLAIMED.SUB_TITLE}
      icon={CLAIM_POPUP_DATA.CLAIMED.ICON}
      singleButton={CLAIM_POPUP_DATA.CLAIMED.SINGLE_BUTTON}
      singleButtonText={CLAIM_POPUP_DATA.CLAIMED.SINGLE_BUTTON_TEXT}
      open={open}
      onClose={onClose}
    />
  )
}

const ClaimExpiredPopup = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  return (
    <CustomPopupWrapper
      title={CLAIM_POPUP_DATA.CLAIM_EXPIRED.TITLE}
      subtitle={CLAIM_POPUP_DATA.CLAIM_EXPIRED.SUB_TITLE}
      icon={CLAIM_POPUP_DATA.CLAIM_EXPIRED.ICON}
      singleButton={CLAIM_POPUP_DATA.CLAIM_EXPIRED.SINGLE_BUTTON}
      singleButtonText={CLAIM_POPUP_DATA.CLAIM_EXPIRED.SINGLE_BUTTON_TEXT}
      open={open}
      onClose={onClose}
      childrenPosition='top'
    >
      <AktivGroteskText
        className='text-center'
        text={CLAIM_POPUP_DATA.CLAIM_EXPIRED.THIRD_TEXT}
        fontSize='text-[12px]'
        fontWeight='font-[400]'
      />
    </CustomPopupWrapper>
  )
}

const ClaimAlertPopup = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  return (
    <CustomPopupWrapper
      title={CLAIM_POPUP_DATA.CLAIM_ALERT.TITLE}
      subtitle={CLAIM_POPUP_DATA.CLAIM_ALERT.SUB_TITLE}
      icon={CLAIM_POPUP_DATA.CLAIM_ALERT.ICON}
      singleButton={CLAIM_POPUP_DATA.CLAIM_ALERT.SINGLE_BUTTON}
      singleButtonText={CLAIM_POPUP_DATA.CLAIM_ALERT.SINGLE_BUTTON_TEXT}
      open={open}
      onClose={onClose}
    />
  )
}

export { ClaimSuccessPopup, ClaimExpiredPopup, ClaimAlertPopup }
