import { TCMSResponse } from "@/api/types/CMSTypes";

export interface PrivacyPolicyData {
  privacyPolicyHeading: string;
  privacyPolicyContent: string;
}

export const mapPrivacyPolicyData = (
  cmsData: TCMSResponse["data"] | null
): PrivacyPolicyData => {
  const privacyPolicyCMS = cmsData?.privacy_policy;

  return {
    privacyPolicyHeading:
      privacyPolicyCMS?.privacy_policy_heading ?? "Privacy Policy",
    privacyPolicyContent:
      privacyPolicyCMS?.privacy_policy ??
      "Privacy policy content will be displayed here.",
  };
};

// Default data for SSR/hydration
export const defaultPrivacyPolicyData: PrivacyPolicyData = {
  privacyPolicyHeading: "Privacy Policy",
  privacyPolicyContent: "Privacy policy content will be displayed here.",
};
