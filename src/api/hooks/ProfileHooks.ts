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

const profileService = ProfileService.getInstance();

const useGetUserProfileDetails = (userId: string) => {
  return useQuery({
    queryKey: keys.profile.userProfileDetails(userId),
    queryFn: () => profileService.getUserProfileDetails(userId),
  });
};

const useEditUserProfileDetails = () => {
  return useMutation({
    mutationFn: (userData: TEditProfile) =>
      profileService.editUserProfileDetails(userData),
  });
};

const useGetUserAddresses = () => {
  return useQuery({
    queryKey: keys.profile.getUserAddresses(),
    queryFn: () => profileService.getUserAddresses(),
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

const useGetUserBalanceAndRank = () => {
  return useQuery({
    queryKey: keys.profile.getUserBalanceAndRank(),
    queryFn: () => profileService.getUserBalanceAndRank(),
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
  useGetUserBalanceAndRank,
  useSubmitUserQuestions,
};
