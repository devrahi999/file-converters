import { Metadata } from 'next';
import { ImageToPdfTool } from '@/components/tools/ImageToPdfTool';

export const metadata: Metadata = {
  title: 'Convert Images to PDF - JPG, PNG to PDF Online | Convertly',
  description: 'Convert multiple JPG, PNG, WebP images into a single PDF document. Drag and drop reordering, high quality, and completely private.',
};

export default function ImageToPdfPage() {
  return (
    <div className="container py-16">
      <ImageToPdfTool 
        title="Image to PDF Converter"
        description="Select multiple images and convert them into a professional PDF document. You can reorder pages before generating the file."
      />
    </div>
  );
}
