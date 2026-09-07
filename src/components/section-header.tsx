import Link from 'next/link';

import { cn, styleParse } from '@/lib/utils';
import { HeadingNode, RichText } from '@/types/pages';

import { Icon } from './icon';

function DomNode({ children }: { children: RichText }) {
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
      return <br className="hidden md:inline" />;
    case 'UL':
      return (
        <ul className={styleParse(children)}>
          {children.items?.map((item, index) => (
            <li key={index} className={styleParse(item)}>
              <DomNode key={`${index}`} children={item} />
            </li>
          ))}
        </ul>
      );
    case 'OL':
      return (
        <ol className={styleParse(children)}>
          {children.items?.map((item, index) => (
            <li key={index} className={styleParse(item)}>
              <DomNode key={`${index}`} children={item} />
            </li>
          ))}
        </ol>
      );
    case 'LINK':
      return (
        children.active && (
          <Link href={children.href} target={children.target}>
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
            color={children.color}
            stroke={children.stroke}
          />
        )
      );
  }
}

export function Title({
  ref,
  title,
  className,
}: {
  ref?: React.RefObject<HTMLDivElement | null> | React.Ref<HTMLDivElement>;
  title: HeadingNode;
  className?: string;
}) {
  if (title.type === 'HEADING') {
    const commonClass = cn(
      'text-neutral-900 text-center tracking-[-1.4px] leading-[1.2em] text-[2.75rem] md:text-[3.375rem] lg:text-[4.6875rem]',
      className,
    );
    switch (title.level) {
      case 2:
        return (
          <h2 ref={ref} className={commonClass}>
            {title.content.map((node, i) => (
              <DomNode key={`${i}`} children={node} />
            ))}
          </h2>
        );
      case 3:
        return (
          <h3 ref={ref} className={commonClass}>
            {title.content.map((node, i) => (
              <DomNode key={`${i}`} children={node} />
            ))}
          </h3>
        );
      case 4:
        return (
          <h4 ref={ref} className={commonClass}>
            {title.content.map((node, i) => (
              <DomNode key={`${i}`} children={node} />
            ))}
          </h4>
        );
      case 5:
        return (
          <h5 ref={ref} className={commonClass}>
            {title.content.map((node, i) => (
              <DomNode key={`${i}`} children={node} />
            ))}
          </h5>
        );
      case 6:
        return (
          <h6 ref={ref} className={commonClass}>
            {title.content.map((node, i) => (
              <DomNode key={`${i}`} children={node} />
            ))}
          </h6>
        );
      default:
        return (
          <h1 ref={ref} className={commonClass}>
            {title.content.map((node, i) => (
              <DomNode key={`${i}`} children={node} />
            ))}
          </h1>
        );
    }
  }
}

export function Description({
  ref,
  description,
  className,
  children,
}: {
  ref?: React.RefObject<HTMLDivElement | null> | React.Ref<HTMLDivElement>;
  description: RichText[] | string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <p
      ref={ref}
      className={cn(
        'max-w-150 w-full text-[1rem] sm:text-body-md text-center tracking-normal font-inter text-neutral-600! leading-[1.3em]',
        className,
      )}
    >
      {!Array.isArray(description) && description}
      {Array.isArray(description) &&
        description?.map((node, i) => {
          if (node.type === 'CHILDREN') {
            return (
              <span key={i} className={cn(styleParse(node))}>
                {children}
              </span>
            );
          } else {
            return <DomNode key={`${i}`} children={node} />;
          }
        })}
    </p>
  );
}

export function SectionHeader({
  title,
  description,
}: {
  title?: HeadingNode;
  description?: RichText[] | string;
}) {
  return (
    <>
      {title && <Title {...{ title }} />}
      {description && <Description {...{ description }} />}
    </>
  );
}
