import { TCMSResponse } from "@/api/types/CMSTypes";

export interface HaveAnInviteCodeData {
  haveAnInviteCodeHeader: string;
  haveAnInviteCodeSubHeading: string;
}

export const mapHaveAnInviteCodeData = (
  cmsData: TCMSResponse["data"] | null
): HaveAnInviteCodeData => {
  const haveAnInviteCodeCMS = cmsData?.have_an_invite_code;

  return {
    haveAnInviteCodeHeader:
      haveAnInviteCodeCMS?.have_an_invite_code_header ?? "Have an Invite Code?",
    haveAnInviteCodeSubHeading:
      haveAnInviteCodeCMS?.have_an_invite_code_sub_heading ??
      "Enter your invite code to get started",
  };
};

// Default data for SSR/hydration
export const defaultHaveAnInviteCodeData: HaveAnInviteCodeData = {
  haveAnInviteCodeHeader: "Have an Invite Code?",
  haveAnInviteCodeSubHeading: "Enter your invite code to get started",
}; 