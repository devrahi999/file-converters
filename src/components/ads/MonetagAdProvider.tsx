
'use client';

/**
 * @fileOverview Context provider for managing ad-related states if needed.
 * Currently serves as a wrapper for the global script.
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { MonetagScript } from './MonetagScript';

interface MonetagContextType {
  adsEnabled: boolean;
}

const MonetagContext = createContext<MonetagContextType | undefined>(undefined);

export function MonetagAdProvider({ children }: { children: ReactNode }) {
  const adsEnabled = process.env.NEXT_PUBLIC_MONETAG_ENABLED === 'true';

  return (
    <MonetagContext.Provider value={{ adsEnabled }}>
      <MonetagScript />
      {children}
    </MonetagContext.Provider>
  );
}

export function useMonetag() {
  const context = useContext(MonetagContext);
  if (context === undefined) {
    throw new Error('useMonetag must be used within a MonetagAdProvider');
  }
  return context;
}
