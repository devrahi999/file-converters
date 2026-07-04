
import { Metadata } from 'next';
import { ToolInterface } from '@/components/tools/ToolInterface';

export const metadata: Metadata = {
  title: 'TXT to PDF - Convert Text to PDF Online | Convertly',
  description: 'Turn your plain text files into professional PDF documents in seconds.',
};

export default function TxtToPdfPage() {
  return (
    <div className="container py-16">
      <ToolInterface 
        title="Text to PDF Converter"
        description="Convert any plain text file into a clean and readable PDF document."
        fromFormat="txt"
        toFormat="pdf"
        accept={{ 'text/plain': ['.txt'] }}
        apiEndpoint="/api/convert"
        backUrl="/document-tools"
      />
    </div>
  );
}
