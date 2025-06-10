import { CLIENT_URL } from "@/constants";
import CryptoJS from "crypto-js";

export const generateImageurl = (image: string): string => {
  const imageUrl: string = `${CLIENT_URL}/assets/images/${image}`;
  return imageUrl;
};

export const formatNumberToK = (number: number): string => {
  if (number < 1000) {
    return number.toString();
  }

  const units = ["", "K", "M", "B"];
  const unitIndex = Math.floor(Math.log10(number) / 3);
  const value = number / Math.pow(1000, unitIndex);
  const formattedValue =
    value >= 10 ? Math.floor(value) : Math.round(value * 10) / 10;

  return `${formattedValue}${units[unitIndex]}`;
};

export const setLocalStorageItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getLocalStorageItem = (key: string) => {
  return localStorage.getItem(key);
};

export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};

export const encryptData = async (text: string, secretKey: string) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};


export const dateConvert = (date: string) => {
  const dateObj = new Date(date);
  const year = dateObj.getUTCFullYear();
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getUTCDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const monthDayYearConvert = (date: string) => {
  const dateObj = new Date(date);
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getUTCDate().toString().padStart(2, '0');
  const year = dateObj.getUTCFullYear();
  return `${month}/${day}/${year}`;
};