import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProfileService } from "../services/ProfileService";
import { keys } from "../utils";
import {
  IAddress,
  TAddessId,
  TAddress,
  TEditProfile,
  TSubmitQuestions,
} from "../types/ProfileTypes";
import useAppSelector from "@/hooks/useSelector";
import { useComicCoinRevalidation } from "@/hooks/useComicCoinRevalidation";

const profileService = ProfileService.getInstance();

const useGetUserProfileDetails = (params?: any) => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  return useQuery({
    queryKey: [
      ...keys.profile.userProfileDetails(),
      { isAuthenticated, token, ...(params ? params : {}) },
    ],
    queryFn: () => profileService.getUserProfileDetails(),
    enabled: isAuthenticated && token ? true : false,
    staleTime: 60 * 60,
  });
};

const useEditUserProfileDetails = () => {
  const { revalidateComicCoinsAfterDelay } = useComicCoinRevalidation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: TEditProfile) =>
      profileService.editUserProfileDetails(userData),
    onSuccess: (response) => {
      // Revalidate comic coins when profile is completed (profile completion gives coins)
      // Add delay to allow backend to process any potential coin rewards
      revalidateComicCoinsAfterDelay(500);
      // Also revalidate user profile details
      queryClient.invalidateQueries({
        queryKey: [...keys.profile.userProfileDetails()],
      });
    },
  });
};

const useGetUserAddresses = () => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  return useQuery({
    queryKey: [...keys.profile.getUserAddresses(), { isAuthenticated, token }],
    queryFn: () => profileService.getUserAddresses(),
    enabled: isAuthenticated && token ? true : false,
    staleTime: 60 * 60,
  });
};

const useAddNewAddress = () => {
  const { revalidateComicCoinsAfterDelay } = useComicCoinRevalidation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (addressData: TAddress) =>
      profileService.addNewAddress(addressData),
    onSuccess: () => {
      // Revalidate addresses
      queryClient.invalidateQueries({
        queryKey: [...keys.profile.getUserAddresses()],
      });
      // Also revalidate user profile details in case this contributes to profile completion
      queryClient.invalidateQueries({
        queryKey: [...keys.profile.userProfileDetails()],
      });
      // Revalidate comic coins in case profile completion gives coins
      // Add delay to allow backend to process any potential coin rewards
      revalidateComicCoinsAfterDelay(500);
    },
  });
};

const useEditAddress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (addressData: IAddress) =>
      profileService.editAddress(addressData),
    onSuccess: () => {
      // Revalidate addresses
      queryClient.invalidateQueries({
        queryKey: [...keys.profile.getUserAddresses()],
      });
    },
  });
};

const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (addressData: TAddessId) =>
      profileService.deleteAddress(addressData),
    onSuccess: () => {
      // Revalidate addresses
      queryClient.invalidateQueries({
        queryKey: [...keys.profile.getUserAddresses()],
      });
    },
  });
};

const useGetUserQuestions = ({ language_id }: { language_id: string }) => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  return useQuery({
    queryKey: [...keys.profile.getUserQuestions(), { language_id }],
    queryFn: () => profileService.getUserQuestions(language_id),
    enabled: isAuthenticated && token ? true : false,
    staleTime: 60 * 60,
  });
};

const useSubmitUserQuestions = () => {
  const { revalidateComicCoinsAfterDelay } = useComicCoinRevalidation();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (questions: TSubmitQuestions) =>
      profileService.submitUserQuestions(questions),
    onSuccess: () => {
      // Revalidate user questions - use predicate to match all getUserQuestions queries regardless of language_id
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'get-user-questions'
      });
      // Also revalidate user profile details in case this contributes to profile completion
      queryClient.invalidateQueries({
        queryKey: [...keys.profile.userProfileDetails()],
      });
      // Revalidate comic coins in case profile completion gives coins
      // Add delay to allow backend to process any potential coin rewards
      revalidateComicCoinsAfterDelay(500);
    },
  });
};

const useGetAvatarsData = () => {
  return useQuery({
    queryKey: keys.profile.getAvatarsData(),
    queryFn: () => profileService.getAvatarsData(),
    staleTime: 0,
  });
};

const useGetPincodeData = () => {
  return useMutation({
    mutationFn: (pincode: string) => profileService.getPincodeData(pincode),
  });
};

export {
  useGetUserProfileDetails,
  useEditUserProfileDetails,
  useGetUserAddresses,
  useAddNewAddress,
  useEditAddress,
  useDeleteAddress,
  useGetUserQuestions,
  useSubmitUserQuestions,
  useGetAvatarsData,
  useGetPincodeData,
};
