import { Metadata } from 'next';
import { ToolInterface } from '@/components/tools/ToolInterface';
import { FileText, ShieldCheck, Zap, Lock, Info, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DOCX to PDF - Convert Word to PDF Online | Convertly',
  description: 'Convert Microsoft Word DOCX files to professional PDF documents instantly.',
};

export default function DocxToPdfPage() {
  return (
    <div className="container py-16 flex flex-col gap-24">
      <ToolInterface 
        title="Word to PDF Converter"
        description="Turn your Word documents into portable and secure PDF files."
        fromFormat="docx"
        toFormat="pdf"
        accept={{ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }}
        apiEndpoint="/api/convert"
        backUrl="/document-tools"
      />

      {/* Detailed Instructions Section */}
      <section className="max-w-4xl mx-auto w-full space-y-20 border-t pt-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black mb-6 tracking-tighter">How to convert Word to PDF?</h2>
            <div className="space-y-6">
              {[
                { step: 1, title: 'Upload DOCX', desc: 'Select or drag your Word file into the secure dropzone above.' },
                { step: 2, title: 'Instant Render', desc: 'Our cloud-less engine renders your Word document directly in memory.' },
                { step: 3, title: 'Download PDF', desc: 'Your professional PDF is ready for download in seconds.' },
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
                  <div className="bg-blue-100 p-2 rounded-lg"><FileText className="h-5 w-5 text-blue-500" /></div>
                  <span className="font-bold">Perfect Formatting</span>
                </div>
                <p className="text-sm text-muted-foreground">PDFs are the gold standard for sharing. They look the same on every device, every time.</p>
             </div>
             <div className="flex items-center gap-4 px-4">
               <ShieldCheck className="h-5 w-5 text-emerald-500" />
               <span className="text-sm font-medium">Standard Compliance Ensured</span>
             </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { title: 'Universal Viewing', desc: 'PDFs ensure your document looks exactly as you intended on any screen or printer.', icon: Info },
            { title: 'High Compression', desc: 'We optimize the file size without sacrificing the clarity of your text or images.', icon: Sparkles },
            { title: 'Privacy First', desc: 'We never read, store, or share your Word documents. Processing is 100% ephemeral.', icon: Lock },
          ].map((item, i) => (
            <div key={i} className="p-8 border rounded-[2rem] bg-card hover:shadow-xl transition-all">
              <item.icon className="h-8 w-8 text-primary mb-4" />
              <h4 className="font-bold text-xl mb-2">{item.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
