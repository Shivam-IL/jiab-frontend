import { TCMSResponse } from "@/api/types/CMSTypes";

export interface ContactUsData {
  contactUsHeading: string;
  emailUs: string;
  callUsTollFreeHeading: string;
}

export const mapContactUsData = (
  cmsData: TCMSResponse["data"] | null
): ContactUsData => {
  const contactUsCMS = cmsData?.contact_us;

  return {
    contactUsHeading: contactUsCMS?.contact_us_heading ?? "Contact Us",
    emailUs: contactUsCMS?.email_us ?? "Email Us",
    callUsTollFreeHeading:
      contactUsCMS?.call_us_toll_free_heading ?? "Call Us Toll Free",
  };
};

// Default data for SSR/hydration
export const defaultContactUsData: ContactUsData = {
  contactUsHeading: "Contact Us",
  emailUs: "Email Us",
  callUsTollFreeHeading: "Call Us Toll Free",
};
