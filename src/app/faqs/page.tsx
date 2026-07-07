import { generateMetadata } from '@/lib/seo';

import { DATA } from './data';
import Faqs from './faqs';

export const metadata = generateMetadata(DATA?.metadata);

export default function FaqPage() {
  return (
    DATA?.sections && DATA?.sections.length && <Faqs sections={DATA.sections} />
  );
}
