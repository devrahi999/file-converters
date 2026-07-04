
import { Metadata } from 'next';
import { ToolInterface } from '@/components/tools/ToolInterface';

export const metadata: Metadata = {
  title: 'HTML to PDF - Convert HTML to PDF Online | Convertly',
  description: 'Save HTML files or web pages as professional PDF documents instantly.',
};

export default function HtmlToPdfPage() {
  return (
    <div className="container py-16">
      <ToolInterface 
        title="HTML to PDF Converter"
        description="Transform your HTML code or files into portable PDF documents."
        fromFormat="html"
        toFormat="pdf"
        accept={{ 'text/html': ['.html', '.htm'] }}
        apiEndpoint="/api/convert"
        backUrl="/document-tools"
      />
    </div>
  );
}
