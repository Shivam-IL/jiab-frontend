import { useMutation } from "@tanstack/react-query";
import { MixCodeService } from "../services/MixCodeService";
import { TMixCodeRedeem } from "../types/MixCodeTypes";

const mixCodeService = MixCodeService.getInstance();

const useRedeemMixCode = () => {
  return useMutation({
    mutationFn: (mixCodeData: TMixCodeRedeem) =>
      mixCodeService.redeemMixCode(mixCodeData),
  });
};

export { useRedeemMixCode }; 