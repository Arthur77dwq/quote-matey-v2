import { generateMetadata } from '@/lib/seo';

import { DATA } from './data';
import Home from './home';

export const metadata = generateMetadata(DATA.metadata);

export default async function Page() {
  return (
    <main className="min-h-screen">
      {DATA?.sections && DATA?.sections.length && (
        <Home sections={DATA.sections} />
      )}
    </main>
  );
}
