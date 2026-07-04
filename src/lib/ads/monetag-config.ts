
/**
 * @fileOverview Monetag global configuration.
 */

export const monetagConfig = {
  enabled: process.env.NEXT_PUBLIC_MONETAG_ENABLED === 'true',
  zoneId: process.env.NEXT_PUBLIC_MONETAG_ZONE_ID || '',
  scriptUrl: process.env.NEXT_PUBLIC_MONETAG_SCRIPT_URL || '',
  isDev: process.env.NODE_ENV === 'development',
};
