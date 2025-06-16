import React, { useEffect } from 'react'
import CustomPopupWrapper from '../CustomPopupWrapper'
import { ICONS_NAMES } from '@/constants'
import { useCMSData } from '@/data'
import { useSessionModal } from '@/hooks/useSessionModal'

const SerialChillerPopup = ({
  open,
  onClose
}: {
  open: boolean
  onClose: () => void
}) => {
  const { serialChiller } = useCMSData()
  const { markAsShown } = useSessionModal("hasShownSerialChiller", open)

  useEffect(() => {
    if (open) {
      markAsShown()
    }
  }, [open, markAsShown])

  return (
    <CustomPopupWrapper
      open={open}
      onClose={onClose}
      icon={ICONS_NAMES.EXTREME_LAUGH}
      title={serialChiller.serialChillerHeading}
      subtitle={serialChiller.serialChillerSubHeading1}
    >
      <center>{serialChiller.serialChillerSubHeading2}</center>
    </CustomPopupWrapper>
  )
}

export default SerialChillerPopup
