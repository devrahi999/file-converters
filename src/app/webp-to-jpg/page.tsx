
import { Metadata } from 'next';
import { ToolInterface } from '@/components/tools/ToolInterface';

export const metadata: Metadata = {
  title: 'WebP to JPG - Convert WebP to JPG Online | Convertly',
  description: 'Convert modern WebP images to widely supported JPG format instantly.',
};

export default function WebpToJpgPage() {
  return (
    <div className="container py-16">
      <ToolInterface 
        title="WebP to JPG Converter"
        description="Change modern WebP images into the universal JPG format easily."
        fromFormat="webp"
        toFormat="jpg"
        accept={{ 'image/webp': ['.webp'] }}
        apiEndpoint="/api/convert"
      />
    </div>
  );
}
