
'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, FileImage, Layers, Scissors, FileSearch, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const tools = [
  { title: 'PDF to Word', href: '/pdf-to-docx', icon: FileSearch, desc: 'Convert PDF to editable DOCX documents with layout preservation.', color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'PDF to Text', href: '/pdf-to-txt', icon: FileText, desc: 'Extract all text content from your PDF files into a clean plain text format.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: 'Image to PDF', href: '/image-to-pdf', icon: FileImage, desc: 'Combine multiple JPG, PNG, WebP or TIFF images into one PDF document.', color: 'text-rose-600', bg: 'bg-rose-50' },
  { title: 'PDF to Image', href: '/pdf-to-image', icon: FileImage, desc: 'Render PDF pages as high-quality JPG images for easy sharing.', color: 'text-amber-600', bg: 'bg-amber-50' },
  { title: 'Merge PDF', href: '/merge-pdf', icon: Layers, desc: 'Combine multiple PDF documents into one professional file.', color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { title: 'Split PDF', href: '/split-pdf', icon: Scissors, desc: 'Extract specific pages or separate documents with ease.', color: 'text-purple-600', bg: 'bg-purple-50' },
];

export default function PdfToolsPage() {
  return (
    <div className="container py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mb-20"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
          <ShieldCheck className="h-3 w-3" /> Secure Suite
        </div>
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight">PDF & Image Solutions</h1>
        <p className="text-2xl text-muted-foreground leading-relaxed">
          The industry's most private and powerful PDF toolset. 
          All operations are performed in memory—no tracking, no storage, no risks.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tools.map((tool, idx) => (
          <motion.div 
            key={tool.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link href={tool.href}>
              <Card className="h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group border shadow-md relative overflow-hidden bg-card/50 backdrop-blur-sm">
                <CardHeader className="p-8">
                  <div className={`${tool.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform`}>
                    <tool.icon className={`h-7 w-7 ${tool.color}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-3 flex items-center justify-between">
                    {tool.title}
                    <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">{tool.desc}</CardDescription>
                </CardHeader>
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-24 p-12 rounded-[2.5rem] bg-muted/30 border border-dashed flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="max-w-xl">
          <h3 className="text-2xl font-bold mb-2">Need a custom conversion?</h3>
          <p className="text-muted-foreground">We are constantly adding new tools based on user feedback. Let us know what you'd like to see next.</p>
        </div>
        <Button variant="outline" size="lg" className="rounded-full px-8 h-12" asChild>
          <Link href="/contact">Suggest a Tool</Link>
        </Button>
      </motion.div>
    </div>
  );
}
