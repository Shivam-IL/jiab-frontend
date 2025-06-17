import React, { useState } from 'react'
import CustomPopupWrapper from '../CustomPopupWrapper'
import { GA_EVENTS, ICONS_NAMES, REFERRAL_CODE } from '@/constants'
import ReferNowModal from '../ReferNowModal'
import { triggerGAEvent } from '@/utils/gTagEvents'
import ReportPopup from '../ReportPopup'
import { useRouter } from 'next/navigation'

const isValidUrl = (url: string) => {
  const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
  return regex.test(url)
}

const ReportPopupComponent = ({
  open,
  onClose,
  setOpen
}: {
  open: boolean
  onClose: () => void
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [refferalLink, setRefferalLink] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [open2, setOpen2] = useState<boolean>(false)

  const handleChange = (key: string, value: string) => {
    setRefferalLink(value)
  }

  const submitReport = () => {
    //validate refferal link
    if (refferalLink.length === 0) {
      setError('Please enter a valid URL')
      return
    }
    //validate url
    if (!isValidUrl(refferalLink)) {
      console.log('invalid url')
      setError('Please enter a valid URL')
      return
    }
    setOpen2(true)
    setOpen?.(false)
  }

  const router = useRouter()

  return (
    <>
      {open && (
        <ReportPopup
          title={
            'Please provide a link below so we can verify if this joke is plagiarised.'
          }
          ctaText={'Submit'}
          placeholder={'Source URL*'}
          refferalLink={refferalLink}
          onChange={handleChange}
          open={open}
          onSubmit={() => {
            triggerGAEvent(GA_EVENTS.SPRITE_J24_REFER_NOW)
            submitReport()
          }}
          error={error}
          onClose={() => {
            onClose()
            setRefferalLink('')
          }}
        />
      )}
      {open2 && (
        <CustomPopupWrapper
          icon={ICONS_NAMES.CRYING}
          title={'We heard you!'}
          subtitle={"Thand Rakh, we'll get this sorted soon."}
          singleButtonText={'Explore More'}
          singleButton={true}
          singleButtonOnClick={() => {
            router.push('/user-generated-jokes')
          }}
          open={open2}
          onClose={() => {
            onClose()
            setOpen2(false)
            setRefferalLink('')
          }}
        />
      )}
    </>
  )
}

export default ReportPopupComponent
