
import { Metadata } from 'next';
import { ToolInterface } from '@/components/tools/ToolInterface';

export const metadata: Metadata = {
  title: 'Compress PDF Online - Reduce PDF File Size | Convertly',
  description: 'Shrink your PDF file size without losing quality. Optimize documents for email and web.',
};

export default function CompressPdfPage() {
  return (
    <div className="container py-16">
      <ToolInterface 
        title="Compress PDF"
        description="Reduce the file size of your PDF while maintaining text and image clarity."
        fromFormat="pdf"
        toFormat="compress"
        accept={{ 'application/pdf': ['.pdf'] }}
        apiEndpoint="/api/convert"
        backUrl="/pdf-tools"
      />
    </div>
  );
}
