import { Trend } from '@/constant/icons';
import { cn } from '@/lib/utils';

import { Badge } from './ui/badge';

export function Label({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <Badge
      className={cn(
        'gap-2 bg-[#f57a0a] text-white text-[10px] font-semibold',
        className,
      )}
    >
      <Trend />
      <span className="">{text || 'Most Popular'}</span>
    </Badge>
  );
}
