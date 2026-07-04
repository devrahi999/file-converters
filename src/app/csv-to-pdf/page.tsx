
import { Metadata } from 'next';
import { ToolInterface } from '@/components/tools/ToolInterface';

export const metadata: Metadata = {
  title: 'CSV to PDF - Convert CSV to PDF Online | Convertly',
  description: 'Convert CSV data into readable PDF tables instantly and securely.',
};

export default function CsvToPdfPage() {
  return (
    <div className="container py-16">
      <ToolInterface 
        title="CSV to PDF Converter"
        description="Transform your raw CSV data into a clean, formatted PDF table."
        fromFormat="csv"
        toFormat="pdf"
        accept={{ 'text/csv': ['.csv'] }}
        apiEndpoint="/api/convert"
        backUrl="/spreadsheet-tools"
      />
    </div>
  );
}
