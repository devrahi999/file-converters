
'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Table, FileSpreadsheet, FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const tools = [
  { title: 'XLSX to CSV', href: '/xlsx-to-csv', icon: Table, desc: 'Convert Excel files to plain CSV data.' },
  { title: 'CSV to XLSX', href: '/csv-to-xlsx', icon: FileSpreadsheet, desc: 'Turn CSV into Excel spreadsheets.' },
  { title: 'XLSX to PDF', href: '/xlsx-to-pdf', icon: FileText, desc: 'Save Excel sheets as readable PDFs.' },
  { title: 'CSV to PDF', href: '/csv-to-pdf', icon: FileText, desc: 'Convert CSV into readable tables.' },
];

export default function SpreadsheetToolsPage() {
  return (
    <div className="container py-12 max-w-6xl">
      <Button variant="ghost" size="sm" asChild className="mb-8">
        <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" /> Home</Link>
      </Button>

      <div className="mb-12">
        <h1 className="text-4xl font-black mb-3">Spreadsheet Tools</h1>
        <p className="text-muted-foreground text-lg">Fast and reliable tools for Excel and CSV.</p>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool, idx) => (
          <motion.div key={tool.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
            <Link href={tool.href}>
              <Card className="h-full hover:shadow-lg transition-all group border-muted/50">
                <CardHeader className="p-6">
                  <div className="bg-emerald-500/5 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <tool.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg font-bold flex items-center justify-between">
                    {tool.title}
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                  </CardTitle>
                  <CardDescription className="text-xs line-clamp-2">{tool.desc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
