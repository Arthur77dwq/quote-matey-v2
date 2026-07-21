import Link from 'next/link';

import { cn } from '@/lib/utils';
import { PRIVACY, RichTextNode } from '@/types/pages';

type HeadProps = RichTextNode & {
  className?: string;
};

const prepareSlug = (heading: string) => {
  const slug = heading.toLowerCase().replace(/\./g, '').replace(/\s+/g, '-');
  return slug;
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
        <h2 id={prepareSlug(text || '')} className={cn('', className)}>
          {text}
        </h2>
      );
    case 3:
      return (
        <h3 id={prepareSlug(text || '')} className={cn('', className)}>
          {text}
        </h3>
      );
    case 4:
      return (
        <h4 id={prepareSlug(text || '')} className={cn('', className)}>
          {text}
        </h4>
      );
    case 5:
      return (
        <h5 id={prepareSlug(text || '')} className={cn('', className)}>
          {text}
        </h5>
      );
    default:
      return (
        <h6 id={prepareSlug(text || '')} className={cn('', className)}>
          {text}
        </h6>
      );
  }
}

export function extractHeadings(contents: RichTextNode[]) {
  return contents.filter((each: RichTextNode) => each.type === 'HEADING');
}

export function PrivacyPolicySection({ contents, className }: PRIVACY) {
  const headings = extractHeadings(contents);

  return (
    <section
      className={cn('flex justify-between items-start px-15 pb-25', className)}
    >
      <ul className="h-fit max-w-74.25 min-w-50 w-full flex flex-col gap-5.75 p-2">
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

      <div className="flex flex-col h-fit w-full">
        {contents.map((content: RichTextNode, index: number) => {
          if (content.type === 'text') {
            return <span key={`${index}-${content.text}`}>{content.text}</span>;
          }
          if (content.type === 'HEADING') {
            return <Head key={`${index}-${content.text}`} {...content} />;
          }
          if (content.type === 'lineBreak') {
            return <br key={`${index}-${content.type}`} />;
          }
          if (content.type === 'ul') {
            return (
              <ul key={`${index}-${content.type}`}>
                {content.items?.map((node, i) => {
                  if (node.type === 'li') {
                    return (
                      <li
                        className="pl-2"
                        key={`${i}-${index}-${content.text}`}
                      >
                        • {node.text}
                      </li>
                    );
                  }
                  if (node.type === 'text') {
                    return (
                      <span key={`${i}-${index}-${content.text}`}>
                        {node.text}
                      </span>
                    );
                  }
                })}
              </ul>
            );
          }
        })}
      </div>
    </section>
  );
}
