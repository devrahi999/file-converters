
import { Metadata } from 'next';
import { ToolInterface } from '@/components/tools/ToolInterface';

export const metadata: Metadata = {
  title: 'CSV to XLSX - Convert CSV to Excel Online | Convertly',
  description: 'Turn your CSV data files into formatted Microsoft Excel (XLSX) spreadsheets.',
};

export default function CsvToXlsxPage() {
  return (
    <div className="container py-16">
      <ToolInterface 
        title="CSV to Excel Converter"
        description="Import your CSV data into a professional Excel spreadsheet format."
        fromFormat="csv"
        toFormat="xlsx"
        accept={{ 'text/csv': ['.csv'] }}
        apiEndpoint="/api/convert"
        backUrl="/spreadsheet-tools"
      />
    </div>
  );
}
