import { QNA } from '@/types/pages';

import { QACard } from './QACard';

export function QNASection({ visible, categories }: QNA) {
  return (
    visible && (
      <section className="px-4 pb-12.5 flex flex-col justify-start items-center gap-12.5 w-full h-auto">
        <div className="flex flex-col justify-start items-center gap-12.5 w-full sm:w-3xl h-auto">
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
