import React from 'react'
import CustomPopupWrapper from '../common/CustomPopupWrapper'
import { ICONS_NAMES } from '@/constants'
import { useCMSData } from '@/data'

const VoteIsInPopup = ({
  open,
  onClose,
  singleButtonOnClick
}: {
  open: boolean
  onClose: () => void
  singleButtonOnClick: () => void
}) => {
  const { voteIsIn } = useCMSData()
  return (
    <CustomPopupWrapper
      open={open}
      onClose={() => {
        onClose()
      }}
      icon={ICONS_NAMES.CLAP}
      title={voteIsIn.vote_is_in_heading}
      subtitle={voteIsIn.vote_is_in_sub_heading}
      singleButton={true}
      singleButtonText={voteIsIn.vote_is_in_button_text}
      singleButtonOnClick={() => {
        singleButtonOnClick()
      }}
    />
  )
}

export default VoteIsInPopup
