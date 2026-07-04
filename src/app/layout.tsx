
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { MonetagAdProvider } from '@/components/ads/MonetagAdProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Convertly - Fast, Free, Private File Conversion',
  description: 'Convert PDF, Images, Documents, and Data files instantly. No accounts, no history, 100% private.',
  verification: {
    other: {
      monetag: '5e0ea0938919c3c9ffb62d181296a88a',
    },
  },
  openGraph: {
    title: 'Convertly - Free File Conversion',
    description: 'The ultimate tool for converting your files quickly and privately.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <MonetagAdProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </MonetagAdProvider>
      </body>
    </html>
  );
}
