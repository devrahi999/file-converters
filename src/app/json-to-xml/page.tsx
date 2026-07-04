
import { Metadata } from 'next';
import { ToolInterface } from '@/components/tools/ToolInterface';

export const metadata: Metadata = {
  title: 'JSON to XML - Convert JSON to XML Online | Convertly',
  description: 'Convert JSON data into structured XML format instantly and securely.',
};

export default function JsonToXmlPage() {
  return (
    <div className="container py-16">
      <ToolInterface 
        title="JSON to XML Converter"
        description="Transform your JSON data into well-formatted XML structure."
        fromFormat="json"
        toFormat="xml"
        accept={{ 'application/json': ['.json'] }}
        apiEndpoint="/api/convert"
        backUrl="/data-tools"
      />
    </div>
  );
}
