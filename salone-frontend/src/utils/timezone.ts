/**
 * Timezone utilities for handling date/time conversions
 */

/**
 * Get the user's current timezone
 */
export function getUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * Convert local datetime string to UTC for backend storage
 * @param localDateTime - Local datetime string (YYYY-MM-DDTHH:mm format)
 * @returns UTC datetime string
 */
export function convertLocalToUTC(localDateTime: string): string {
  if (!localDateTime) return '';
  
  const localDate = new Date(localDateTime);
  const utcDate = new Date(localDate.getTime() - localDate.getTimezoneOffset() * 60000);
  return utcDate.toISOString();
}

/**
 * Convert UTC datetime string to local datetime for form input
 * @param utcDateTime - UTC datetime string
 * @returns Local datetime string (YYYY-MM-DDTHH:mm format)
 */
export function convertUTCToLocal(utcDateTime: string): string {
  if (!utcDateTime) return '';
  
  const utcDate = new Date(utcDateTime);
  const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 16);
}

/**
 * Format datetime for display in the UI
 * @param dateTime - ISO datetime string
 * @returns Formatted date and time string
 */
export function formatDateTimeForDisplay(dateTime: string): string {
  if (!dateTime) return '';
  
  const date = new Date(dateTime);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Format date for display (date only)
 * @param dateTime - ISO datetime string
 * @returns Formatted date string
 */
export function formatDateForDisplay(dateTime: string): string {
  if (!dateTime) return '';
  
  const date = new Date(dateTime);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Format time for display (time only)
 * @param dateTime - ISO datetime string
 * @returns Formatted time string
 */
export function formatTimeForDisplay(dateTime: string): string {
  if (!dateTime) return '';
  
  const date = new Date(dateTime);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Check if a date is today
 * @param dateTime - ISO datetime string
 * @returns boolean
 */
export function isToday(dateTime: string): boolean {
  if (!dateTime) return false;
  
  const date = new Date(dateTime);
  const today = new Date();
  
  return date.toDateString() === today.toDateString();
}

/**
 * Check if a date is in the future
 * @param dateTime - ISO datetime string
 * @returns boolean
 */
export function isFuture(dateTime: string): boolean {
  if (!dateTime) return false;
  
  const date = new Date(dateTime);
  const now = new Date();
  
  return date > now;
} 