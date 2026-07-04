
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Document Tools - Word, Text & HTML Conversion | BlueTalk',
  description: 'Professional document transformation by BlueTalk. Convert DOCX to PDF, Text to PDF, and extract plain text from Word documents instantly.',
};

export default function DocumentToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
