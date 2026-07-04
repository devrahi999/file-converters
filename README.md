
# Convertly - File Conversion SaaS

Professional, private, and fast file conversion tool built with Next.js 15.

## Monetag Setup

This project uses Monetag for monetization. To set up or update ads:

1.  **Monetag Account**: Log in to your [Monetag Publisher Dashboard](https://publishers.monetag.com/).
2.  **Add Website**: Ensure your domain is added and verified in the "Sites" section.
3.  **Verification**: The site verification meta tag is already included in `src/app/layout.tsx`.
4.  **Zones**: Create a "MultiTag" or specific ad zone (e.g., On-Click, Interstitial).
5.  **Configuration**:
    - Open the `.env` file.
    - Set `NEXT_PUBLIC_MONETAG_ENABLED=true`.
    - Update `NEXT_PUBLIC_MONETAG_ZONE_ID` with your actual Zone ID (e.g., `256225`).
    - Update `NEXT_PUBLIC_MONETAG_SCRIPT_URL` if Monetag provides a different URL.
6.  **Service Worker**: If you choose a format requiring `sw.js`, download the official file from Monetag and place it in the `public/` directory as `public/sw.js`.
7.  **Deployment**: Push changes to production. Ads will not load in development mode by default to ensure a clean dev environment.

## Privacy & Security

- Files are processed in memory and never stored.
- No user accounts or conversion history.
- SSL/TLS encryption for all transfers.
