import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface UsageLimitNotificationProps {
  variant?: 'inline' | 'compact';
  info: string;
  link_text: string;
  href: string;
}

export default function UsageLimitNotification({
  variant = 'inline',
  info,
  link_text,
  href,
}: UsageLimitNotificationProps) {
  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-2 bg-[#0a1628] text-white rounded-2xl px-3 py-2 text-sm">
        <AlertCircle className="size-4" />
        <span>{info}</span>
        <Button
          asChild
          size="sm"
          variant="ghost"
          className="h-auto py-0.5 px-2 text-white hover:bg-white/20 hover:text-white"
        >
          <Link href={href}>{link_text}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 bg-[#0a1628] text-white rounded-2xl px-4 py-3 max-w-fit">
      <div className="bg-white/10 rounded-full p-1.5">
        <AlertCircle className="size-5" />
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-medium">{info}</span>
        <Link
          href={href}
          className="text-xs text-white/80 hover:text-white hover:underline"
        >
          {link_text}
        </Link>
      </div>
    </div>
  );
}
