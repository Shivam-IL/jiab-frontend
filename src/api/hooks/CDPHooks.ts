import { useMutation } from "@tanstack/react-query";
import { CDPService } from "../services/CDPService";

const cdpService = CDPService.getInstance();

const useSendCDPEvent = () => {
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      cdpService.sendCDPEvent(payload),
  });
};

export { useSendCDPEvent };
