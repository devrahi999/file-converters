
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spreadsheet Tools - Excel & CSV Converters | BlueTalk',
  description: 'Fast and reliable tools for Excel and CSV by BlueTalk. Convert XLSX to CSV, CSV to Excel, and transform spreadsheets to PDF.',
};

export default function SpreadsheetToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
