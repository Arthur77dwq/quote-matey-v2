import { generateMetadata } from '@/lib/seo';

import { DATA } from './data';
import LoginPage from './login';

export const metadata = generateMetadata(DATA.metadata);

export default async function Page() {
  return (
    <>
      {DATA.sections && DATA.sections.length && (
        <LoginPage sections={DATA.sections} />
      )}
    </>
  );
}
