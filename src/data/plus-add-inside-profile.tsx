import { TCMSResponse } from "@/api/types/CMSTypes";

export interface PlusAddInsideProfileData {
  addressLine1: string;
  addressLine2: string;
  nearestLandmark: string;
  altMobileNumber: string;
  pincode: string;
  state: string;
  city: string;
  setAsDefault: string;
  saveAddress: string;
  tAndC: string;
  privacyPolicy: string;
  trademark: string;
}

export const mapPlusAddInsideProfileData = (
  cmsData: TCMSResponse["data"] | null
): PlusAddInsideProfileData => {
  const plusAddCMS = cmsData?.plus_add_inside_profile;

  return {
    addressLine1: plusAddCMS?.address_line_1 ?? "Address Line 1",
    addressLine2: plusAddCMS?.address_line_2 ?? "Address Line 2",
    nearestLandmark: plusAddCMS?.nearest_landmark ?? "Nearest Landmark",
    altMobileNumber: plusAddCMS?.alt_mobile_number ?? "Alt Mobile Number",
    pincode: plusAddCMS?.pincode ?? "Pincode",
    state: plusAddCMS?.state ?? "State",
    city: plusAddCMS?.city ?? "City",
    setAsDefault: plusAddCMS?.set_as_deafult ?? "Set as Default",
    saveAddress: plusAddCMS?.save_address ?? "Save Address",
    tAndC: plusAddCMS?.t_and_c ?? "T&C",
    privacyPolicy: plusAddCMS?.privacy_policy ?? "Privacy Policy",
    trademark: plusAddCMS?.trademark ?? "Trademark",
  };
};

// Default data for SSR/hydration
export const defaultPlusAddInsideProfileData: PlusAddInsideProfileData = {
  addressLine1: "Address Line 1",
  addressLine2: "Address Line 2",
  nearestLandmark: "Nearest Landmark",
  altMobileNumber: "Alt Mobile Number",
  pincode: "Pincode",
  state: "State",
  city: "City",
  setAsDefault: "Set as Default",
  saveAddress: "Save Address",
  tAndC: "T&C",
  privacyPolicy: "Privacy Policy",
  trademark: "Trademark",
};
