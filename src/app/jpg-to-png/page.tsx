
import { ToolInterface } from '@/components/tools/ToolInterface';
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Convert JPG to PNG Online - Free & Private | Convertly',
  description: 'Easily convert JPG images to PNG format for free. High quality, no registration required, and completely private.',
};

export default function JpgToPngPage() {
  return (
    <div className="container py-20 flex flex-col gap-20">
      <ToolInterface
        title="JPG to PNG Converter"
        description="Convert your JPG images to PNG format instantly while preserving quality. Ideal for images requiring transparency or lossless compression."
        fromFormat="jpg"
        toFormat="png"
        accept={{ 'image/jpeg': ['.jpg', '.jpeg'] }}
        apiEndpoint="/api/convert"
      />

      <section className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-8 text-center">How to Convert JPG to PNG</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-primary">1</div>
            <h3 className="font-bold text-xl">Upload JPG</h3>
            <p className="text-muted-foreground text-sm">Select the JPG image you want to convert from your device or drag it into the box.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-primary">2</div>
            <h3 className="font-bold text-xl">Click Convert</h3>
            <p className="text-muted-foreground text-sm">Hit the convert button. Our engine will process your image in memory instantly.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-primary">3</div>
            <h3 className="font-bold text-xl">Download PNG</h3>
            <p className="text-muted-foreground text-sm">Once finished, click download to save your new PNG file. Simple as that.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Will I lose image quality?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No. PNG is a lossless format. Converting from JPG to PNG won't add quality, but it will prevent further degradation during future saves.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Is this tool private?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Absolutely. We don't store your images. They are processed in temporary memory and deleted as soon as you finish.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
