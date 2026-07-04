'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileSearch, FileText, Globe, ArrowRight, ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const tools = [
  { title: 'DOCX to PDF', href: '/docx-to-pdf', icon: FileSearch, desc: 'Convert Word to professional PDF.' },
  { title: 'DOCX to TXT', href: '/docx-to-txt', icon: FileText, desc: 'Extract plain text from Word files.' },
  { title: 'TXT to PDF', href: '/txt-to-pdf', icon: FileText, desc: 'Turn text files into PDF documents.' },
  { title: 'HTML to PDF', href: '/html-to-pdf', icon: Globe, desc: 'Save web pages as PDF files.' },
];

export default function DocumentToolsPage() {
  return (
    <div className="container py-24 max-w-6xl">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Button variant="ghost" size="sm" asChild className="mb-8 rounded-full">
          <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Home</Link>
        </Button>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
             <div className="bg-blue-100 p-2 rounded-xl"><Sparkles className="h-6 w-6 text-blue-600" /></div>
             <span className="text-xs font-black uppercase tracking-widest text-blue-600">Document Suite</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">Word & Text Tools</h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">Professional-grade utilities for manipulating documents with zero tracking and enterprise security.</p>
        </div>
      </motion.div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {tools.map((tool, idx) => (
          <motion.div 
            key={tool.title} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: idx * 0.1 }}
          >
            <Link href={tool.href}>
              <Card className="h-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group border-muted/50 rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-10">
                  <div className="bg-blue-500/5 w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                    <tool.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-3xl font-black flex items-center justify-between mb-4 tracking-tight">
                    {tool.title}
                    <ArrowRight className="h-6 w-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
                  </CardTitle>
                  <CardDescription className="text-lg leading-relaxed">{tool.desc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-24 p-12 rounded-[3rem] bg-muted/20 border border-dashed flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
           <div className="bg-emerald-100 p-4 rounded-full"><ShieldCheck className="h-8 w-8 text-emerald-600" /></div>
           <div>
             <h4 className="font-bold text-xl mb-1">Privacy Guaranteed</h4>
             <p className="text-muted-foreground">Every document tool uses our unique ephemeral processing engine.</p>
           </div>
        </div>
        <Button size="lg" className="rounded-full px-10 h-14 font-bold" variant="outline" asChild>
          <Link href="/about">Learn Security Architecture</Link>
        </Button>
      </motion.div>
    </div>
  );
}
