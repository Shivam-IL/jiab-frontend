import { TCMSResponse } from "@/api/types/CMSTypes";

export interface InviteCodeData {
  inviteCodeHeading: string;
  inviteCodeSubHeading: string;
  inviteCodeButtonText: string;
}

export const mapInviteCodeData = (
  cmsData: TCMSResponse["data"] | null
): InviteCodeData => {
  const inviteCodeCMS = cmsData?.have_an_invite_code;

  return {
    inviteCodeHeading:
      inviteCodeCMS?.have_an_invite_code_header ?? "Have an invite code?",
    inviteCodeSubHeading:
      inviteCodeCMS?.have_an_invite_code_sub_heading ??
      "Enter the code you received from your friend",
    inviteCodeButtonText:
      inviteCodeCMS?.have_an_invite_code_button_text ?? "Submit",
  };
};

// Default data for SSR/hydration
export const defaultInviteCodeData: InviteCodeData = {
  inviteCodeHeading: "Have an invite code?",
  inviteCodeSubHeading: "Enter the code you received from your friend",
  inviteCodeButtonText: "Submit",
};
