
import { Metadata } from 'next';
import { MergePdfTool } from '@/components/tools/MergePdfTool';

export const metadata: Metadata = {
  title: 'Merge PDF Online - Combine Multiple PDF Files | Convertly',
  description: 'Merge two or more PDF files into a single document instantly. Free, no-login, and completely private.',
};

export default function MergePdfPage() {
  return (
    <div className="container py-16">
      <MergePdfTool />
    </div>
  );
}
