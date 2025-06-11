import { TCMSResponse } from "@/api/types/CMSTypes";

export interface WebFooterData {
  needHelpTextHeading: string;
  faqText: string;
  termsAndConditionsText: string;
  sitemapText: string;
  privacyPolicy: string;
  footerEndHeading: string;
}

export const mapWebFooterData = (
  cmsData: TCMSResponse["data"] | null
): WebFooterData => {
  const webFooterCMS = cmsData?.web_footer;

  return {
    needHelpTextHeading: webFooterCMS?.need_help_text_heading ?? "Need Help?",
    faqText: webFooterCMS?.faq_text ?? "FAQ",
    termsAndConditionsText:
      webFooterCMS?.terms_and_conditions_text ?? "Terms & Conditions",
    sitemapText: webFooterCMS?.sitemap_text ?? "Sitemap",
    privacyPolicy: webFooterCMS?.privacy_policy ?? "Privacy Policy",
    footerEndHeading:
      webFooterCMS?.footer_end_heading ?? "© 2025 Sprite. All rights reserved.",
  };
};

// Default data for SSR/hydration
export const defaultWebFooterData: WebFooterData = {
  needHelpTextHeading: "Need Help?",
  faqText: "FAQ",
  termsAndConditionsText: "Terms & Conditions",
  sitemapText: "Sitemap",
  privacyPolicy: "Privacy Policy",
  footerEndHeading: "© 2024 Sprite. All rights reserved.",
};
