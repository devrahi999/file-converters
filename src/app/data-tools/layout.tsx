
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Tools - JSON, XML, YAML Converters for Developers',
  description: 'Modern tools for developers and data analysts. Convert JSON to CSV, YAML to JSON, and transform data structures with ease.',
};

export default function DataToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
