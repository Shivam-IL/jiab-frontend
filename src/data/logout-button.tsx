import { TCMSResponse } from "@/api/types/CMSTypes";

export interface LogoutButtonData {
  logout: string;
}

export const mapLogoutButtonData = (
  cmsData: TCMSResponse["data"] | null
): LogoutButtonData => {
  const logoutButtonCMS = cmsData?.logout_button_navbar_profile_dropdown;

  return {
    logout: logoutButtonCMS?.logout ?? "Logout",
  };
};

// Default data for SSR/hydration
export const defaultLogoutButtonData: LogoutButtonData = {
  logout: "Logout",
}; 