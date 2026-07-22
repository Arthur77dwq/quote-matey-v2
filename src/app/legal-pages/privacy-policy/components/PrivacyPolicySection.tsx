import Link from 'next/link';

import { QAAccordian, QAContent, QATrigger } from '@/components/QAAccordian';
import { cn, prepareSlug } from '@/lib/utils';
import { NODE, PRIVACY, RichTextNode } from '@/types/pages';

type HeadProps = RichTextNode & {
  className?: string;
};

function Head({ level, text, className }: HeadProps) {
  switch (level) {
    case 1:
      return (
        <h1 id={prepareSlug(text || '')} className={cn('', className)}>
          {text}
        </h1>
      );
    case 2:
      return (
        <h2
          id={prepareSlug(text || '')}
          className={cn(
            'font-inter text-[1.3rem] lg:text-3xl font-medium lg:font-semibold text-neutral-900',
            className,
          )}
        >
          {text}
        </h2>
      );
    case 3:
      return (
        <h3
          id={prepareSlug(text || '')}
          className={cn(
            'font-inter text-[1.3rem] lg:text-2xl font-medium lg:font-semibold text-neutral-900',
            className,
          )}
        >
          {text}
        </h3>
      );
    case 4:
      return (
        <h4
          id={prepareSlug(text || '')}
          className={cn('font-inter', className)}
        >
          {text}
        </h4>
      );
    case 5:
      return (
        <h5
          id={prepareSlug(text || '')}
          className={cn('font-inter ', className)}
        >
          {text}
        </h5>
      );
    default:
      return (
        <h6
          id={prepareSlug(text || '')}
          className={cn('font-inter ', className)}
        >
          {text}
        </h6>
      );
  }
}

const renderBody = (each: RichTextNode, sequence: number) => {
  if (each.type === 'text') {
    return (
      <span className="text-wrap w-fit" key={`${sequence}--${each.text}`}>
        {each.text}
      </span>
    );
  }
  if (each.type === 'lineBreak') {
    return <br key={`${sequence}--${each.type}`} />;
  }
  if (each.type === 'ul') {
    return (
      <ul key={`${sequence}--${each.type}`}>
        {each.items?.map((node, i) => {
          if (node.type === 'li') {
            return (
              <li className="pl-2" key={`${sequence}-${i}--${each.text}`}>
                • {node.text}
              </li>
            );
          }
          if (node.type === 'text') {
            return (
              <span
                className="text-wrap w-fit"
                key={`${sequence}-${i}--${each.text}`}
              >
                {node.text}
              </span>
            );
          }
          if (node.type === 'link') {
            return (
              node.link?.active && (
                <Link
                  className="underline text-neutral-900 font-bold hover:text-black/60 transition-colors"
                  key={`${sequence}-${i}--${each.text}`}
                  href={node.link?.href || ''}
                  target={node.link?.target}
                >
                  {node.link.text}
                </Link>
              )
            );
          }
        })}
      </ul>
    );
  }
};

export function parseMobileContent(content: RichTextNode[], index: number) {
  return content.map((each: RichTextNode, sequence: number) => {
    if (each.type === 'HEADING') {
      return (
        <QATrigger className="lg:hidden w-full">
          <Head key={`${sequence}-${index}-${each.text}`} {...each} />
        </QATrigger>
      );
    }
    return (
      <QAContent className="lg:hidden w-full">
        {renderBody(each, sequence)}
      </QAContent>
    );
  });
}

export function parseContent(content: RichTextNode[], index: number) {
  return content.map((each: RichTextNode, sequence: number) => {
    if (each.type === 'HEADING') {
      return (
        <Head
          className="hidden lg:flex"
          key={`${sequence}-${index}-${each.text}`}
          {...each}
        />
      );
    }
    return renderBody(each, sequence);
  });
}

export function extractHeadings(contents: NODE[]) {
  const nodes = contents.filter((x) => x.hasHeading);

  return nodes.map((content: NODE) => {
    const heading = content.node.filter(
      (each: RichTextNode) => each.type === 'HEADING',
    );
    return heading;
  });
}

export function PrivacyPolicySection({ contents, className }: PRIVACY) {
  const headings = extractHeadings(contents).flat();
  return (
    <section
      className={cn(
        'flex flex-col lg:flex-row justify-between items-start gap-5 p-7.5 pt-0 sm:px-15 sm:pb-25 text-balance',
        className,
      )}
    >
      <ul className="h-fit max-w-74.25 min-w-50 w-full hidden lg:flex flex-col gap-5.75 p-2">
        {headings.map((heading: RichTextNode, index) => (
          <li
            key={`${heading.id}-${index}`}
            className="text-black/50 leading-[1.2em] text-[1rem] font-inter font-medium"
            style={{
              paddingLeft: (heading.level || 1) * 15,
            }}
          >
            <Link href={`#${prepareSlug(heading.text || '')}`}>
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>

      <div className="text-neutral-900 flex flex-col h-fit w-full lg:w-fit gap-5">
        {contents.map((content: NODE, index: number) => {
          return (
            <div key={`${index}`} className="w-full">
              {content.hasHeading ? (
                <>
                  <QAAccordian
                    className="lg:hidden w-full"
                    index={1}
                    zIndex={1}
                  >
                    {parseMobileContent(content.node, index)}
                  </QAAccordian>
                  <div className="hidden lg:flex lg:flex-col">
                    {parseContent(content.node, index)}
                  </div>
                </>
              ) : (
                <div className="flex flex-col lg:hidden">
                  {parseContent(content.node, index)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
