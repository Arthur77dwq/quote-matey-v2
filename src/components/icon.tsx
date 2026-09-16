import type { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import { ComponentProps } from 'react';

import { IconMap } from '@/constant/icons';
import { IconKeys } from '@/types/global';

type IconType = keyof typeof Icons;
type PropType = {
  name: IconType | IconKeys;
  className?: string;
} & ComponentProps<'svg'>;

export const Icon = ({ name, ...props }: PropType) => {
  let Icon = IconMap[name as IconKeys];
  if (Icon === undefined) {
    Icon = Icons[name as IconType] as LucideIcon;
  }
  return Icon ? <Icon {...props} /> : <></>;
};
