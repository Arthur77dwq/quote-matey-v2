import { QACard } from '@/components/QACard';
import { cn } from '@/lib/utils';
import { QNA } from '@/types/pages';

import { Description, Title } from './section-header';

const variants = {
  primary: {
    container: 'gap-12.5 justify-center px-4 pb-12.5',
    left: ' w-100',
    right: 'w-full sm:w-3xl h-auto',
  },
  secondary: {
    container: 'gap-7.5 lg:gap-17.5 justify-center px-8 sm:px-15 py-15.75',
    left: 'w-full sm:w-95',
    right: 'w-full lg:w-155',
  },
};

export function QNASection({
  visible,
  categories,
  title,
  description,
  variant,
  className,
}: QNA) {
  const style = variants[variant || 'primary'];
  return (
    visible && (
      <section
        className={cn(
          'flex flex-col lg:flex-row items-start w-full h-auto',
          style.container,
          className,
        )}
      >
        {title && (
          <div className={cn('flex flex-col h-fit', style.left)}>
            <Title className="text-left text-[3.06rem]!" {...{ title }} />

            {description && (
              <Description className="text-left" {...{ description }} />
            )}
          </div>
        )}
        <div
          className={cn(
            'flex flex-col justify-start items-center gap-12.5',
            style.right,
          )}
        >
          {categories &&
            categories.map((category, index) => (
              <QACard
                key={`${index}-${category.category}`}
                {...{ category, index }}
              />
            ))}
        </div>
      </section>
    )
  );
}
