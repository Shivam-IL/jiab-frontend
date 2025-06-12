import { useMutation, useQuery } from "@tanstack/react-query";
import { ReferralService } from "../services/ReferralService";
import {
  TReferral,
  TReferralSendAgain,
  TReferralVerify,
} from "../types/ReferralTypes";
import { keys } from "../utils";
import useAppSelector from "@/hooks/useSelector";

const referralService = ReferralService.getInstance();

const useSendReferral = () => {
  return useMutation({
    mutationFn: (referralData: TReferral) =>
      referralService.sendReferral(referralData),
  });
};

const useGetAllReferrals = ({
  page,
  referralCode,
}: {
  page: number;
  referralCode?: string;
}) => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  return useQuery({
    queryKey: [keys.referral.getAllReferrals(), { referralCode, page }],
    queryFn: () => referralService.getAllReferrals(page),
    enabled: isAuthenticated && token ? true : false,
    staleTime: 0,
  });
};

const useSendReferralAgain = () => {
  return useMutation({
    mutationFn: (referralData: TReferralSendAgain) =>
      referralService.sendAgain(referralData),
  });
};

const useVerifyReferral = () => {
  return useMutation({
    mutationFn: (referralData: TReferralVerify) =>
      referralService.verifyReferral(referralData),
  });
};

export {
  useSendReferral,
  useGetAllReferrals,
  useSendReferralAgain,
  useVerifyReferral,
};
