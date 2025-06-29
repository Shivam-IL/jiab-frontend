import { TCMSResponse } from "@/api/types/CMSTypes";

export interface RefreshRingsData {
  refreshRingsHeader: string;
  refreshRingContent: string;
}

export const mapRefreshRingsData = (
  cmsData: TCMSResponse["data"] | null
): RefreshRingsData => {
  const refreshRingsCMS = cmsData?.refresh_ring;

  return {
    refreshRingsHeader:
      refreshRingsCMS?.refresh_rings_header ?? "Refresh Rings",
    refreshRingContent:
      refreshRingsCMS?.refresh_ring_content ??
      "Get fresh content with refresh rings",
  };
};

// Default data for SSR/hydration
export const defaultRefreshRingsData: RefreshRingsData = {
  refreshRingsHeader: "Refresh Rings",
  refreshRingContent: "Get fresh content with refresh rings",
};
