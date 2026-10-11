import { cn, styleParse } from '@/lib/utils';
import { HeadingNode, RichText } from '@/types/pages';

import { DomNode } from './dome-node';

export function Title({
  ref,
  title,
  className,
  br,
}: {
  ref?: React.RefObject<HTMLDivElement | null> | React.Ref<HTMLDivElement>;
  br?: boolean;
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
              <DomNode br={br} key={`${i}`} children={node} />
            ))}
          </h2>
        );
      case 3:
        return (
          <h3 ref={ref} className={commonClass}>
            {title.content.map((node, i) => (
              <DomNode br={br} key={`${i}`} children={node} />
            ))}
          </h3>
        );
      case 4:
        return (
          <h4 ref={ref} className={commonClass}>
            {title.content.map((node, i) => (
              <DomNode br={br} key={`${i}`} children={node} />
            ))}
          </h4>
        );
      case 5:
        return (
          <h5 ref={ref} className={commonClass}>
            {title.content.map((node, i) => (
              <DomNode br={br} key={`${i}`} children={node} />
            ))}
          </h5>
        );
      case 6:
        return (
          <h6 ref={ref} className={commonClass}>
            {title.content.map((node, i) => (
              <DomNode br={br} key={`${i}`} children={node} />
            ))}
          </h6>
        );
      default:
        return (
          <h1 ref={ref} className={commonClass}>
            {title.content.map((node, i) => (
              <DomNode br={br} key={`${i}`} children={node} />
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
  br = false,
}: {
  br?: boolean;
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
            return <DomNode br={br} key={`${i}`} children={node} />;
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
