import { PriceCard } from '@/components/price-card';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { PRICING } from '@/types/pages';

export function PricingSection({ plans, footer, className }: PRICING) {
  return (
    <section className={cn('flex justify-center w-6xl h-full', className)}>
      <Card className="h-full w-full flex p-1.5 pb-5 rounded-4xl border border-neutral-100">
        <CardContent className="flex flex-row justify-between items-center p-2.5 bg-neutral-50 rounded-2xl border-0 gap-2.5 w-full h-full overflow-hidden">
          {plans.map((plan, index) => (
            <PriceCard
              key={`${index}-${plan.id}`}
              {...{ plan, active: true }}
            />
          ))}
        </CardContent>
        <CardFooter className="flex justify-center text-[0.88rem] font-medium text-neutral-600 font-inter">
          {footer}
        </CardFooter>
      </Card>
    </section>
  );
}
