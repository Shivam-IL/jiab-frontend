/**
 * EPOP TIME Utilities
 * EPOP TIME = Event POPulation TIME
 * Converts current time and date into Unix timestamp format for CDP events
 */

/**
 * Get current EPOP TIME as Unix timestamp (seconds since epoch)
 * @returns Unix timestamp as string
 */
export const getCurrentEpopTime = (): string => {
  return Math.floor(Date.now() / 1000).toString();
};

/**
 * Get current EPOP TIME as Unix timestamp (milliseconds since epoch)
 * @returns Unix timestamp in milliseconds as string
 */
export const getCurrentEpopTimeMs = (): string => {
  return Date.now().toString();
};

/**
 * Convert a Date object to EPOP TIME
 * @param date - Date object to convert
 * @returns Unix timestamp as string
 */
export const dateToEpopTime = (date: Date): string => {
  return Math.floor(date.getTime() / 1000).toString();
};

/**
 * Convert a date string to EPOP TIME
 * @param dateString - Date string (ISO format or any valid date string)
 * @returns Unix timestamp as string
 */
export const dateStringToEpopTime = (dateString: string): string => {
  const date = new Date(dateString);
  return Math.floor(date.getTime() / 1000).toString();
};

/**
 * Convert EPOP TIME back to Date object
 * @param epopTime - Unix timestamp as string
 * @returns Date object
 */
export const epopTimeToDate = (epopTime: string): Date => {
  return new Date(parseInt(epopTime) * 1000);
};

/**
 * Convert EPOP TIME to readable date string
 * @param epopTime - Unix timestamp as string
 * @param format - Date format (default: ISO string)
 * @returns Formatted date string
 */
export const epopTimeToReadable = (epopTime: string, format: 'iso' | 'local' | 'utc' = 'iso'): string => {
  const date = epopTimeToDate(epopTime);
  
  switch (format) {
    case 'iso':
      return date.toISOString();
    case 'local':
      return date.toLocaleString();
    case 'utc':
      return date.toUTCString();
    default:
      return date.toISOString();
  }
};

/**
 * Get EPOP TIME for a specific date and time
 * @param year - Year
 * @param month - Month (1-12)
 * @param day - Day (1-31)
 * @param hour - Hour (0-23)
 * @param minute - Minute (0-59)
 * @param second - Second (0-59)
 * @returns Unix timestamp as string
 */
export const getEpopTimeForDateTime = (
  year: number,
  month: number,
  day: number,
  hour: number = 0,
  minute: number = 0,
  second: number = 0
): string => {
  const date = new Date(year, month - 1, day, hour, minute, second);
  return Math.floor(date.getTime() / 1000).toString();
};

/**
 * Get EPOP TIME for today at a specific time
 * @param hour - Hour (0-23)
 * @param minute - Minute (0-59)
 * @param second - Second (0-59)
 * @returns Unix timestamp as string
 */
export const getEpopTimeForToday = (
  hour: number = 0,
  minute: number = 0,
  second: number = 0
): string => {
  const today = new Date();
  today.setHours(hour, minute, second, 0);
  return Math.floor(today.getTime() / 1000).toString();
};

/**
 * Get EPOP TIME for a specific time ago
 * @param minutes - Minutes ago
 * @returns Unix timestamp as string
 */
export const getEpopTimeMinutesAgo = (minutes: number): string => {
  const date = new Date(Date.now() - minutes * 60 * 1000);
  return Math.floor(date.getTime() / 1000).toString();
};

/**
 * Get EPOP TIME for a specific time ago
 * @param hours - Hours ago
 * @returns Unix timestamp as string
 */
export const getEpopTimeHoursAgo = (hours: number): string => {
  const date = new Date(Date.now() - hours * 60 * 60 * 1000);
  return Math.floor(date.getTime() / 1000).toString();
};

/**
 * Get EPOP TIME for a specific time ago
 * @param days - Days ago
 * @returns Unix timestamp as string
 */
export const getEpopTimeDaysAgo = (days: number): string => {
  const date = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return Math.floor(date.getTime() / 1000).toString();
};

/**
 * Check if EPOP TIME is valid
 * @param epopTime - Unix timestamp as string
 * @returns boolean
 */
export const isValidEpopTime = (epopTime: string): boolean => {
  const timestamp = parseInt(epopTime);
  return !isNaN(timestamp) && timestamp > 0 && timestamp < Number.MAX_SAFE_INTEGER;
};

