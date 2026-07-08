import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QNA } from '@/types/pages';

export function QNASection({ visible, categories }: QNA) {
  return (
    visible && (
      <section className="px-4 pb-12.5 flex flex-col justify-start items-center gap-12.5 w-full h-auto">
        <div className="flex flex-col justify-start items-center gap-12.5 w-full sm:w-3xl h-auto">
          {categories &&
            categories.map((category, i) => (
              <Card
                key={`${i}-${category?.category}`}
                className="bg-neutral-50 rounded-4xl border-0 p-5 sm:p-7.5 lg:p-12.5 gap-7.5 w-full"
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
                      <Accordion
                        className="cursor-pointer w-full rounded-[1.25rem] border border-neutral-900/20 overflow-hidden"
                        key={`${i}-${query?.question}`}
                        type="single"
                        collapsible
                        defaultValue={
                          i === 0 && z === 0 ? `${i}-${query.question}` : ''
                        }
                      >
                        <AccordionItem
                          value={`${i}-${query.question}`}
                          className="text-balance cursor-pointer transition-colors data-[state=open]:bg-white p-5 gap-2.5 text-[1.38rem] font-inter font-medium"
                        >
                          <AccordionTrigger className="p-0 cursor-pointer hover:no-underline text-neutral-900 text-[1.38rem] font-inter font-medium">
                            {query.question}
                          </AccordionTrigger>
                          <AccordionContent className="cursor-pointer text-[1rem] font-inter font-medium text-neutral-600">
                            {query.answer}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                </CardContent>
              </Card>
            ))}
        </div>
      </section>
    )
  );
}
