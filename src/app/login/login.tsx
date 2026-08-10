'use client';
import { AuthFormSection } from '@/components/auth-form';
import { AuthHeroSection } from '@/components/auth-hero';
import { AUTHSCREEN, Section } from '@/types/pages';

export default function LoginPage({ sections }: { sections: Section[] }) {
  const { form, info } = sections[0] as AUTHSCREEN;

  return (
    <section className="relative flex justify-center items-center w-full h-screen">
      <AuthFormSection
        onSuccess={() => {}}
        {...form}
        className="static sm:absolute z-20 w-full sm:w-fit h-full sm:h-fit p-3 sm:p-0 top-70 shadow-none sm:shadow-xl/30 lg:shadow-none rounded-none sm:rounded-t-2xl"
      />
      <AuthHeroSection {...info} className="hidden sm:block w-full" />
    </section>
  );
}
