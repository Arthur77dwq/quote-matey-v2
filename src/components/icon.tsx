import type { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';

import { IconMap } from '@/constant/icons';

type IconType = keyof typeof Icons;
type PropType = {
  name: IconType | string;
  className?: string;
};

export const Icon = ({ name, className }: PropType) => {
  let Icon = IconMap[name];
  if (Icon === undefined) {
    Icon = Icons[name as IconType] as LucideIcon;
  }
  return Icon ? <Icon className={className} /> : <></>;
};
