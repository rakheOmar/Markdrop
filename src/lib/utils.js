import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Copies the given text to the clipboard using the Clipboard API.
 *
 * @param {string} text The text to copy to the clipboard.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the text was successfully copied, `false` otherwise.
 */
export async function copyToClipboard(text) {
  if (!navigator.clipboard) {
    console.error("Clipboard API not available. Cannot copy text.");
    return false;
  }
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy text to clipboard:", err);
    return false;
  }
}