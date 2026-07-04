
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FileUpload } from './FileUpload';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, RefreshCcw, Loader2, FileImage, ArrowLeft, Layers } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import * as pdfjsLib from 'pdfjs-dist';

// Dynamically set the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

interface PdfPageResult {
  id: number;
  url: string;
  name: string;
}

export function PdfToImageTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<PdfPageResult[]>([]);
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setResults([]);
    setProgress(0);
  };

  const handleConvert = async () => {
    if (!file || !canvasRef.current) return;

    setIsConverting(true);
    setProgress(5);
    setResults([]);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ 
        data: arrayBuffer,
        disableWorker: false,
      });
      
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      const newResults: PdfPageResult[] = [];

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); 
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) continue;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.90);
        });

        if (blob) {
          const url = URL.createObjectURL(blob);
          newResults.push({
            id: i,
            url: url,
            name: `${file.name.replace(/\.[^/.]+$/, "")}-page-${i}.jpg`
          });
        }

        setProgress(Math.round((i / numPages) * 100));
      }

      setResults(newResults);
      toast({ title: "Success!", description: `Converted ${numPages} pages to JPG.` });
    } catch (error: any) {
      console.error('Conversion failed:', error);
      toast({ 
        variant: "destructive", 
        title: "Conversion failed", 
        description: error.message || "Could not render PDF pages." 
      });
    } finally {
      setIsConverting(false);
    }
  };

  const downloadAll = () => {
    results.forEach((res, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = res.url;
        link.download = res.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 300); // Small delay to prevent browser blocking
    });
    toast({ title: "Downloading...", description: "All images are being downloaded." });
  };

  const reset = () => {
    results.forEach(r => URL.revokeObjectURL(r.url));
    setFile(null);
    setResults([]);
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      results.forEach(r => URL.revokeObjectURL(r.url));
    };
  }, [results]);

  return (
    <div className="max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/pdf-tools">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to PDF Tools
          </Link>
        </Button>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">PDF to Image Converter</h1>
          <p className="text-muted-foreground">Convert PDF pages into high-quality JPG images instantly.</p>
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="bg-card border rounded-3xl p-8 shadow-sm">
        {results.length === 0 ? (
          <div className="space-y-8">
            <FileUpload 
              onFileSelect={handleFileSelect} 
              accept={{ 'application/pdf': ['.pdf'] }}
              label="Select PDF to extract images"
            />

            {file && !isConverting && (
              <div className="flex justify-center">
                <Button size="lg" className="rounded-full px-12 h-14 text-lg" onClick={handleConvert}>
                  Convert PDF to JPG
                </Button>
              </div>
            )}

            {isConverting && (
              <div className="max-w-md mx-auto space-y-4 text-center">
                <div className="flex justify-between text-sm mb-2">
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    Rendering {progress}%
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h2 className="text-xl font-bold">Generated Images ({results.length})</h2>
              <div className="flex gap-2">
                <Button variant="default" onClick={downloadAll} className="rounded-full bg-green-600 hover:bg-green-700">
                  <Layers className="mr-2 h-4 w-4" /> Download All
                </Button>
                <Button variant="outline" onClick={reset} className="rounded-full">
                  <RefreshCcw className="mr-2 h-4 w-4" /> Start Over
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {results.map((res) => (
                <div key={res.id} className="border rounded-xl p-3 flex flex-col bg-muted/20 group">
                  <div className="aspect-[3/4] w-full bg-white rounded-lg mb-3 flex items-center justify-center overflow-hidden border shadow-sm">
                    <img src={res.url} alt={`Page ${res.id}`} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="mt-auto flex flex-col items-center">
                    <p className="text-[10px] text-muted-foreground mb-2 truncate w-full text-center">{res.name}</p>
                    <Button variant="outline" size="sm" className="w-full h-8 text-xs rounded-lg" asChild>
                      <a href={res.url} download={res.name}>
                        <Download className="mr-1 h-3 w-3" /> Page {res.id}
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
