export interface TSendReportParams {
  assetId: string;
  information: string;
}

export interface TSendReportResponse {
  success: boolean;
  message: string;
  data?: unknown;
} 