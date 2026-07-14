import { generateMetadata } from '@/lib/seo';

import About from './about';
import { DATA } from './data';

export const metadata = generateMetadata(DATA.metadata);

export default function AboutPage() {
  return <About />;
}
