import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a string to Title Case format
 * @param str - The string to convert
 * @returns The string in Title Case (first letter of each word capitalized)
 * @example
 * toTitleCase('HELLO WORLD') // Returns 'Hello World'
 * toTitleCase('rock music') // Returns 'Rock Music'
 */
export function toTitleCase(str: string): string {
  if (!str) return '';

  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Formats a date string to MM/DD/YY format for expiration display
 * @param dateString - The ISO date string to format
 * @returns Formatted date string in MM/DD/YY format, or 'N/A' if invalid
 * @example
 * formatExpirationDate('2026-05-05T00:00:00.000Z') // Returns '05/05/26'
 */
export function formatExpirationDate(dateString: string | null | undefined): string {
  if (!dateString) return 'N/A';

  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) return 'Invalid date';

    // Format as MM/DD/YY (e.g., "05/05/26")
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  } catch {
    return 'Invalid date';
  }
}
