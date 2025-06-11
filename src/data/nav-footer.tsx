import { TCMSResponse } from "@/api/types/CMSTypes";

export interface NavFooterData {
  home: string;
  contest: string;
  comicCoins: string;
  refreshRings: string;
  profile: string;
  tAndC: string;
  privacyPolicy: string;
  trademark: string;
}

export const mapNavFooterData = (
  cmsData: TCMSResponse["data"] | null
): NavFooterData => {
  const navFooterCMS = cmsData?.nav_footer;

  return {
    home: navFooterCMS?.home ?? "Home",
    contest: navFooterCMS?.contest ?? "Contest",
    comicCoins: navFooterCMS?.comic_coins ?? "Comic Coins",
    refreshRings: navFooterCMS?.refresh_rings ?? "Refresh Rings",
    profile: navFooterCMS?.profile ?? "Profile",
    tAndC: navFooterCMS?.t_and_c ?? "T&C",
    privacyPolicy: navFooterCMS?.privacy_policy ?? "Privacy Policy",
    trademark: navFooterCMS?.trademark ?? "Trademark",
  };
};

// Default data for SSR/hydration
export const defaultNavFooterData: NavFooterData = {
  home: "Home",
  contest: "Contest",
  comicCoins: "Comic Coins",
  refreshRings: "Refresh Rings",
  profile: "Profile",
  tAndC: "T&C",
  privacyPolicy: "Privacy Policy",
  trademark: "Trademark",
};
