
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/10 py-10">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <Link href="/" className="flex items-center gap-3 font-bold text-lg">
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="BlueTalk" fill className="object-contain" />
            </div>
            <span>BlueTalk Conversation</span>
          </Link>
          
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          </nav>
        </div>

        <div className="pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} BlueTalk</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3 text-emerald-500" /> Secure</span>
            <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-amber-500" /> Fast</span>
          </div>
          <div>No files stored. 100% Private Processing.</div>
        </div>
      </div>
    </footer>
  );
}
