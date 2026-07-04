
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { MonetagAdProvider } from '@/components/ads/MonetagAdProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'BlueTalk - Fast, Free, Private File Conversion',
    template: '%s | BlueTalk'
  },
  description: 'BlueTalk offers professional file transformation tools. Convert PDF, Images, Documents, and Data files instantly. No accounts, 100% private and secure.',
  icons: {
    icon: '/favicon.ico',
  },
  verification: {
    other: {
      monetag: '17603a6efb72f5cbba839e26f19acd81',
    },
  },
  openGraph: {
    title: 'BlueTalk - Ultimate Private File Converter',
    description: 'Transform your documents and images without uploading them to permanent storage. 100% private, ephemeral processing.',
    type: 'website',
    url: 'https://bluetalk.site', 
    siteName: 'BlueTalk',
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
