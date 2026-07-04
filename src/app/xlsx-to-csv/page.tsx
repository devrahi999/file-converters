
import { Metadata } from 'next';
import { ToolInterface } from '@/components/tools/ToolInterface';

export const metadata: Metadata = {
  title: 'XLSX to CSV - Convert Excel to CSV Online | Convertly',
  description: 'Convert Excel (XLSX) spreadsheets to clean CSV data files for easy analysis.',
};

export default function XlsxToCsvPage() {
  return (
    <div className="container py-16">
      <ToolInterface 
        title="Excel to CSV Converter"
        description="Extract data from your Excel spreadsheets into a flat CSV format."
        fromFormat="xlsx"
        toFormat="csv"
        accept={{ 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] }}
        apiEndpoint="/api/convert"
        backUrl="/spreadsheet-tools"
      />
    </div>
  );
}
