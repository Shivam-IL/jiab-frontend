import { useMutation } from "@tanstack/react-query";
import { LoginService } from "../services/LoginService";
import {
  TRefreshToken,
  TRequestOTP,
  TSignUp,
  TVerifyOTP,
} from "../types/LoginTypes";
import { encryptData } from "@/utils";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";

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

const useMutateGludeinLogin = () => {
  const loginInstance = LoginService.getInstance();

  const [uniqueId, setUniqueId] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");

  const setData = async () => {
    const data = await encryptData(
      window.location.origin,
      process.env.NEXT_PUBLIC_SECRET_KEY || ""
    );
    setAccessToken(data);
    setUniqueId(uuid());
  };

  useEffect(() => {
    setData();
  }, []);

  return useMutation({
    mutationFn: () => loginInstance.GludeinLogin({ uniqueId, accessToken }),
    retry: 3,
  });
};

export {
  useMutateRequestOTP,
  useMutateVerifyOTP,
  useMutateSignUp,
  useMutateRefreshToken,
  useMutateGludeinLogin,
};
