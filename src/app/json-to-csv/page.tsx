import { ToolInterface } from '@/components/tools/ToolInterface';
import { Metadata } from 'next';
import { Code, Table, ShieldCheck, Zap, Lock, Info } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Convert JSON to CSV Online - Free Data Tool | Convertly',
  description: 'Transform your JSON data into a clean CSV file instantly. No login, free, and secure.',
};

export default function JsonToCsvPage() {
  return (
    <div className="container py-20 flex flex-col gap-24">
      <ToolInterface
        title="JSON to CSV Converter"
        description="Convert structured JSON data into a flat CSV file for spreadsheets or databases. Supports nested objects and arrays."
        fromFormat="json"
        toFormat="csv"
        accept={{ 'application/json': ['.json'] }}
        apiEndpoint="/api/convert"
      />
      
      {/* Detailed Instructions Section */}
      <section className="max-w-4xl mx-auto w-full space-y-20 border-t pt-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black mb-6 tracking-tighter">JSON to CSV Workflow</h2>
            <div className="space-y-6">
              {[
                { step: 1, title: 'Upload JSON', desc: 'Drag your structured data file into the dropzone. We support arrays and nested objects.' },
                { step: 2, title: 'Flattening', desc: 'Our engine automatically flattens complex JSON structures into table rows.' },
                { step: 3, title: 'Download CSV', desc: 'Download your formatted CSV, ready for Excel, Sheets, or database imports.' },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 group">
                  <div className="bg-amber-500 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0 transition-transform group-hover:scale-110">
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
                  <div className="bg-amber-100 p-2 rounded-lg"><Code className="h-5 w-5 text-amber-500" /></div>
                  <span className="font-bold">Developer Tool</span>
                </div>
                <p className="text-sm text-muted-foreground">Perfect for turning API responses into readable spreadsheets for non-technical teams.</p>
             </div>
             <div className="flex items-center gap-4 px-4">
               <Table className="h-5 w-5 text-emerald-500" />
               <span className="text-sm font-medium">Auto-Flattening Engine Enabled</span>
             </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          {[
            { title: 'Nested Support', desc: 'Automatically handles nested objects by using dot notation for headers.', icon: Info },
            { title: 'Instant Speed', desc: 'Processes thousands of rows in milliseconds using optimized JS parsing.', icon: Zap },
            { title: 'Secure Data', desc: 'Your data is parsed locally in memory. Nothing is ever sent to a database.', icon: Lock },
          ].map((item, i) => (
            <div key={i} className="p-8 border rounded-[2rem] bg-card hover:shadow-xl transition-all">
              <item.icon className="h-8 w-8 text-amber-500 mb-4" />
              <h4 className="font-bold text-xl mb-2">{item.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
