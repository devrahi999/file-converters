
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FileStack, ChevronDown, Menu, X, FileText, Sparkles, Table, Code, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'PDF Tools', href: '/pdf-tools', icon: FileText },
  { label: 'Documents', href: '/document-tools', icon: Sparkles },
  { label: 'Spreadsheets', href: '/spreadsheet-tools', icon: Table },
  { label: 'Data', href: '/data-tools', icon: Code },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[60] w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 font-black text-2xl tracking-tighter">
            <div className="bg-primary rounded-xl p-1.5 shadow-lg shadow-primary/20">
              <FileStack className="h-6 w-6 text-primary-foreground" />
            </div>
            <span>Convertly</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-primary transition-colors flex items-center gap-1.5">
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild className="hidden sm:inline-flex rounded-full px-6 shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
            <Link href="/pdf-tools">Get Started</Link>
          </Button>
          
          <Button variant="ghost" size="icon" className="md:hidden rounded-full hover:bg-muted" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-background border-b shadow-2xl md:hidden z-50 overflow-hidden"
          >
            <div className="container py-8 flex flex-col gap-6">
              {navItems.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href} 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 hover:bg-primary/5 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-background p-3 rounded-xl shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-lg">{item.label}</span>
                  </div>
                  <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              ))}
              <Button size="lg" className="w-full rounded-2xl h-14 text-lg font-bold mt-4" asChild onClick={() => setIsOpen(false)}>
                <Link href="/pdf-tools">All Tools</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
