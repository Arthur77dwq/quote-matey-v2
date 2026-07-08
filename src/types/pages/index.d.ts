import { Button } from '../global';

export type LINK = {
  href: string;
  target: '_blank' | '_self' | '_parent' | '_top';
  text: string;
  active: boolean;
};

export type MetaDataProps = {
  title: string;
  description: string;
  path: string;
};

export interface SectionType {
  HERO: 'HERO';
  QNA: 'QNA';
  CTA: 'CTA';
}

export type HERO = {
  type: SectionType.HERO;
  visible: boolean;
  tag?: string;
  title?: RichTextNode[];
  description?: RichTextNode[];
};

export type QuestionCategoryType =
  | 'General'
  | 'Platform & features'
  | 'Pricing & plans'
  | 'Account & support';

export type Question = {
  question: string;
  answer: string;
};

export type QuestionCategory = {
  category?: QuestionCategoryType;
  questions: Question[];
};

export type QNA = {
  type: SectionType.QNA;
  visible: boolean;
  categories?: QuestionCategory[];
};

export type CTA = {
  type: SectionType.CTA;
  visible: boolean;
  title: string;
  description: string;
  buttons: Button[];
};

export type Section = HERO | QNA | CTA | null;

export type DataType = {
  metadata?: MetaDataProps | null;
  sections?: Section[] | null;
};

export interface AboutRefs {
  hero: RefObject<AnimatedRef | null>;
  split: RefObject<AnimatedRef | null>;
}

export interface FAQRefs {
  hero: RefObject<AnimatedRef | null>;
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
