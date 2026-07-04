
import { Metadata } from 'next';
import { ToolInterface } from '@/components/tools/ToolInterface';

export const metadata: Metadata = {
  title: 'CSV to JSON - Convert CSV to JSON Online | Convertly',
  description: 'Transform CSV data into structured JSON format for developers and data analysts.',
};

export default function CsvToJsonPage() {
  return (
    <div className="container py-16">
      <ToolInterface 
        title="CSV to JSON Converter"
        description="Convert flat CSV files into structured JSON objects or arrays."
        fromFormat="csv"
        toFormat="json"
        accept={{ 'text/csv': ['.csv'] }}
        apiEndpoint="/api/convert"
        backUrl="/data-tools"
      />
    </div>
  );
}
