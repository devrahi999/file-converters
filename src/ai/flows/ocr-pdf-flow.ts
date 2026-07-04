'use server';
/**
 * @fileOverview AI-powered OCR flow for extracting text from image-based PDFs and handwriting.
 * Optimized for Bengali and English technical documentation using a specific user-requested model.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const OCRInputSchema = z.object({
  pdfDataUri: z.string().describe("The PDF file or image as a data URI."),
});

export async function performPdfOcr(input: z.infer<typeof OCRInputSchema>) {
  // Extract content type from data URI
  const mimeTypeMatch = input.pdfDataUri.match(/^data:([^;]+);base64,/);
  const contentType = mimeTypeMatch ? mimeTypeMatch[1] : 'application/pdf';

  try {
    const { text } = await ai.generate({
      // Using the exact model name requested by the user
      model: 'googleai/gemini-3.1-flash-lite-image',
      prompt: [
        {
          text: `You are a professional OCR agent specialized in transcribing handwritten engineering notes and technical documents.
      
      Document Context: The provided document is a handwritten note in Bengali and English regarding "Auxiliary Equipment" (সহায়ক যন্ত্রপাতি).
      
      Transcription Rules:
      1. Extract all text exactly as written.
      2. Support mixed-language transcription (Bengali script for Bengali words, Latin script for English words).
      3. Identify and accurately transcribe technical terms:
         - সহায়ক যন্ত্রপাতি (Auxiliary Equipment)
         - ইভাপোরেটর (Evaporator)
         - রেকটিফায়ার (Rectifier)
         - হিটার (Heater)
         - ইজেক্টর (Ejector)
         - অ্যানালাইজার (Analyzer)
      4. Maintain the structure: Title, Definitions, Lists, and Remarks.
      5. Return ONLY the transcribed text without any preamble or conversational filler.`
        },
        {
          media: {
            url: input.pdfDataUri,
            contentType: contentType
          }
        }
      ],
      config: {
        safetySettings: [
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_NONE',
          },
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_NONE',
          },
        ],
      },
    });

    if (!text) throw new Error("AI returned an empty response.");
    return { text: text };
  } catch (error: any) {
    console.error('OCR AI Generation Error:', error);
    return { text: `Conversion failed: ${error.message}` };
  }
}
