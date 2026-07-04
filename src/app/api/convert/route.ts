
import { NextRequest, NextResponse } from 'next/server';
import { convertFile } from '@/lib/converters';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const from = formData.get('from') as string;
    const to = formData.get('to') as string;
    
    const multiFiles = formData.getAll('images') as File[];
    const singleFile = formData.get('file') as File;

    if (!from || !to) {
      return NextResponse.json({ error: 'Missing from/to format parameters' }, { status: 400 });
    }

    if (to === 'merge' || (from === 'images' && to === 'pdf')) {
      const filesToProcess = multiFiles.length > 0 ? multiFiles : (singleFile ? [singleFile] : []);
      if (filesToProcess.length === 0) return NextResponse.json({ error: 'No files provided' }, { status: 400 });

      const buffers = await Promise.all(filesToProcess.map(async f => Buffer.from(await f.arrayBuffer())));
      const result = await convertFile({ buffers, from, to, filename: filesToProcess[0].name });
      const finalBuffer = Array.isArray(result.buffer) ? result.buffer[0] : result.buffer;

      return new NextResponse(finalBuffer, {
        headers: {
          'Content-Type': result.mimeType,
          'Content-Disposition': `attachment; filename="converted.${to === 'merge' ? 'pdf' : to}"`,
        },
      });
    }

    if (!singleFile) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    const buffer = Buffer.from(await singleFile.arrayBuffer());
    
    let options: any = {};
    const pagesStr = formData.get('pages');
    if (pagesStr) {
      options.pages = JSON.parse(pagesStr as string);
    }

    const result = await convertFile({
      buffer,
      from,
      to,
      filename: singleFile.name,
      options
    });

    const finalBuffer = Array.isArray(result.buffer) ? result.buffer[0] : result.buffer;

    return new NextResponse(finalBuffer, {
      headers: {
        'Content-Type': result.mimeType,
        'Content-Disposition': `attachment; filename="converted.${to === 'txt' ? 'txt' : (to === 'docx' ? 'docx' : 'pdf')}"`,
      },
    });
  } catch (error: any) {
    console.error('Conversion API Error:', error);
    return NextResponse.json({ 
      error: error.message || 'Conversion failed'
    }, { status: 500 });
  }
}
