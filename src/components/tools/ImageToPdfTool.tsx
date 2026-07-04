
'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Download, RefreshCcw, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface ImageToPdfToolProps {
  title: string;
  description: string;
}

interface QueuedImage {
  id: string;
  file: File;
  preview: string;
}

export function ImageToPdfTool({ title, description }: ImageToPdfToolProps) {
  const [images, setImages] = useState<QueuedImage[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file)
    }));
    setImages(prev => [...prev, ...newImages]);
    setResultUrl(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp'] },
    multiple: true
  });

  const removeImage = (id: string) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      const removed = prev.find(img => img.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return filtered;
    });
  };

  const handleConvert = async () => {
    if (images.length === 0) return;
    setIsConverting(true);
    setProgress(10);

    const formData = new FormData();
    images.forEach(img => formData.append(`images`, img.file));
    formData.append('from', 'images');
    formData.append('to', 'pdf');

    try {
      const response = await fetch('/api/convert', { method: 'POST', body: formData });
      if (!response.ok) throw new Error('Conversion failed');
      const blob = await response.blob();
      setResultUrl(window.URL.createObjectURL(blob));
      setProgress(100);
      toast({ title: "Success!", description: "PDF generated." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to generate PDF." });
    } finally {
      setIsConverting(false);
    }
  };

  const reset = () => {
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
    setResultUrl(null);
    setProgress(0);
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/pdf-tools">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to PDF Tools
          </Link>
        </Button>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="bg-card border rounded-3xl p-8 shadow-sm">
        {!resultUrl ? (
          <div className="space-y-8">
            <div {...getRootProps()} className={cn("border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer", isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50")}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center">
                <Upload className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Drag & Drop Images</h3>
                <Button variant="outline">Select Files</Button>
              </div>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {images.map(img => (
                  <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden border">
                    <img src={img.preview} alt="Preview" className="w-full h-full object-cover" />
                    <button onClick={() => removeImage(img.id)} className="absolute top-1 right-1 p-1 bg-destructive text-white rounded-full"><X className="h-3 w-3" /></button>
                  </div>
                ))}
              </div>
            )}

            {images.length > 0 && !isConverting && (
              <div className="flex justify-center"><Button size="lg" className="rounded-full px-12" onClick={handleConvert}>Generate PDF</Button></div>
            )}
          </div>
        ) : (
          <div className="text-center py-10">
            <Download className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-6">PDF Generated!</h2>
            <div className="flex gap-4 justify-center">
              <Button size="lg" className="rounded-full px-8" asChild><a href={resultUrl} download="converted.pdf">Download PDF</a></Button>
              <Button variant="outline" size="lg" className="rounded-full px-8" onClick={reset}><RefreshCcw className="mr-2 h-4 w-4" /> Reset</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
