
export default function AboutPage() {
  return (
    <div className="container py-24 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">About BlueTalk</h1>
      <div className="prose prose-neutral max-w-none">
        <p className="text-xl text-muted-foreground mb-6">
          BlueTalk was built with a single mission: to provide professional-grade file transformation tools that value user privacy above all else.
        </p>
        <h2 className="text-2xl font-bold mt-12 mb-4">Our Core Principles</h2>
        <div className="grid md:grid-cols-2 gap-8 my-8">
          <div className="p-6 border rounded-2xl">
            <h3 className="font-bold mb-2">Zero Data Retention</h3>
            <p className="text-muted-foreground text-sm">We don't store your files. Everything is processed in transient memory and purged immediately.</p>
          </div>
          <div className="p-6 border rounded-2xl">
            <h3 className="font-bold mb-2">No Accounts Required</h3>
            <p className="text-muted-foreground text-sm">We believe tools should be ready when you are. No login or signups ever.</p>
          </div>
        </div>
        <p className="text-muted-foreground">
          Whether you're converting a legal PDF to Word or sensitive data from JSON to CSV, you can trust that BlueTalk handles your documents with the highest level of security.
        </p>
      </div>
    </div>
  );
}
