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

export const getSessionStorageItem = (key: string) => {
  return sessionStorage.getItem(key);
};

export const setSessionStorageItem = (key: string, value: string) => {
  sessionStorage.setItem(key, value);
};

export const removeSessionStorageItem = (key: string) => {
  sessionStorage.removeItem(key);
};

export const clearSessionStorage = () => {
  sessionStorage.clear();
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
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getUTCDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const monthDayYearConvert = (date: string) => {
  const dateObj = new Date(date);
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getUTCDate().toString().padStart(2, "0");
  const year = dateObj.getUTCFullYear();
  return `${month}/${day}/${year}`;
};

export const newMonthDayYearConvert = (date: string) => {
  const dateArr = date.split('/')
  const [year, month, day] = dateArr
  return `${month}/${day}/${year}`;
};

export const newDayMonthYearConvert = (date: string) => {
  const dateArr = date.split('/')
  const [day, month, year] = dateArr
  return `${day}/${month}/${year}`;
}

export const getLabel = (labels: string[]) => {
  let newLabel = ''
  labels?.forEach((label: string, index: number) => {
    if (index === labels?.length - 1) {
      newLabel = newLabel + label
    } else {
      newLabel = newLabel + label + ', '
    }
  })
  return newLabel
}

export const formatTimestampToDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export const formatDateToReadable = (date: string): string => {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}

export const formatDateToMonthYear = (date: string): string => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  return `${day} ${month}, ${year}`;
}

export const converDateDayMonthYear = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${day}-${month}-${year}`;
}

export const converDateToHumanReadable = (date: string) => {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = monthNames[dateObj.getMonth()];
  return `${day} ${month}, ${dateObj.getFullYear()}`;
}

/**
 * Clears localStorage while preserving language data from Redux persist
 * This ensures language selection persists after logout
 */
export const clearLocalStoragePreservingLanguage = () => {
  try {
    // Get the persisted root data which contains language information
    const persistedRootData = localStorage.getItem('persist:root');
    let preservedLanguageData = null;
    
    if (persistedRootData) {
      const parsedData = JSON.parse(persistedRootData);
      // Only preserve the language part and persist metadata
      preservedLanguageData = {
        language: parsedData.language,
        _persist: parsedData._persist
      };
    }
    
    // Clear all localStorage data
    localStorage.clear();
    
    // Restore only the language data
    if (preservedLanguageData) {
      localStorage.setItem('persist:root', JSON.stringify(preservedLanguageData));
    }
  } catch (error) {
    console.error('Error preserving language data during logout:', error);
    // If there's an error, just clear everything to avoid corruption
    localStorage.clear();
  }
};