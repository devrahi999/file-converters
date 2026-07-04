
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUpload } from './FileUpload';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, RefreshCcw, ArrowRight, Loader2, ArrowLeft, CheckCircle2, ShieldCheck, Lock, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ToolInterfaceProps {
  title: string;
  description: string;
  fromFormat: string;
  toFormat: string;
  accept: Record<string, string[]>;
  apiEndpoint: string;
  backUrl?: string;
}

export function ToolInterface({
  title,
  description,
  fromFormat,
  toFormat,
  accept,
  apiEndpoint,
  backUrl
}: ToolInterfaceProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultName, setResultName] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setResultUrl(null);
    setResultName(null);
    setProgress(0);
  };

  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);
    setProgress(10);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('from', fromFormat);
    formData.append('to', toFormat);
    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => (prev >= 90 ? 90 : prev + 5));
      }, 400);
      const response = await fetch(apiEndpoint, { method: 'POST', body: formData });
      clearInterval(progressInterval);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error`);
      }
      const blob = await response.blob();
      setProgress(100);
      const url = window.URL.createObjectURL(blob);
      const outputName = `${file.name.split('.')[0]}.${toFormat.toLowerCase()}`;
      setResultUrl(url);
      setResultName(outputName);
      toast({ title: "Success", description: "Conversion successful" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setIsConverting(false);
    }
  };

  const handleReset = () => {
    if (resultUrl) window.URL.revokeObjectURL(resultUrl);
    setFile(null);
    setResultUrl(null);
    setResultName(null);
    setProgress(0);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        {backUrl && (
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href={backUrl}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Link>
          </Button>
        )}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black mb-3">{title}</h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">{description}</p>
          
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="px-3 py-1 bg-muted rounded-lg text-xs font-bold uppercase border shadow-sm">{fromFormat}</span>
            <ArrowRight className="h-3 w-3 text-muted-foreground" />
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-xs font-bold uppercase border border-primary/20 shadow-sm">{toFormat}</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="bg-card border rounded-[2rem] p-6 md:p-10 shadow-xl overflow-hidden relative"
      >
        <AnimatePresence mode="wait">
          {!resultUrl ? (
            <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
              <FileUpload onFileSelect={handleFileSelect} accept={accept} label={`Drop your ${fromFormat.toUpperCase()} file`} />
              
              {file && !isConverting && (
                <div className="flex flex-col items-center gap-4">
                  <Button size="lg" className="px-12 rounded-xl shadow-lg w-full md:w-auto" onClick={handleConvert}>
                    Start Conversion
                  </Button>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <ShieldCheck className="h-3 w-3" /> Secure & Private
                  </div>
                </div>
              )}

              {isConverting && (
                <div className="space-y-4 max-w-sm mx-auto text-center py-6">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Converting...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-6 text-center">
              <div className="bg-emerald-100 p-4 rounded-full mb-6">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Ready to Download</h3>
              <p className="text-sm text-muted-foreground mb-8 truncate max-w-xs">{resultName}</p>
              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                <Button size="lg" className="rounded-xl px-8 bg-emerald-600 hover:bg-emerald-700" asChild>
                  <a href={resultUrl} download={resultName}><Download className="mr-2 h-4 w-4" /> Download</a>
                </Button>
                <Button variant="outline" size="lg" className="rounded-xl px-8" onClick={handleReset}>
                  <RefreshCcw className="mr-2 h-4 w-4" /> Again
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {[
          { icon: Lock, title: 'Secure', color: 'text-primary' },
          { icon: ShieldCheck, title: 'Private', color: 'text-emerald-500' },
          { icon: Zap, title: 'Fast', color: 'text-amber-500' },
        ].map((badge, i) => (
          <div key={i} className="flex flex-col items-center text-center p-3 border rounded-2xl bg-muted/20">
            <badge.icon className={`h-5 w-5 ${badge.color} mb-1`} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{badge.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
