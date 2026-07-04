
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Table, 
  Code, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  Lock,
  Sparkles,
  MousePointer2,
  FileSearch,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/5 blur-[120px]" />
        </div>

        <div className="container relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center rounded-full border border-primary/20 px-4 py-1.5 text-xs font-bold mb-8 bg-primary/5 backdrop-blur-sm text-primary uppercase tracking-widest"
          >
            <Sparkles className="mr-2 h-3 w-3 fill-primary" />
            <span>BlueTalk Conversation Suite</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tighter max-w-5xl mb-8 leading-[0.9]"
          >
            The Most Private Way to <br className="hidden md:block" />
            <span className="text-primary italic">Transform</span> Your Files.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed"
          >
            BlueTalk processes everything in transient memory. Stop uploading sensitive data to permanent servers. Your privacy is our priority.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            <Button size="lg" className="rounded-full px-10 h-16 text-lg font-bold shadow-2xl shadow-primary/30" asChild>
              <Link href="/pdf-tools">Start Transforming By PDF's<ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 h-16 text-lg font-bold border-2" asChild>
              <Link href="/about">How It Works</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Visual Benefits Section */}
      <section className="container">
        <div className="grid md:grid-cols-3 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner">
              <Lock className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Zero Storage Policy</h3>
            <p className="text-muted-foreground leading-relaxed">Files are processed in RAM and purged instantly after download. BlueTalk never writes your data to disk.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 rounded-3xl bg-blue-500/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-inner">
              <Zap className="h-10 w-10 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Lightning Performance</h3>
            <p className="text-muted-foreground leading-relaxed">Powered by high-performance conversion engines that handle complex documents in milliseconds.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col items-center text-center group">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-inner">
              <ShieldCheck className="h-10 w-10 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">No Accounts Required</h3>
            <p className="text-muted-foreground leading-relaxed">Complete your tasks without registration. We don't track who you are, only what you need to convert.</p>
          </motion.div>
        </div>
      </section>

      {/* Modern trust visual */}
      <section className="bg-muted/30 py-32 border-y">
        <div className="container flex flex-col items-center">
          <h2 className="text-4xl font-black text-center mb-16 tracking-tighter">Trusted File Formats</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 w-full max-w-5xl">
            {[
              { label: 'PDF Documents', icon: FileText, color: 'text-rose-500' },
              { label: 'Word Processing', icon: Sparkles, color: 'text-blue-500' },
              { label: 'Data Structures', icon: Code, color: 'text-amber-500' },
              { label: 'Spreadsheets', icon: Table, color: 'text-emerald-500' },
              { label: 'High-Res Images', icon: MousePointer2, color: 'text-purple-500' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-3 p-6 rounded-[2rem] bg-background border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <item.icon className={`h-8 w-8 ${item.color}`} />
                <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access List */}
      <section className="container max-w-4xl">
        <div className="bg-card border rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <FileSearch className="h-32 w-32" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black mb-4">Ready to start?</h2>
              <p className="text-muted-foreground mb-8">Choose from BlueTalk's most popular professional tools.</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {['PDF to Word', 'Image to PDF', 'Word to PDF', 'JSON to CSV'].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm font-bold bg-muted px-4 py-2 rounded-full">
                    <Check className="h-4 w-4 text-primary" /> {t}
                  </div>
                ))}
              </div>
            </div>
            <Button size="lg" className="rounded-full px-12 h-16 shadow-xl" asChild>
              <Link href="/pdf-tools">Browse All Tools</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
