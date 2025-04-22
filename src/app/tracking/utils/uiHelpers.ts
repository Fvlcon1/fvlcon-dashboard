import { message } from "antd";

/**
 * Show a warning toast and log to console.
 * @param msg Message to display
 */
export function showWarning(msg: string) {
  console.warn(msg);
  message.warning(msg);
}

/**
 * Show an error toast and log to console.
 * @param msg Message to display
 */
export function showError(msg: string) {
  console.error(msg);
  message.error(msg);
}

/**
 * Validate and process a date range.
 * @returns { error?: string, startDate?: Date, endDate?: Date }
 */
export function validateDateRange(start: string | undefined, end?: string | undefined) {
  if (!start) return { error: "Please input start date" };
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : new Date();
  if (isNaN(startDate.getTime())) return { error: "Invalid start date" };
  if (end && isNaN(endDate.getTime())) return { error: "Invalid end date" };
  if (endDate < startDate) return { error: "End date must be after start date" };
  return { startDate, endDate };
}
