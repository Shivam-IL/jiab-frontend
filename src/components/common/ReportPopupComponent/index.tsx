import React, { useCallback, useEffect, useRef, useState } from 'react'
import CustomPopupWrapper from '../CustomPopupWrapper'
import { GA_EVENTS, ICONS_NAMES } from '@/constants'
import { triggerGAEvent } from '@/utils/gTagEvents'
import ReportPopup from '../ReportPopup'
import { usePathname, useRouter } from 'next/navigation'
import { useSendReportToGluedin } from '@/api/hooks/GluedinHooks'
import { useSendReport } from '@/api/hooks/ReportHooks'
import {
  BaseCDPEventPayload,
  CDPEventPayloadBuilder,
} from "@/api/utils/cdpEvents";
import { useSendCDPEvent } from "@/api/hooks/CDPHooks";
import { useCMSData } from "@/data";

const isValidUrl = (url: string) => {
  const regex = /^https:\/\/([\da-z.-]+)\.([a-z.]{2,4})([\/\w .-]*)*\/?$/i
  return regex.test(url)
}

const isValidUrl2 = (url: string) => {
  const regex = /^http:\/\/([\da-z.-]+)\.([a-z.]{2,4})([\/\w .-]*)*\/?$/i;
  return regex.test(url);
};

const ReportPopupComponent = ({
  open,
  onClose,
  setOpen,
  assetId,
  userId,
  actingUserId,
}: {
  open: boolean;
  onClose: () => void;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  assetId: string;
  userId: string;
  actingUserId: string;
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const cmsData = useCMSData(mounted);
  const [refferalLink, setRefferalLink] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [open2, setOpen2] = useState<boolean>(false);
  const { mutate: sendReportToGluedin, data: reportData } =
    useSendReportToGluedin();
  const { mutate: sendReport } = useSendReport();
  const pathName = usePathname();
  const { reportPopup, thandRakh } = useCMSData()
  const errorRef = useRef(false)

  const handleChange = (key: string, value: string) => {
    if (value?.length === 0) {
      errorRef.current = true
      setError('url is a required field')
    } else {
      if (isValidUrl(value) || isValidUrl2(value)) {
        setError('')
      } else {
        if (errorRef.current) {
          setError('Please enter a valid URL')
        }
      }
    }
    setRefferalLink(value);
  };
  const { mutate: sendCDPEvent } = useSendCDPEvent();

  const submitReport = () => {
    //validate refferal link
    if (refferalLink.length === 0) {
      setError(cmsData.validation.reportPopupUrlValidation);
      return;
    }

    console.log('Is valid url', isValidUrl(refferalLink))
    //validate url
    if (!isValidUrl(refferalLink) && !isValidUrl2(refferalLink)) {
      errorRef.current = true
      setError(cmsData.validation.reportPopupUrlValidation);
      return;
    }

    // Call both APIs simultaneously
    sendReportToGluedin({
      assetId,
      reason: refferalLink,
      userId: userId,
      actingUserId: actingUserId,
    });

    sendReport({
      assetId,
      information: refferalLink,
    });
  };

  const triggerReportCDPEvent = useCallback(() => {
    if (userId) {
      const payload: BaseCDPEventPayload =
        CDPEventPayloadBuilder.buildJokeReportedPayload({
          user_identifier: userId,
        });
      sendCDPEvent(payload);
    }
  }, [sendCDPEvent, userId]);

  useEffect(() => {
    if (reportData?.ok) {
      triggerReportCDPEvent();
      setOpen?.(false);
      setOpen2(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportData]);

  const router = useRouter();

  useEffect(() => {
    return () => {
      setOpen?.(false);
      setOpen2(false);
      onClose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <>
      {open && (
        <ReportPopup
          title={reportPopup.report_heading}
          ctaText={reportPopup.report_submit_button}
          placeholder={reportPopup.report_placeholder}
          refferalLink={refferalLink}
          onChange={handleChange}
          open={open}
          onSubmit={() => {
            triggerGAEvent(GA_EVENTS.SPRITE_J24_REFER_NOW);
            submitReport();
          }}
          error={error}
          onBlur={() => {
            if (refferalLink.length === 0) {
              setError('url is a required field')
              errorRef.current = true
            }
          }}
          onClose={() => {
            onClose()
            setOpen?.(false)
            setOpen2(false)
            setRefferalLink('')
            setError('')
            errorRef.current = false
          }}
        />
      )}
      {open2 && (
        <CustomPopupWrapper
          icon={ICONS_NAMES.CRYING}
          title={thandRakh.thand_rakh_heading}
          subtitle={thandRakh.thand_rakh_subheading}
          singleButtonText={thandRakh.thand_rakh_explore_button}
          singleButtonOnClick={() => {
            if (pathName === "/user-generated-jokes") {
              setOpen2(false);
              setOpen?.(false);
              onClose();
              return;
            }
            router.push("/user-generated-jokes");
          }}
          open={open2}
          onClose={() => {
            onClose()
            setOpen?.(false)
            setOpen2(false)
            setRefferalLink('')
            setError('')
            errorRef.current = false
          }}
        />
      )}
    </>
  );
};

export default ReportPopupComponent;
