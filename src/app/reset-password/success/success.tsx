'use client';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { AuthHeroSection } from '@/components/auth-hero';
import { Description, Title } from '@/components/section-header';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { AUTHSCREEN, Section } from '@/types/pages';

export default function SuccessResetPassword({
  sections,
}: {
  sections: Section[];
}) {
  const { form, info } = sections[0] as AUTHSCREEN;
  const { resetPassword } = useAuth();
  const params = useSearchParams();
  const email = params.get('email');

  const resend = async () => {
    if (email) {
      await resetPassword(email);
    }
  };
  return (
    <section className="relative flex justify-center items-center w-full h-screen">
      <div className="static sm:absolute z-20 bottom-0 lg:static h-full sm:h-fit lg:h-full w-full sm:w-4/5 lg:w-full lg:max-w-2/5 bg-white flex items-center justify-center px-8 py-16 rounded-t-xl lg:rounded-none shadow-lg">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center lg:items-start">
            <div className="flex justify-center mb-6">
              <div className="bg-[#f57a0a]/8 rounded-full w-fit h-fit p-3">
                <Mail color="#f57a0a" size={30} />
              </div>
            </div>

            {form.header && form.header.title && (
              <Title
                className="text-3xl! text-gray-900 mb-2 text-center"
                title={form.header?.title}
              />
            )}
            {form.header && form.header.description && (
              <Description
                className="text-sm text-center lg:text-left text-gray-500"
                description={form.header.description}
              >
                {email}
              </Description>
            )}
          </div>

          <div className="space-y-4">
            {form.footer?.buttons &&
              form.footer?.buttons.length > 0 &&
              form.footer?.buttons.map((btn, i) => {
                if (btn.type === 'submit') {
                  if (btn.link && btn.link.active) {
                    return (
                      <Link
                        key={i}
                        href={btn.link.href}
                        target={btn.link.target}
                        className="rounded-md cursor-pointer w-full h-13 flex items-center justify-center gap-2.5 bg-[#f57a0a] text-white px-8 py-4 text-base font-medium hover:bg-[#e06d00] transition-all hover:-translate-y-0.1"
                      >
                        {btn.text}
                      </Link>
                    );
                  }
                  return (
                    <Button
                      key={i}
                      type="button"
                      onClick={() => btn.action === 'resend' && resend()}
                      className="cursor-pointer w-full h-13 flex items-center justify-center gap-2 bg-white px-6 py-2 text-black text-lg font-medium border hover:border-[#0a1628]/20 hover:bg-slate-50 transition-all"
                    >
                      {btn.text}
                    </Button>
                  );
                }
              })}
          </div>

          {form.footer && form.footer.text && form.footer.text?.length > 0 && (
            <Description
              className="mt-8 text-center text-sm! text-gray-600"
              description={form.footer.text}
            />
          )}
        </div>
      </div>
      <AuthHeroSection {...info} className="hidden sm:block w-full" />
    </section>
  );
}
