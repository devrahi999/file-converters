
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import sharp from 'sharp';
import * as xlsx from 'xlsx';
import { Document, Packer, Paragraph, TextRun, AlignmentType } from 'docx';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export interface ConversionJob {
  buffer?: Buffer;
  buffers?: Buffer[];
  from: string;
  to: string;
  filename: string;
  options?: any;
}

export interface ConversionResult {
  buffer: Buffer | Buffer[];
  mimeType: string;
}

/**
 * Basic PDF generator for text-based conversions
 */
async function createEnhancedPdf(text: string, isCode: boolean = false): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(isCode ? StandardFonts.Courier : StandardFonts.Helvetica);
  const fontSize = isCode ? 9 : 11;
  const margin = 50;
  const { width, height } = { width: 595.28, height: 841.89 }; // A4
  const maxWidth = width - (margin * 2);
  const lineHeight = fontSize * 1.4;

  let page = pdfDoc.addPage([width, height]);
  let y = height - margin;

  const lines = text.split('\n');

  for (const line of lines) {
    if (y < margin + lineHeight) {
      page = pdfDoc.addPage([width, height]);
      y = height - margin;
    }

    const words = line.split(' ');
    let currentLine = '';
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (font.widthOfTextAtSize(testLine, fontSize) > maxWidth) {
        page.drawText(currentLine, { x: margin, y, size: fontSize, font });
        y -= lineHeight;
        currentLine = word;
        if (y < margin + lineHeight) {
          page = pdfDoc.addPage([width, height]);
          y = height - margin;
        }
      } else {
        currentLine = testLine;
      }
    }
    page.drawText(currentLine, { x: margin, y, size: fontSize, font });
    y -= lineHeight;
  }

  return Buffer.from(await pdfDoc.save());
}

export async function convertFile(job: ConversionJob): Promise<ConversionResult> {
  const { from, to, buffer, buffers, options, filename } = job;
  const fromExt = from.toLowerCase();
  const toExt = to.toLowerCase();

  try {
    // Multi-file Merge
    if (toExt === 'merge' && buffers) {
      const mergedPdf = await PDFDocument.create();
      for (const b of buffers) {
        const doc = await PDFDocument.load(b);
        const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
        copiedPages.forEach(p => mergedPdf.addPage(p));
      }
      return { buffer: Buffer.from(await mergedPdf.save()), mimeType: 'application/pdf' };
    }

    // Split PDF
    if (toExt === 'split' && buffer) {
      const sourcePdf = await PDFDocument.load(buffer);
      const newPdf = await PDFDocument.create();
      const selectedIndices = options?.pages || [0]; 
      const copiedPages = await newPdf.copyPages(sourcePdf, selectedIndices);
      copiedPages.forEach(p => newPdf.addPage(p));
      return { buffer: Buffer.from(await newPdf.save()), mimeType: 'application/pdf' };
    }

    // Images to PDF
    if (from === 'images' && toExt === 'pdf' && buffers) {
      const pdfDoc = await PDFDocument.create();
      for (const imgBuf of buffers) {
        const metadata = await sharp(imgBuf).metadata();
        const page = pdfDoc.addPage([metadata.width || 595, metadata.height || 841]);
        let img;
        if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
          img = await pdfDoc.embedJpg(imgBuf);
        } else {
          const pngBuf = await sharp(imgBuf).png().toBuffer();
          img = await pdfDoc.embedPng(pngBuf);
        }
        page.drawImage(img, { x: 0, y: 0, width: page.getWidth(), height: page.getHeight() });
      }
      return { buffer: Buffer.from(await pdfDoc.save()), mimeType: 'application/pdf' };
    }

    if (!buffer) throw new Error('No input buffer provided');

    // PDF to Word/Text (Standard Extraction)
    if (fromExt === 'pdf') {
      const parsed = await pdfParse(buffer);
      const text = parsed.text.trim();

      if (!text || text.length < 5) {
        throw new Error('This type of PDF is not supported (e.g., scanned images or handwriting)');
      }

      if (toExt === 'txt') return { buffer: Buffer.from(text), mimeType: 'text/plain' };
      
      if (toExt === 'docx') {
        const doc = new Document({
          sections: [{
            children: text.split('\n').map(line => {
              const trimmed = line.trim();
              if (!trimmed) return new Paragraph({ children: [] });
              return new Paragraph({
                children: [new TextRun({ 
                  text: trimmed, 
                  size: 22, 
                  font: "Calibri"
                })],
                spacing: { before: 120, after: 120 },
                alignment: AlignmentType.LEFT
              });
            })
          }]
        });
        return { buffer: await Packer.toBuffer(doc), mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' };
      }
    }

    // DOCX Conversions
    if (fromExt === 'docx') {
      const result = await mammoth.extractRawText({ buffer });
      if (toExt === 'txt') return { buffer: Buffer.from(result.value), mimeType: 'text/plain' };
      if (toExt === 'pdf') return { buffer: await createEnhancedPdf(result.value), mimeType: 'application/pdf' };
    }

    // Text/HTML to PDF
    if (fromExt === 'txt' && toExt === 'pdf') return { buffer: await createEnhancedPdf(buffer.toString()), mimeType: 'application/pdf' };
    if (fromExt === 'html' && toExt === 'pdf') return { buffer: await createEnhancedPdf(buffer.toString(), true), mimeType: 'application/pdf' };

    // Spreadsheet Conversions
    if (['xlsx', 'csv'].includes(fromExt)) {
      const wb = xlsx.read(buffer, { type: 'buffer' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      if (toExt === 'csv') return { buffer: Buffer.from(xlsx.utils.sheet_to_csv(ws)), mimeType: 'text/csv' };
      if (toExt === 'json') return { buffer: Buffer.from(JSON.stringify(xlsx.utils.sheet_to_json(ws), null, 2)), mimeType: 'application/json' };
      if (toExt === 'xlsx') {
        const newWb = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(newWb, ws, "Sheet1");
        return { buffer: xlsx.write(newWb, { type: 'buffer', bookType: 'xlsx' }), mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' };
      }
      if (toExt === 'pdf') return { buffer: await createEnhancedPdf(xlsx.utils.sheet_to_csv(ws)), mimeType: 'application/pdf' };
    }

    throw new Error(`Unsupported conversion from ${from} to ${to}`);
  } catch (error: any) {
    console.error('Converter Error:', error);
    throw new Error(error.message || 'Conversion failed');
  }
}
