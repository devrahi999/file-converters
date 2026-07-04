
import { Metadata } from 'next';
import { ToolInterface } from '@/components/tools/ToolInterface';

export const metadata: Metadata = {
  title: 'DOCX to TXT - Convert Word to Text Online | Convertly',
  description: 'Convert Microsoft Word documents to plain text files. Fast, free, and secure.',
};

export default function DocxToTxtPage() {
  return (
    <div className="container py-16">
      <ToolInterface 
        title="Word to Text Converter"
        description="Strip formatting and extract raw text from your DOCX documents."
        fromFormat="docx"
        toFormat="txt"
        accept={{ 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] }}
        apiEndpoint="/api/convert"
        backUrl="/document-tools"
      />
    </div>
  );
}
