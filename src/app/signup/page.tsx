import { generateMetadata } from '@/lib/seo';

import { DATA } from './data';
import SignupPage from './signup';

export const metadata = generateMetadata(DATA.metadata);

export default async function Page() {
  return (
    <>
      {DATA.sections && DATA.sections.length && (
        <SignupPage sections={DATA.sections} />
      )}
    </>
  );
}
