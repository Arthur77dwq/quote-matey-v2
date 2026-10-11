import Link from 'next/link';

import { cn, styleParse } from '@/lib/utils';
import { DynamicValue } from '@/types/dashboard';
import { RichText } from '@/types/pages';

import { Icon } from './icon';

export const DomNode = ({
  children,
  br = false,
}: {
  children: RichText;
  br?: boolean;
}) => {
  switch (children.type) {
    case 'TEXT':
      if (children?.strong) {
        return (
          <strong className={cn('text-warning-600', styleParse(children))}>
            {children.text}
          </strong>
        );
      }
      return <span className={styleParse(children)}>{children.text}</span>;
    case 'LINEBREAK':
      return <br className={cn('inline md:inline', br ? '' : 'hidden')} />;
    case 'UL':
      return (
        <ul className={styleParse(children)}>
          {children.items?.map((item, index) => (
            <li key={index} className={styleParse(item)}>
              <DomNode br={br} key={`${index}`} children={item} />
            </li>
          ))}
        </ul>
      );
    case 'OL':
      return (
        <ol className={styleParse(children)}>
          {children.items?.map((item, index) => (
            <li key={index} className={styleParse(item)}>
              <DomNode br={br} key={`${index}`} children={item} />
            </li>
          ))}
        </ol>
      );
    case 'LINK':
      return (
        children.active && (
          <Link
            href={children.href}
            target={children.target}
            className={cn(
              children?.strong && 'text-warning-600',
              'hover:underline',
              styleParse(children),
            )}
          >
            {children.text}
          </Link>
        )
      );
    case 'ICON':
      return (
        children.active && (
          <Icon
            className="size-4"
            key={`${children.icon}`}
            name={children.icon}
            stroke={children.color}
          />
        )
      );
  }
};

export const DynamicNode = ({
  className,
  ...values
}: DynamicValue & { className?: string }) =>
  values.active && (
    <span className={cn('flex gap-2 items-center justify-center', className)}>
      {values.beforeValue?.active && <DomNode children={values.beforeValue} />}
      {values.defaultValue?.active && (
        <DomNode children={values.defaultValue} />
      )}
      {values.afterValue?.active && <DomNode children={values.afterValue} />}
    </span>
  );
