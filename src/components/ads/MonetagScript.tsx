
'use client';

/**
 * @fileOverview Monetag Global Tag Integration Component.
 * Responsible for loading the script only in production and on the client side.
 */

import React from 'react';
import Script from 'next/script';
import { monetagConfig } from '@/lib/ads/monetag-config';

export function MonetagScript() {
  // Do not load if disabled or if essential config is missing
  if (!monetagConfig.enabled || !monetagConfig.zoneId || !monetagConfig.scriptUrl) {
    return null;
  }

  // Do not load in development unless explicitly needed (optional check)
  if (monetagConfig.isDev) {
    console.log('Monetag: Ads are disabled in development mode.');
    return null;
  }

  return (
    <Script
      src={monetagConfig.scriptUrl}
      data-zone={monetagConfig.zoneId}
      strategy="afterInteractive"
      async
      // data-cfasync is often required by Monetag to bypass Cloudflare optimization
      data-cfasync="false"
      onError={(e) => {
        console.error('Monetag script failed to load', e);
      }}
    />
  );
}
