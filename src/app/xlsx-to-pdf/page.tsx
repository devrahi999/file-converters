
import { Metadata } from 'next';
import { ToolInterface } from '@/components/tools/ToolInterface';

export const metadata: Metadata = {
  title: 'XLSX to PDF - Convert Excel to PDF Online | Convertly',
  description: 'Save your Excel spreadsheets as professional PDF documents. Fast and secure.',
};

export default function XlsxToPdfPage() {
  return (
    <div className="container py-16">
      <ToolInterface 
        title="Excel to PDF Converter"
        description="Turn your Excel worksheets into portable PDF tables instantly."
        fromFormat="xlsx"
        toFormat="pdf"
        accept={{ 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] }}
        apiEndpoint="/api/convert"
        backUrl="/spreadsheet-tools"
      />
    </div>
  );
}
