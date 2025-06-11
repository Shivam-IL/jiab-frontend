import { TCMSResponse } from "@/api/types/CMSTypes";

export interface FaqData {
  faqHeading: string;
  faqSubHeading: string;
}

export const mapFaqData = (cmsData: TCMSResponse["data"] | null): FaqData => {
  const faqCMS = cmsData?.faq;

  return {
    faqHeading: faqCMS?.faq_heading ?? "Frequently Asked Questions",
    faqSubHeading:
      faqCMS?.faq_sub_heading ?? "Find answers to common questions",
  };
};

// Default data for SSR/hydration
export const defaultFaqData: FaqData = {
  faqHeading: "Frequently Asked Questions",
  faqSubHeading: "Find answers to common questions",
};
