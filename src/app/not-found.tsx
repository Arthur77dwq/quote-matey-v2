'use client';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/button';
import { Description, Title } from '@/components/section-header';
import { Badge } from '@/components/ui/badge';
import { GLOBAL_DATA } from '@/constant/data/global';
import { Button as ButtonType } from '@/types/global';

export default function Page() {
  const { notFound } = GLOBAL_DATA;
  const { tag, buttons, title, subTitle, description }: typeof notFound =
    notFound;
  const router = useRouter();
  return (
    <section className="w-full h-fit flex justify-center items-center pb-20">
      <div className="pt-47 flex justify-center items-center ">
        <div className="p-10 sm:p-25 w-full sm:w-3xl h-fit flex flex-col justify-center items-center gap-1 rounded-2xl border border-[#EDF1F4] bg-[#EDF1F4] shadow-sm shadow-[#EDF1F4]/30">
          {tag && (
            <Badge className="rounded-full py-2.5 px-5 bg-white text-[0.87rem] font-medium font-inter text-neutral-900 flex items-center justify center border border-neutral-100">
              {tag}
            </Badge>
          )}

          {title && (
            <Title
              className="leading-40 text-7xl sm:text-display-xl!"
              title={title}
            />
          )}
          {subTitle && (
            <Description
              className="text-[#102E60] text-5xl! font-medium"
              description={subTitle}
            />
          )}
          {description && (
            <Description className="text-body-md!" description={description} />
          )}

          <div className="w-full h-fit flex items-center justify-center gap-2.5">
            {buttons.map((button: ButtonType, i: number) => (
              <Button
                key={`${i}-${button.text}`}
                className={
                  button.variant === 'secondary'
                    ? 'text-white! text-[0.7rem] sm:text-body-md font-inter font-semibold shadow-[inset_4px_4px_8px_rgba(255, 85, 0, 1),inset_-4px_-4px_8px_rgba(255, 77, 0, 1),0_4px_16px_rgba(255, 77, 0, 0.5)] bg-linear-to-br from-bg-[#FF976B] via-15% via-[#FF8352] to-[#FF6929] w-fit border border-[#FF530A]'
                    : 'h-full transition-colors ease-in-out hover:bg-neutral-900 bg-white hover:text-white text-neutral-900 px-6.5 py-3.5 w-fit rounded-4xl font-inter font-semibold text-[0.7rem] sm:text-body-md'
                }
                variant={button.variant}
                onClick={() =>
                  button.link && button.link.active
                    ? router.push(button.link.href)
                    : null
                }
              >
                {button?.text}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
