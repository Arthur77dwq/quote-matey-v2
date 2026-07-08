import { generateMetadata } from '@/lib/seo';

import Contact from './contact';
import { DATA } from './data';

export const metadata = generateMetadata(DATA?.metadata);

export default function FaqPage() {
  return (
    DATA?.sections &&
    DATA?.sections.length && <Contact sections={DATA.sections} />
  );
}
