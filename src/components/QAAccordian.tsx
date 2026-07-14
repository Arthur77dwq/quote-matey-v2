import { useRef } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { gsap } from '@/lib/animations/plugins';
import { cn } from '@/lib/utils';
import { Question } from '@/types/pages';

const variants = {
  primary: {
    container: '',
    child: 'transition-colors data-[state=open]:bg-white',
  },
  secondary: { container: '', child: 'data-[state=open]:bg-neutral-50' },
};

export function QAAccordian({
  query,
  index,
  zIndex,
}: {
  query: Question;
  index: number;
  zIndex: number;
}) {
  const answerRef = useRef<HTMLDivElement | null>(null);

  const handleChange = () => {
    gsap.set(answerRef.current, {
      opacity: 0,
      y: 50,
    });

    gsap.to(answerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      scrollTrigger: {
        trigger: answerRef.current,
        start: 'top 80%',
        once: true,
      },
    });
  };

  const style = variants[query.variant || 'primary'];
  return (
    <Accordion
      className={cn(
        'cursor-pointer w-full overflow-hidden rounded-[1.25rem] border border-neutral-900/20',
        style.container,
      )}
      type="single"
      collapsible
      defaultValue={
        index === 0 && zIndex === 0 ? `${index}-${query.question}` : ''
      }
      onValueChange={handleChange}
    >
      <AccordionItem
        value={`${index}-${query.question}`}
        variant={query.variant}
        className={cn(
          'cursor-pointer gap-2.5 text-balance text-[1.38rem] font-inter font-medium p-5',
          style.child,
        )}
      >
        <AccordionTrigger
          variant={query.variant}
          className="p-0 cursor-pointer hover:no-underline text-neutral-900 text-[1.38rem] font-inter font-medium"
        >
          {query.question}
        </AccordionTrigger>
        <AccordionContent
          variant={query.variant}
          ref={answerRef}
          className="cursor-pointer text-[1rem] font-inter font-medium text-neutral-600"
        >
          {query.answer}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
