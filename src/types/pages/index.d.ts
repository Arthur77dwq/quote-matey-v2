import { z } from 'zod';

import { contactSchema } from '@/lib/schemas/contact.schema';

import { Button, ImageType, LINK } from '../global';

export type MetaDataProps = {
  title: string;
  description: string;
  path: string;
};

export interface SectionType {
  HERO: 'HERO';
  QNA: 'QNA';
  CTA: 'CTA';
  CONTACTFORM: 'CONTACTFORM';
  PRICING: 'PRICING';
  TESTIMONIAL: 'TESTIMONIAL';
}

export type HERO = {
  type: SectionType.HERO;
  visible: boolean;
  tag?: string;
  BGImage?: ImageType;
  title?: RichTextNode[];
  description?: RichTextNode[];
  children?: React.ReactNode;
  className?: string;
};

export type QuestionCategoryType =
  | 'General'
  | 'Platform & features'
  | 'Pricing & plans'
  | 'Account & support';

export type Question = {
  variant?: 'primary' | 'secondary';
  question: string;
  answer: string;
};

export type QuestionCategory = {
  category?: QuestionCategoryType;
  variant?: 'primary' | 'secondary';
  questions: Question[];
};

export type QNA = {
  type: SectionType.QNA;
  visible: boolean;
  title?: RichTextNode[];
  description?: RichTextNode[];
  categories?: QuestionCategory[];
  variant?: 'primary' | 'secondary';
  className?: string;
};

export type CTA = {
  type: SectionType.CTA;
  visible: boolean;
  title: string;
  description: string;
  buttons: Button[];
};

export type InputType = 'text' | 'email' | 'tel' | 'textarea';

export type Input = {
  field: string;
  name: 'email' | 'name' | 'phone' | 'subject' | 'message';
  required: boolean;
  type: InputType;
  min?: number;
  max?: number;
  placeholder: string;
  autoFocus: boolean;
  autoComplete: string;
  minLength?: number;
  maxLength?: number;
};

export type InputView = Input[];

export type CONTACTFORM = {
  type: SectionType.CONTACTFORM;
  visible: boolean;
  Inputs: InputView[];
};

export type Feature = { text: string; included: boolean };

export type PricingPlan = {
  id: string;
  variant: 'neutral' | 'primary' | 'secondary';
  version: number;
  name: string;
  trend: {
    text: string;
    tranding: boolean;
  };
  pricing: { price: string; currency: string };
  period: string;
  description: string;
  features: Feature[];
  cta: LINK;
};

export type PRICING = {
  type: SectionType.PRICING;
  visible: boolean;
  plans: PricingPlan[];
  footer?: string;
  className?: string;
};

export type USER = {
  image: ImageType;
  name: string;
  trade: string;
};

export type UserTestimonial = {
  className?: string;
  rating: number;
  comment: string;
  user: USER;
};

export type TESTIMONIAL = {
  type: SectionType.TESTIMONIAL;
  visible: boolean;
  BGImage: ImageType;
  title: string;
  rating?: string;
  testimonials: UserTestimonial[];
  className?: string;
};

export type Section =
  | HERO
  | QNA
  | CTA
  | CONTACTFORM
  | PRICING
  | TESTIMONIAL
  | null;

export type DataType = {
  metadata?: MetaDataProps | null;
  sections?: Section[] | null;
};

export interface AboutRefs {
  hero: RefObject<AnimatedRef | null>;
  split: RefObject<AnimatedRef | null>;
}
export interface ContactRefs {
  hero: RefObject<AnimatedRef | null>;
  contact: RefObject<AnimatedRef | null>;
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

export type contactFormData = z.infer<typeof contactSchema>;
