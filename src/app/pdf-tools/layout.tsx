
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PDF Tools - Merge, Split, Convert & Compress PDF | BlueTalk',
  description: 'A complete suite of PDF tools by BlueTalk. Convert PDF to Word, Images to PDF, Merge PDF files, and Split PDF pages securely and privately.',
};

export default function PdfToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
