import { useMutation, useQuery } from "@tanstack/react-query";
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

const profileService = ProfileService.getInstance();

const useGetUserProfileDetails = () => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  return useQuery({
    queryKey: [...keys.profile.userProfileDetails(), { isAuthenticated, token }],
    queryFn: () => profileService.getUserProfileDetails(),
    enabled: isAuthenticated && token ? true : false,
    staleTime: 60 * 60,
  });
};

const useEditUserProfileDetails = () => {
  return useMutation({
    mutationFn: (userData: TEditProfile) =>
      profileService.editUserProfileDetails(userData),
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
  return useMutation({
    mutationFn: (addressData: TAddress) =>
      profileService.addNewAddress(addressData),
  });
};

const useEditAddress = () => {
  return useMutation({
    mutationFn: (addressData: IAddress) =>
      profileService.editAddress(addressData),
  });
};

const useDeleteAddress = () => {
  return useMutation({
    mutationFn: (addressData: TAddessId) =>
      profileService.deleteAddress(addressData),
  });
};

const useGetUserQuestions = () => {
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);

  return useQuery({
    queryKey: keys.profile.getUserQuestions(),
    queryFn: () => profileService.getUserQuestions(),
    enabled: isAuthenticated && token ? true : false,
    staleTime: 60 * 60,
  });
};

const useSubmitUserQuestions = () => {
  return useMutation({
    mutationFn: (questions: TSubmitQuestions) =>
      profileService.submitUserQuestions(questions),
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
};
