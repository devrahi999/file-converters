
/**
 * @fileOverview Utility to manage Monetag script loading state.
 */

export function isMonetagReady(): boolean {
  if (typeof window === 'undefined') return false;
  // Monetag usually attaches itself to window if it has a global namespace,
  // or we can check if the script tag exists.
  return !!document.querySelector(`script[src*="tag.min.js"]`);
}
