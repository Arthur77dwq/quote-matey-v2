import { cn, styleParse } from '@/lib/utils';
import { RichTextNode } from '@/types/pages';

export function Title({
  title,
  className,
}: {
  title: RichTextNode[];
  className?: string;
}) {
  return (
    <h1
      className={cn(
        'text-wrap text-center tracking-[-1.4px] leading-[1.2em] text-neutral-900 text-[2.13rem] sm:text-[3.38rem] lg:text-[4.69rem]',
        className,
      )}
    >
      {title?.map((node, i) => {
        if (node.type === 'lineBreak') {
          return <br key={i} />;
        }

        const Component = node.strong ? 'strong' : 'span';

        return (
          <Component key={`${i}-${node.text}`} className={cn(styleParse(node))}>
            {node.text}
          </Component>
        );
      })}
    </h1>
  );
}

export function Description({
  description,
  className,
}: {
  description: RichTextNode[];
  className?: string;
}) {
  return (
    <p
      className={cn(
        'max-w-150 w-full text-[1rem] sm:text-body-md text-center tracking-normal font-inter font-medium text-neutral-600 leading-[1.3em]',
        className,
      )}
    >
      {description?.map((node, i) => {
        if (node.type === 'lineBreak') {
          return <br className="hidden sm:static" key={i} />;
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
