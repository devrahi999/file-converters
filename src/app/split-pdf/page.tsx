
import { Metadata } from 'next';
import { SplitPdfTool } from '@/components/tools/SplitPdfTool';

export const metadata: Metadata = {
  title: 'Split PDF Online - Extract Pages from PDF | Convertly',
  description: 'Separate PDF pages into individual files easily. High quality, free, and secure.',
};

export default function SplitPdfPage() {
  return (
    <div className="container py-16">
      <SplitPdfTool />
    </div>
  );
}
