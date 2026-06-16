import SEO_METADATA from '@/constant/seo/metadata';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata(SEO_METADATA['/about']);

export default function AboutPage() {
  return (
    <>
      <h1>About Page</h1>
    </>
  );
}
