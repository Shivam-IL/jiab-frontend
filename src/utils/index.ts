import { CLIENT_URL } from "@/constants";

export const generateImageurl = (image: string): string => {
  const imageUrl: string = `${CLIENT_URL}/assets/images/${image}`;
  return imageUrl;
};

export const formatNumberToK = (number: number): string => {
  if (number < 1000) {
    return number.toString();
  }
  
  const units = ['', 'K', 'M', 'B'];
  const unitIndex = Math.floor(Math.log10(number) / 3);
  const value = number / Math.pow(1000, unitIndex);
  const formattedValue = value >= 10 ? Math.floor(value) : Math.round(value * 10) / 10;
  
  return `${formattedValue}${units[unitIndex]}`;
};
