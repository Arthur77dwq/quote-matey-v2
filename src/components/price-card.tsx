'use client';
import { Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { ImageIcon, TextIcon } from '@/constant/icons';

import { Label } from './label';

type Props = {
  name: string;
  trend: { text: string; tranding: boolean };
  description: string;
  pricing: { price: string; currency: string };
  period: string;
  features: {
    icon?: string;
    text: string;
    included: boolean;
  }[];
  points: {
    text: string;
    included: boolean;
  }[];
  highlighted: boolean;
  cta: { text: string; target: string };
};

const IconMap: Record<string, React.FC<{ className?: string }>> = {
  image: ImageIcon,
  text: TextIcon,
};

export function PriceCard(plan: Props) {
  const router = useRouter();

  const IconMapper = (name: string) => {
    const Icon = IconMap[name];
    return Icon ? <Icon /> : null;
  };

  return (
    <div
      className={`relative bg-white rounded-3xl p-6 border-2 transition-all ${
        plan.highlighted
          ? 'border-[#f57a0a] shadow-2xl shadow-[#f57a0a]/10 scale-[1.02]'
          : 'border-border shadow-lg'
      }`}
    >
      <div className="space-x-5 mb-6 pt-2">
        <h3 className="inline text-xl font-medium text-[#0a1628] mb-1">
          {plan.name || 'Starter Plan'}
        </h3>
        {plan.trend.tranding && (
          <Label className="rounded-full" text={plan.trend.text} />
        )}
      </div>

      <div className="mb-6">
        <div className="flex items-end justify-start gap-1">
          <span className="text-5xl font-bold text-[#0a1628]">
            {plan.pricing.price || '$29'}
          </span>
          <span className="text-muted-foreground pb-1">
            {plan.pricing.currency || 'AUD'}/{plan.period || 'month'}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center ">
        <ul className="w-full space-y-3 mb-2 border-t border-slate-200 pb-4 pt-6">
          {plan.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center gap-3">
              {IconMapper(feature.icon || '')}
              <span
                className={
                  feature.included ? 'text-foreground' : 'text-muted-foreground'
                }
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        <span className="block bg-slate-200 border-y border-slate-200 w-10 h-1 rounded-4xl" />
        <ul className="w-full space-y-3 mb-2 border-b border-slate-200 pt-4 pb-6">
          {plan.points.map((point, pointIndex) => (
            <li key={pointIndex} className="flex items-center gap-3">
              {point.included ? (
                <div className="flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 " />
                </div>
              ) : (
                <div className="flex items-center justify-center shrink-0">
                  <X className="w-5 h-5 text-slate-400" />
                </div>
              )}
              <span
                className={
                  point.included ? 'text-foreground' : 'text-muted-foreground'
                }
              >
                {point.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="underline mb-6 text-muted-foreground">
        {plan.description ||
          'A basic plan for getting started with our service.'}
      </p>

      <button
        onClick={() => router.push(plan.cta.target)}
        className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
          plan.highlighted
            ? 'bg-[#f57a0a] text-white hover:bg-[#e06d00] shadow-lg shadow-[#f57a0a]/20'
            : 'bg-[#0a1628] text-white hover:bg-[#1a3a5c]'
        }`}
      >
        {plan.cta.text || 'Get Started'}
      </button>
    </div>
  );
}
