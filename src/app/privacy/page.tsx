export default function PrivacyPage() {
  return (
    <div className="container py-24 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">1. No Data Collection</h2>
          <p>Convertly does not collect, store, or share any personal information. We do not require account creation and we do not use tracking cookies for identification.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">2. File Processing</h2>
          <p>Files uploaded to Convertly are processed entirely in temporary server memory (RAM). Once the conversion is complete and the download is initiated, or after a short timeout, the memory is cleared. We never write your files to permanent disk storage.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">3. Security</h2>
          <p>All transfers to and from our servers are encrypted using SSL/TLS. Your data is protected during transit.</p>
        </section>
      </div>
    </div>
  );
}