/**
 * Get time difference between two EPOP TIMEs
 * @param epopTime1 - First Unix timestamp as string
 * @param epopTime2 - Second Unix timestamp as string
 * @returns Time difference in seconds
 */
export const getEpopTimeDifference = (epopTime1: string, epopTime2: string): number => {
  const time1 = parseInt(epopTime1);
  const time2 = parseInt(epopTime2);
  return Math.abs(time1 - time2);
};

/**
 * Format EPOP TIME difference in human readable format
 * @param epopTime1 - First Unix timestamp as string
 * @param epopTime2 - Second Unix timestamp as string
 * @returns Human readable time difference
 */
export const formatEpopTimeDifference = (epopTime1: string, epopTime2: string): string => {
  const diffSeconds = getEpopTimeDifference(epopTime1, epopTime2);
  
  if (diffSeconds < 60) {
    return `${diffSeconds} seconds`;
  } else if (diffSeconds < 3600) {
    const minutes = Math.floor(diffSeconds / 60);
    return `${minutes} minutes`;
  } else if (diffSeconds < 86400) {
    const hours = Math.floor(diffSeconds / 3600);
    return `${hours} hours`;
  } else {
    const days = Math.floor(diffSeconds / 86400);
    return `${days} days`;
  }
};

/**
 * Get current EPOP TIME with timezone offset
 * @param timezoneOffset - Timezone offset in minutes (optional)
 * @returns Unix timestamp as string
 */
export const getCurrentEpopTimeWithTimezone = (timezoneOffset?: number): string => {
  const now = new Date();
  if (timezoneOffset !== undefined) {
    now.setMinutes(now.getMinutes() + timezoneOffset);
  }
  return Math.floor(now.getTime() / 1000).toString();
};

/**
 * Get EPOP TIME for start of day (00:00:00)
 * @param date - Date object (default: today)
 * @returns Unix timestamp as string
 */
export const getEpopTimeStartOfDay = (date: Date = new Date()): string => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  return Math.floor(startOfDay.getTime() / 1000).toString();
};

/**
 * Get EPOP TIME for end of day (23:59:59)
 * @param date - Date object (default: today)
 * @returns Unix timestamp as string
 */
export const getEpopTimeEndOfDay = (date: Date = new Date()): string => {
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return Math.floor(endOfDay.getTime() / 1000).toString();
};

/**
 * Get EPOP TIME for start of week (Monday 00:00:00)
 * @param date - Date object (default: today)
 * @returns Unix timestamp as string
 */
export const getEpopTimeStartOfWeek = (date: Date = new Date()): string => {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0, 0, 0, 0);
  return Math.floor(startOfWeek.getTime() / 1000).toString();
};

/**
 * Get EPOP TIME for start of month (1st day 00:00:00)
 * @param date - Date object (default: today)
 * @returns Unix timestamp as string
 */
export const getEpopTimeStartOfMonth = (date: Date = new Date()): string => {
  const startOfMonth = new Date(date);
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  return Math.floor(startOfMonth.getTime() / 1000).toString();
};

/**
 * Get EPOP TIME for start of year (January 1st 00:00:00)
 * @param date - Date object (default: today)
 * @returns Unix timestamp as string
 */
export const getEpopTimeStartOfYear = (date: Date = new Date()): string => {
  const startOfYear = new Date(date);
  startOfYear.setMonth(0, 1);
  startOfYear.setHours(0, 0, 0, 0);
  return Math.floor(startOfYear.getTime() / 1000).toString();
};

// Example usage and common patterns
export const EPOP_TIME_EXAMPLES = {
  // Current time
  NOW: getCurrentEpopTime(),
  
  // Today at specific times
  TODAY_START: getEpopTimeStartOfDay(),
  TODAY_END: getEpopTimeEndOfDay(),
  TODAY_NOON: getEpopTimeForToday(12, 0, 0),
  TODAY_MIDNIGHT: getEpopTimeForToday(0, 0, 0),
  
  // Recent times
  FIVE_MINUTES_AGO: getEpopTimeMinutesAgo(5),
  ONE_HOUR_AGO: getEpopTimeHoursAgo(1),
  ONE_DAY_AGO: getEpopTimeDaysAgo(1),
  
  // Period starts
  WEEK_START: getEpopTimeStartOfWeek(),
  MONTH_START: getEpopTimeStartOfMonth(),
  YEAR_START: getEpopTimeStartOfYear()
}; 