export type LINK = {
  href: string;
  target: '_blank' | '_self' | '_parent' | '_top';
  text: string;
  active: boolean;
};

export type MetaDateProps = {
  title: string;
  description: string;
  path: string;
};

export type Sections = null;

export type DataType = {
  metadata?: MetaDateProps | null;
  sections?: Sections[] | null;
};

export interface AboutRefs {
  hero: RefObject<AnimatedRef | null>;
  split: RefObject<AnimatedRef | null>;
}

export type fontWeight =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

export type TextNodeType = 'lineBreak' | 'text';

export type RichTextNode =
  | {
      text: string;
      type: TextNodeType;
      bold?: boolean;
      weight?: fontWeight;
      italic?: boolean;
      strong?: boolean;
      underline?: boolean;
      strike?: boolean;
      code?: boolean;
      href?: string;
    }
  | {
      type: 'lineBreak';
    };

export interface HeroSectionProps {
  tag?: string;
  title?: RichTextNode[];
  description?: RichTextNode[];
}
