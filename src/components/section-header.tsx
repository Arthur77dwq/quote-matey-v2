import Link from 'next/link';

import { cn, styleParse } from '@/lib/utils';
import { RichTextNode } from '@/types/pages';

import { Icon } from './icon';

export function Title({
  ref,
  title,
  className,
}: {
  ref?: React.RefObject<HTMLDivElement | null> | React.Ref<HTMLDivElement>;
  title: RichTextNode[];
  className?: string;
}) {
  return (
    <h1
      ref={ref}
      className={cn(
        'inline-block text-wrap text-center tracking-[-1.4px] leading-[1.2em] text-neutral-900 text-[2.13rem] sm:text-[2.75rem] lg:text-[4.69rem]',
        className,
      )}
    >
      {title?.map((node, i) => {
        if (node.type === 'lineBreak') {
          return <br className="lg:hidden" key={i} />;
        }
        if (node.type === 'ICON') {
          return (
            node.active &&
            node.icon && (
              <Icon
                className="size-4"
                key={`${i}-${node.icon}`}
                name={node.icon}
                color={node.color}
              />
            )
          );
        }
        if (node.type === 'text') {
          const Component = node.strong ? 'strong' : 'span';
          return (
            <Component
              key={`${i}-${node.text}`}
              className={cn('inline leading-[1.2em]', styleParse(node))}
            >
              {node.text}
            </Component>
          );
        }
      })}
    </h1>
  );
}

export function Description({
  ref,
  description,
  className,
  children,
}: {
  ref?: React.RefObject<HTMLDivElement | null> | React.Ref<HTMLDivElement>;
  description: RichTextNode[] | string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <p
      ref={ref}
      className={cn(
        'max-w-150 w-full text-[1rem] sm:text-body-md text-center tracking-normal font-inter text-neutral-600 leading-[1.3em]',
        className,
      )}
    >
      {!Array.isArray(description) && description}
      {Array.isArray(description) &&
        description?.map((node, i) => {
          if (node.type === 'lineBreak') {
            return <br className="hidden sm:static" key={i} />;
          }
          if (node.type === 'link') {
            return (
              node.href && (
                <Link
                  href={node.href}
                  key={i}
                  className={cn('inline hover:underline', styleParse(node))}
                >
                  {node.text}
                </Link>
              )
            );
          }
          if (node.type === 'ICON') {
            return (
              node.active &&
              node.icon && (
                <Icon
                  className="size-4"
                  key={`${i}-${node.icon}`}
                  name={node.icon}
                  color={node.color}
                />
              )
            );
          }
          if (node.type === 'children') {
            return (
              <span key={i} className={cn('inline', styleParse(node))}>
                {children}
              </span>
            );
          }
          return (
            <span key={i} className={cn('inline', styleParse(node))}>
              {node.text}{' '}
            </span>
          );
        })}
    </p>
  );
}

export function SectionHeader({
  title,
  description,
}: {
  title?: RichTextNode[];
  description?: RichTextNode[];
}) {
  return (
    <>
      {title && <Title {...{ title }} />}
      {description && <Description {...{ description }} />}
    </>
  );
}
