
import { Metadata } from 'next';
import { ToolInterface } from '@/components/tools/ToolInterface';

export const metadata: Metadata = {
  title: 'PDF to TXT - Extract Text from PDF Online | Convertly',
  description: 'Convert PDF files to plain text instantly. Extract text from documents for analysis or repurposing.',
};

export default function PdfToTxtPage() {
  return (
    <div className="container py-16">
      <ToolInterface 
        title="PDF to Text Converter"
        description="Extract all text content from your PDF files into a clean plain text format."
        fromFormat="pdf"
        toFormat="txt"
        accept={{ 'application/pdf': ['.pdf'] }}
        apiEndpoint="/api/convert"
        backUrl="/pdf-tools"
      />
    </div>
  );
}
