
import { Metadata } from 'next';
import { ToolInterface } from '@/components/tools/ToolInterface';

export const metadata: Metadata = {
  title: 'YAML to JSON - Convert YAML to JSON Online | Convertly',
  description: 'Convert YAML configuration files into JSON format for easy integration.',
};

export default function YamlToJsonPage() {
  return (
    <div className="container py-16">
      <ToolInterface 
        title="YAML to JSON Converter"
        description="Transform YAML structures into standard JSON format instantly."
        fromFormat="yaml"
        toFormat="json"
        accept={{ 'text/yaml': ['.yaml', '.yml'], 'application/x-yaml': ['.yaml', '.yml'] }}
        apiEndpoint="/api/convert"
        backUrl="/data-tools"
      />
    </div>
  );
}
