
import { Metadata } from 'next';
import { ToolInterface } from '@/components/tools/ToolInterface';

export const metadata: Metadata = {
  title: 'PNG to JPG - Convert PNG to JPG Online | Convertly',
  description: 'Convert PNG images to JPG format instantly while reducing file size.',
};

export default function PngToJpgPage() {
  return (
    <div className="container py-16">
      <ToolInterface 
        title="PNG to JPG Converter"
        description="Convert your PNG images to JPG format for better web performance."
        fromFormat="png"
        toFormat="jpg"
        accept={{ 'image/png': ['.png'] }}
        apiEndpoint="/api/convert"
      />
    </div>
  );
}
