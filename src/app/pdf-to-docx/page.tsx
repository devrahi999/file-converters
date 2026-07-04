
import { Metadata } from 'next';
import { ToolInterface } from '@/components/tools/ToolInterface';
import { ShieldCheck, Lock, Zap, CheckCircle2, FileText, Info, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PDF to DOCX - Convert PDF to Editable Word Online | Convertly',
  description: 'Convert PDF files to editable Word (DOCX) documents while preserving layout and text formatting.',
};

export default function PdfToDocxPage() {
  return (
    <div className="container py-16 flex flex-col gap-24">
      <ToolInterface 
        title="PDF to Word Converter"
        description="Convert your PDF document into an editable Word file. Our engine extracts text and preserves layouts."
        fromFormat="pdf"
        toFormat="docx"
        accept={{ 'application/pdf': ['.pdf'] }}
        apiEndpoint="/api/convert"
        backUrl="/pdf-tools"
      />

      {/* Detailed Instructions Section */}
      <section className="max-w-4xl mx-auto w-full space-y-20 border-t pt-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black mb-6 tracking-tighter">How to convert PDF to Word?</h2>
            <div className="space-y-6">
              {[
                { step: 1, title: 'Upload File', desc: 'Select or drag your PDF file into the secure dropzone above.' },
                { step: 2, title: 'Processing', desc: 'Click "Start Conversion". Our engine will analyze the PDF structure instantly.' },
                { step: 3, title: 'Download', desc: 'Once finished, download your new editable DOCX file immediately.' },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 group">
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0 transition-transform group-hover:scale-110">
                    {s.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{s.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-muted/30 p-8 rounded-[2.5rem] border border-dashed flex flex-col gap-6">
             <div className="bg-background p-6 rounded-2xl shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-rose-100 p-2 rounded-lg"><FileText className="h-5 w-5 text-rose-500" /></div>
                  <span className="font-bold">Pro Tip</span>
                </div>
                <p className="text-sm text-muted-foreground">For best results, ensure the PDF contains selectable text. Scanned images are processed as plain documents.</p>
             </div>
             <div className="flex items-center gap-4 px-4">
               <ShieldCheck className="h-5 w-5 text-emerald-500" />
               <span className="text-sm font-medium">100% Secure & Private Extraction</span>
             </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { title: 'Layout Preservation', desc: 'Our engine tries to keep fonts, tables, and spacing identical to the original PDF.', icon: Info },
            { title: 'Editable Text', desc: 'Get a clean DOCX file that you can edit in Microsoft Word, Google Docs, or LibreOffice.', icon: Sparkles },
            { title: 'Instant Purge', desc: 'Your files are processed in RAM and deleted the second your session ends.', icon: Lock },
          ].map((item, i) => (
            <div key={i} className="p-8 border rounded-[2rem] bg-card hover:shadow-xl transition-all">
              <item.icon className="h-8 w-8 text-primary mb-4" />
              <h4 className="font-bold text-xl mb-2">{item.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 rounded-[3rem] p-12 border border-primary/10">
          <h3 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h5 className="font-bold">Will my formatting be lost?</h5>
              <p className="text-sm text-muted-foreground">Most standard layouts are preserved. Complex graphical PDFs might require minor adjustments after conversion.</p>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold">Can I convert scanned PDFs?</h5>
              <p className="text-sm text-muted-foreground">Yes, but the text will be extracted without formatting if the PDF doesn't have an OCR layer.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
