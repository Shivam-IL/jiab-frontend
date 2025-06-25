import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ReferralService } from "../services/ReferralService";
import {
  TReferral,
  TReferralSendAgain,
  TReferralVerify,
} from "../types/ReferralTypes";
import { keys } from "../utils";
import useAppSelector from "@/hooks/useSelector";
import { useComicCoinRevalidation } from "@/hooks/useComicCoinRevalidation";

const referralService = ReferralService.getInstance();

const useSendReferral = () => {
  const { revalidateComicCoinsAfterDelay } = useComicCoinRevalidation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (referralData: TReferral) =>
      referralService.sendReferral(referralData),
    onSuccess: () => {
      // Revalidate comic coins when referral is sent successfully (referrals give coins)
      // Add delay to allow backend to process the coin increment
      revalidateComicCoinsAfterDelay(500);
      // Also revalidate referral list
      queryClient.invalidateQueries({
        queryKey: [...keys.referral.getAllReferrals()],
      });
    },
  });
};

const useGetAllReferrals = ({
  page,
  referralCode,
  query
}: {
  page: number;
  referralCode?: string;
  query?:string
}) => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  return useQuery({
    queryKey: [keys.referral.getAllReferrals(), { referralCode, page, query }],
    queryFn: () => referralService.getAllReferrals(page,query),
    enabled: isAuthenticated && token ? true : false,
    staleTime: 0,
  });
};

const useSendReferralAgain = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (referralData: TReferralSendAgain) =>
      referralService.sendAgain(referralData),
    onSuccess: () => {
      // Revalidate referral list when resent
      queryClient.invalidateQueries({
        queryKey: [...keys.referral.getAllReferrals()],
      });
    },
  });
};

const useVerifyReferral = () => {
  const { revalidateComicCoinsAfterDelay } = useComicCoinRevalidation();
  
  return useMutation({
    mutationFn: (referralData: TReferralVerify) =>
      referralService.verifyReferral(referralData),
    onSuccess: () => {
      // Revalidate comic coins when referral code is verified (gives coins to both referrer and referee)
      // Add delay to allow backend to process the coin increment
      revalidateComicCoinsAfterDelay(500);
    },
  });
};

export {
  useSendReferral,
  useGetAllReferrals,
  useSendReferralAgain,
  useVerifyReferral,
};
