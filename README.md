
# Convertly - File Conversion SaaS

Professional, private, and fast file conversion tool built with Next.js 15.

## Monetag Setup

This project is integrated with Monetag for monetization.

1.  **Monetag Account**: Log in to your [Monetag Publisher Dashboard](https://publishers.monetag.com/).
2.  **Verification**: The site verification meta tag is included in `src/app/layout.tsx`.
3.  **Ads Configuration**:
    - The main Monetag script is configured via `.env` variables.
    - `NEXT_PUBLIC_MONETAG_ENABLED=true` enables the ads.
    - `NEXT_PUBLIC_MONETAG_ZONE_ID` and `NEXT_PUBLIC_MONETAG_SCRIPT_URL` are set to your provided values.
4.  **Service Worker**: 
    - The `sw.js` file is located in `public/sw.js`. 
    - This is required for specific ad formats like Push Notifications or Interstitials.
    - Ensure the `domain` and `zoneId` inside `public/sw.js` match your Monetag dashboard settings.

## Privacy & Security

- Files are processed in memory and never stored.
- No user accounts or conversion history.
- SSL/TLS encryption for all transfers.
