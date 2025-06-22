import { useMutation } from "@tanstack/react-query";
import { ReportService } from "../services/ReportService";
import { TSendReportParams } from "../types/ReportTypes";

const reportInstance = ReportService.getInstance();

const useSendReport = () => {
  return useMutation({
    mutationFn: (data: TSendReportParams) => reportInstance.SendReport(data),
  });
};

export { useSendReport }; 