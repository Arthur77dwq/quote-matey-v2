import { cn } from '@/lib/utils';

import { Badge } from './ui/badge';

export function Label({
  text,
  className,
  children,
}: {
  text: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Badge className={cn('gap-2 font-semibold rounded-full', className)}>
      {children}
      <span>{text}</span>
    </Badge>
  );
}
