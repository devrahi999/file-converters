
import { Metadata } from 'next';
import { ToolInterface } from '@/components/tools/ToolInterface';

export const metadata: Metadata = {
  title: 'Remove PDF Metadata - Clean Sensitive Info | Convertly',
  description: 'Remove author, producer, and other metadata from your PDF files for better privacy.',
};

export default function RemoveMetadataPage() {
  return (
    <div className="container py-16">
      <ToolInterface 
        title="Remove PDF Metadata"
        description="Clean sensitive information from your PDF properties before sharing it."
        fromFormat="pdf"
        toFormat="remove-metadata"
        accept={{ 'application/pdf': ['.pdf'] }}
        apiEndpoint="/api/convert"
        backUrl="/pdf-tools"
      />
    </div>
  );
}
