import Image from 'next/image';

import { generateMetadata } from '@/lib/seo';

import { DATA } from './data';

export const metadata = generateMetadata(DATA.metadata);

export default function AboutPage() {
  return (
    <>
      <div>
        <Image
          src="/images/scene.avif"
          className="w-full h-full"
          width={100}
          height={100}
          alt="background image"
        />
      </div>
      <h1>About Page</h1>
    </>
  );
}
