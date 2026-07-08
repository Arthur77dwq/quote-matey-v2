import { Button } from '@/components/button';
import { CTA } from '@/types/pages';

export function CTASection({ visible, title, description, buttons }: CTA) {
  return (
    visible && (
      <section className="w-full flex justify-center items-center">
        <div className="h-26.5 flex flex-col justify-start items-center gap-2.5">
          <h3 className="text-2xl font-semibold text-neutral-900 leading-[1.2em]">
            {title}
          </h3>
          <p className="text-[1rem] leading-[1.3em] text-neutral-600 font-inter font-medium">
            {description}
          </p>
          <div className="h-full w-full flex justify-center items-center gap-2">
            {buttons.map((button, i) => (
              <Button
                key={`${button.id}-${button.variant}-${i}`}
                variant={button.variant}
                className="w-fit"
              >
                {button.text}
              </Button>
            ))}
          </div>
        </div>
      </section>
    )
  );
}
