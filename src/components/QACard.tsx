import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

import { QAAccordian } from '@/components/QAAccordian';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { gsap } from '@/lib/animations/plugins';
import { cn } from '@/lib/utils';
import { QuestionCategory } from '@/types/pages';

const useSectionAnimation = ({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) => {
  useGSAP(() => {
    // Animation Here
    gsap.fromTo(
      sectionRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      },
    );
  });
};

const variants = {
  primary: 'bg-neutral-50 rounded-4xl p-5 sm:p-7.5 lg:p-12.5 ',
  secondary: 'bg-white rounded-none shadow-none',
};

export function QACard({
  category,
  index,
  className,
}: {
  category: QuestionCategory;
  index: number;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useSectionAnimation({
    sectionRef,
  });

  const style = variants[category.variant || 'primary'];

  return (
    <Card
      ref={sectionRef}
      key={`${index}-${category?.category}`}
      className={cn('opacity-0 border-0 gap-7.5 w-full p-0', style, className)}
    >
      {category?.category && (
        <CardHeader className="h-fit flex flex-col justify-center gap-0 p-0">
          <CardTitle className="w-full text-center text-neutral-900 text-heading-5">
            <h2>{category?.category}</h2>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="px-0 w-full flex flex-col justify-center items-center gap-5">
        {category.questions &&
          category.questions.map((query, z) => (
            <QAAccordian
              key={`${index}-${query?.question}`}
              {...{ query, index, zIndex: z }}
            />
          ))}
      </CardContent>
    </Card>
  );
}
