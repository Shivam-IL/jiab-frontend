import { useMutation } from "@tanstack/react-query";
import { LoginService } from "../services/LoginService";
import {
  TRefreshToken,
  TRequestOTP,
  TSignUp,
  TVerifyOTP,
} from "../types/LoginTypes";

const useMutateRequestOTP = () => {
  const loginInstance = LoginService.getInstance();
  return useMutation({
    mutationFn: (data: TRequestOTP) => loginInstance.RequestOTP(data),
  });
};

const useMutateVerifyOTP = () => {
  const loginInstance = LoginService.getInstance();
  return useMutation({
    mutationFn: (data: TVerifyOTP) => loginInstance.VerifyOTP(data),
  });
};

const useMutateSignUp = () => {
  const loginInstance = LoginService.getInstance();
  return useMutation({
    mutationFn: (data: TSignUp) => loginInstance.SignUp(data),
  });
};

const useMutateRefreshToken = () => {
  const loginInstance = LoginService.getInstance();
  return useMutation({
    mutationFn: (data: TRefreshToken) => loginInstance.RefreshToken(data),
  });
};

export {
  useMutateRequestOTP,
  useMutateVerifyOTP,
  useMutateSignUp,
  useMutateRefreshToken,
};
