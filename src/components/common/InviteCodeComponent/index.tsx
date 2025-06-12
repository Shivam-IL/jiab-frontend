import InviteCodePopupWrapper from '@/components/InviteCodePopus'
import { INVITE_CODE_POPUP_DATA, INVITE_CODE_STATUS } from '@/constants/'
import React, { useEffect, useState } from 'react'
import { useVerifyReferral } from '@/api/hooks/ReferralHooks'

const InviteCodeComponent = ({
  open,
  setOpen,
  onClose
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onClose: () => void
}) => {
  const [invite2, setInvite2] = useState<boolean>(false)
  const [inviteCode, setInviteCode] = useState<string>('')

  const { mutate: verifyReferral, data: verifyReferralData } =
    useVerifyReferral()
  const [inviteCodeStatus, setInviteCodeStatus] = useState<string>('')

  const handleChangeInvite = (key: string, value: string) => {
    setInviteCode(value)
  }

  const handleVerifyReferral = () => {
    verifyReferral({ referral_code: inviteCode })
  }

  useEffect(() => {
    if (verifyReferralData?.ok) {
      const { status } = verifyReferralData?.data as { status?: string }
      setInviteCodeStatus(status as string)
      if (status === INVITE_CODE_STATUS.SUCCESS) {
        setOpen(false)
      } else if (status === INVITE_CODE_STATUS.INVALID_REFERRAL_CODE) {
        setInvite2(true)
        setOpen(false)
      }
    }
  }, [verifyReferralData])

  return (
    <>
      {open && (
        <InviteCodePopupWrapper
          title={INVITE_CODE_POPUP_DATA.INVITE_CODE.TITLE}
          subtitle={INVITE_CODE_POPUP_DATA.INVITE_CODE.SUB_TITLE}
          ctaText={INVITE_CODE_POPUP_DATA.INVITE_CODE.CTA_TEXT}
          code={inviteCode}
          onChange={handleChangeInvite}
          open={open}
          onSubmit={() => {
            handleVerifyReferral()
          }}
          onClose={() => {
            setOpen(false)
            setInviteCode('')
            setInvite2(true)
          }}
        />
      )}
      {invite2 &&
        inviteCodeStatus === INVITE_CODE_STATUS.INVALID_REFERRAL_CODE && (
          <InviteCodePopupWrapper
            title={INVITE_CODE_POPUP_DATA.CHEAT_CODE_NOT_ALLOWED.TITLE}
            subtitle={INVITE_CODE_POPUP_DATA.CHEAT_CODE_NOT_ALLOWED.SUB_TITLE}
            ctaText={INVITE_CODE_POPUP_DATA.CHEAT_CODE_NOT_ALLOWED.CTA_TEXT}
            code={inviteCode}
            onChange={handleChangeInvite}
            open={invite2}
            onSubmit={() => {
              handleVerifyReferral()
            }}
            onClose={() => {
              setInvite2(false)
              setInviteCode('')
              setInviteCodeStatus('')
            }}
          />
        )}
    </>
  )
}

export default InviteCodeComponent
