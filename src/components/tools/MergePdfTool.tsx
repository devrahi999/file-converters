
'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Download, RefreshCcw, Loader2, FileText, ArrowLeft, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface QueuedFile {
  id: string;
  file: File;
}

export function MergePdfTool() {
  const [files, setFiles] = useState<QueuedFile[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file
    }));
    setFiles(prev => [...prev, ...newFiles]);
    setResultUrl(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: true
  });

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      toast({ variant: "destructive", title: "Error", description: "Select at least two PDF files to merge." });
      return;
    }
    
    setIsMerging(true);
    setProgress(20);

    const formData = new FormData();
    files.forEach(f => formData.append('images', f.file)); // Reusing 'images' key for multiple files in route.ts
    formData.append('from', 'pdf');
    formData.append('to', 'merge');

    try {
      const response = await fetch('/api/convert', { method: 'POST', body: formData });
      if (!response.ok) throw new Error('Merge failed');
      const blob = await response.blob();
      setResultUrl(window.URL.createObjectURL(blob));
      setProgress(100);
      toast({ title: "Success!", description: "PDFs merged successfully." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to merge PDFs." });
    } finally {
      setIsMerging(false);
    }
  };

  const reset = () => {
    setFiles([]);
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
          <h1 className="text-4xl font-bold mb-4">Merge PDF Online</h1>
          <p className="text-muted-foreground">Combine multiple PDF documents into one professional file.</p>
        </div>
      </div>

      <div className="bg-card border rounded-3xl p-8 shadow-sm">
        {!resultUrl ? (
          <div className="space-y-8">
            <div {...getRootProps()} className={cn("border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all", isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50")}>
              <input {...getInputProps()} />
              <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Drag & Drop PDF Files</h3>
                <p className="text-sm text-muted-foreground mb-4">Select multiple PDFs to merge them</p>
                <Button variant="outline">Select Files</Button>
              </div>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Selected Files ({files.length})</h3>
                <div className="grid gap-2">
                  {files.map((f, i) => (
                    <div key={f.id} className="flex items-center justify-between p-3 border rounded-xl bg-muted/20">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className="bg-primary/10 text-primary w-6 h-6 rounded flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-sm truncate font-medium">{f.file.name}</span>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFile(f.id)} className="h-8 w-8 text-destructive hover:bg-destructive/10">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {files.length >= 2 && !isMerging && (
              <div className="flex justify-center">
                <Button size="lg" className="rounded-full px-12 h-14 text-lg" onClick={handleMerge}>
                  <Layers className="mr-2 h-5 w-5" /> Merge PDFs
                </Button>
              </div>
            )}

            {isMerging && (
              <div className="max-w-md mx-auto space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Merging...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="bg-green-100 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Download className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-6">Your PDF is ready!</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg" asChild>
                <a href={resultUrl} download="merged-document.pdf">Download Merged PDF</a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 h-14" onClick={reset}>
                <RefreshCcw className="mr-2 h-4 w-4" /> Merge More
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
