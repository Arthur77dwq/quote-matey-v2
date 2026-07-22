import { generateMetadata } from '@/lib/seo';

import { DATA } from './data';
import { Privacy } from './privacy';

export const metadata = generateMetadata(DATA?.metadata);

export default function Page() {
  return (
    DATA?.sections &&
    DATA?.sections.length && <Privacy sections={DATA.sections} />
  );
}
