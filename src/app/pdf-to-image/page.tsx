
import { Metadata } from 'next';
import { PdfToImageTool } from '@/components/tools/PdfToImageTool';

export const metadata: Metadata = {
  title: 'PDF to Image - Convert PDF Pages to JPG Online | Convertly',
  description: 'Convert PDF pages into high-quality JPG images. Perfect for extracting pages or using PDF content in social media.',
};

export default function PdfToImagePage() {
  return (
    <div className="container py-16">
      <PdfToImageTool />
    </div>
  );
}
