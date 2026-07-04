
import { Metadata } from 'next';
import { ToolInterface } from '@/components/tools/ToolInterface';

export const metadata: Metadata = {
  title: 'Rotate PDF Online - Fix PDF Orientation | Convertly',
  description: 'Rotate PDF pages permanently and save your document. Quick, free, and private.',
};

export default function RotatePdfPage() {
  return (
    <div className="container py-16">
      <ToolInterface 
        title="Rotate PDF"
        description="Fix the orientation of your PDF document. Rotate 90, 180, or 270 degrees easily."
        fromFormat="pdf"
        toFormat="rotate"
        accept={{ 'application/pdf': ['.pdf'] }}
        apiEndpoint="/api/convert"
        backUrl="/pdf-tools"
      />
    </div>
  );
}
