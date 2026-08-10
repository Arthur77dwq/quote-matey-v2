import { CARDType } from '@/types/pages';

import { Icon } from './icon';
import { Title } from './section-header';
import { Card, CardContent } from './ui/card';

export function Chip({
  icon,
  title,
  description,
  variant = 'primary',
}: CARDType) {
  switch (variant) {
    case 'secondary':
      return (
        <Card className="h-full aspect-square gap-0 bg-white p-0  overflow-hidden flex justify-center items-center shadow-md border-none">
          <CardContent className="w-full h-full flex flex-col justify-start items-start gap-2.5 p-3">
            <div>
              {icon && icon.icon && icon.active && (
                <Icon
                  name={icon.icon}
                  color={icon.color}
                  stroke={icon.stroke}
                />
              )}
            </div>
            <div>
              {title && (
                <Title
                  className="tracking-normal leading-[1em] text-left font-inter text-neutral-900 text-[1rem]!"
                  title={title}
                />
              )}
              <p className="whitespace-normal text-[0.8rem]! font-medium font-inter text-[#868C91]">
                {description}
              </p>
            </div>
          </CardContent>
        </Card>
      );
    case 'primary':
    default:
      return (
        <Card className="p-0 overflow-hidden rounded-[0.5rem] border-none shadow-md flex justify-center items-center ">
          <CardContent className="h-fit w-full flex justify-center items-center gap-2.5 bg-white px-3 py-6">
            <div className="w-fit h-full flex justify-center items-center">
              {icon && icon.icon && icon.active && (
                <Icon name={icon.icon} color={icon.color} className="size-5" />
              )}
            </div>
            <div className="w-full h-full ">
              {title && (
                <Title
                  className="tracking-normal text-left text-[1rem]! whitespace-nowrap font-bold text-[#14142E] font-inter"
                  title={title}
                />
              )}
              <p className="font-inter font-medium text-[0.65rem]! text-[#393942]">
                {description}
              </p>
            </div>
          </CardContent>
        </Card>
      );
  }
}
