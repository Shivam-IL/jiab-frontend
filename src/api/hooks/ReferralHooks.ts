import { useMutation, useQuery } from "@tanstack/react-query";
import { ReferralService } from "../services/ReferralService";
import { TReferral, TReferralSendAgain } from "../types/ReferralTypes";
import { keys } from "../utils";

const referralService = ReferralService.getInstance();

const useSendReferral = () => {
  return useMutation({
    mutationFn: (referralData: TReferral) =>
      referralService.sendReferral(referralData),
  });
};

const useGetAllReferrals = () => {
  return useQuery({
    queryKey: keys.referral.getAllReferrals(),
    queryFn: () => referralService.getAllReferrals(),
  });
};

const useSendAgain = () => {
  return useMutation({
    mutationFn: (referralData: TReferralSendAgain) =>
      referralService.sendAgain(referralData),
  });
};

export { useSendReferral, useGetAllReferrals, useSendAgain };
