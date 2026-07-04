
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FileUpload } from './FileUpload';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Download, RefreshCcw, Loader2, ArrowLeft, Scissors, FileText, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import * as pdfjsLib from 'pdfjs-dist';
import { cn } from '@/lib/utils';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

interface PageThumbnail {
  id: number;
  url: string;
  selected: boolean;
}

export function SplitPdfTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pages, setPages] = useState<PageThumbnail[]>([]);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = async (selectedFile: File) => {
    setFile(selectedFile);
    setPages([]);
    setResultUrl(null);
    setProgress(0);
    renderThumbnails(selectedFile);
  };

  const renderThumbnails = async (pdfFile: File) => {
    setIsRendering(true);
    const newPages: PageThumbnail[] = [];
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const total = pdf.numPages;

      for (let i = 1; i <= total; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.3 });
        const canvas = canvasRef.current;
        if (!canvas) continue;
        
        const context = canvas.getContext('2d');
        if (!context) continue;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
        const url = canvas.toDataURL('image/jpeg', 0.7);
        
        newPages.push({ id: i - 1, url, selected: true }); // Default all selected
        setProgress(Math.round((i / total) * 100));
      }
      setPages(newPages);
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to read PDF pages." });
    } finally {
      setIsRendering(false);
      setProgress(0);
    }
  };

  const togglePage = (index: number) => {
    setPages(prev => prev.map((p, i) => i === index ? { ...p, selected: !p.selected } : p));
  };

  const selectAll = () => setPages(prev => prev.map(p => ({ ...p, selected: true })));
  const selectNone = () => setPages(prev => prev.map(p => ({ ...p, selected: false })));

  const handleExtract = async () => {
    const selectedIndices = pages.filter(p => p.selected).map(p => p.id);
    if (selectedIndices.length === 0) {
      toast({ variant: "destructive", title: "Error", description: "Please select at least one page." });
      return;
    }

    setIsProcessing(true);
    setProgress(10);

    const formData = new FormData();
    if (file) formData.append('file', file);
    formData.append('from', 'pdf');
    formData.append('to', 'split');
    formData.append('pages', JSON.stringify(selectedIndices));

    try {
      const response = await fetch('/api/convert', { method: 'POST', body: formData });
      if (!response.ok) throw new Error('Extraction failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setResultUrl(url);
      setProgress(100);
      toast({ title: "Success!", description: "PDF pages extracted successfully." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to process PDF." });
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPages([]);
    setResultUrl(null);
    setProgress(0);
  };

  const selectedCount = pages.filter(p => p.selected).length;

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/pdf-tools">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to PDF Tools
          </Link>
        </Button>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Split & Extract PDF</h1>
          <p className="text-muted-foreground">Select specific pages to create a new PDF document.</p>
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="bg-card border rounded-3xl p-6 md:p-10 shadow-sm">
        {!file ? (
          <FileUpload 
            onFileSelect={handleFileSelect} 
            accept={{ 'application/pdf': ['.pdf'] }}
            label="Upload PDF to manage pages"
          />
        ) : isRendering ? (
          <div className="py-20 text-center space-y-4">
            <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
            <p className="font-medium">Loading PDF pages... {progress}%</p>
            <Progress value={progress} className="max-w-xs mx-auto" />
          </div>
        ) : !resultUrl ? (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-6">
              <div className="space-y-1">
                <h3 className="font-bold text-lg">Select Pages</h3>
                <p className="text-sm text-muted-foreground">{selectedCount} of {pages.length} pages selected</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={selectAll}>Select All</Button>
                <Button variant="outline" size="sm" onClick={selectNone}>Clear All</Button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {pages.map((page, i) => (
                <div 
                  key={i} 
                  onClick={() => togglePage(i)}
                  className={cn(
                    "relative border rounded-xl p-2 cursor-pointer transition-all hover:ring-2 hover:ring-primary/50 group bg-muted/5",
                    page.selected ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-muted"
                  )}
                >
                  <div className="aspect-[3/4] bg-white rounded-lg overflow-hidden border mb-2 relative">
                    <img src={page.url} alt={`Page ${i+1}`} className="w-full h-full object-contain" />
                    {page.selected && (
                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="h-8 w-8 text-primary fill-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold text-muted-foreground">Page {i + 1}</span>
                    <div className={cn("w-4 h-4 rounded border flex items-center justify-center", page.selected ? "bg-primary border-primary" : "border-muted-foreground")}>
                      {page.selected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center pt-8 border-t gap-4">
              <Button 
                size="lg" 
                className="rounded-full px-12 h-14 text-lg" 
                onClick={handleExtract}
                disabled={selectedCount === 0 || isProcessing}
              >
                {isProcessing ? (
                  <> <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing... </>
                ) : (
                  <> <Scissors className="mr-2 h-5 w-5" /> Extract {selectedCount} Pages </>
                )}
              </Button>
              <Button variant="ghost" onClick={reset}>Cancel and upload new</Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 space-y-6">
            <div className="bg-green-100 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto">
              <Download className="h-10 w-10 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">PDF Ready!</h2>
              <p className="text-muted-foreground">Successfully extracted {selectedCount} pages into a new document.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg" asChild>
                <a href={resultUrl} download={`extracted-pages.pdf`}>Download PDF</a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 h-14" onClick={reset}>
                <RefreshCcw className="mr-2 h-4 w-4" /> Start Over
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
