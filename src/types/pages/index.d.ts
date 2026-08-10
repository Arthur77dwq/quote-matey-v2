import { z } from 'zod';

import { contactSchema } from '@/lib/schemas/contact.schema';

import { Button, IconType, ImageType, LINK, loginFormData } from '../global';

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
  PRIVACYPOLICY: 'PRIVACYPOLICY';
  LANDINGHERO: 'LANDINGHERO';
  PRODUCT: 'PRODUCT';
  VIDEODEMO: 'VIDEODEMO';
  PLATFORM: 'PLATFORM';
  WORKING: 'WORKING';
  USECASES: 'USECASES';
  LANDINGPRICING: 'LANDINGPRICING';
  AUTHSCREEN: 'AUTHSCREEN';
}

export type VideoType = {
  src: string;
  active: boolean;
};

export type HERO = {
  type: SectionType.HERO;
  visible: boolean;
  BGImage?: ImageType;
  tag?: string;
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

export type LANDINGPRICING = {
  type: SectionType.LANDINGPRICING;
  visible: boolean;
  tag?: string;
  title?: RichTextNode[];
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
  variant?: 'primary' | 'secondary';
  type: SectionType.TESTIMONIAL;
  visible: boolean;
  BGImage: ImageType;
  title: string;
  rating?: string;
  testimonials: UserTestimonial[];
  className?: string;
};

export type HeadingItem = {
  type: TextNodeType | 'HEADING';
  text?: string;
  id?: string;
};

export type NODE = {
  hasHeading: boolean;
  node: RichTextNode[];
};

export type PRIVACY = {
  type: SectionType.PRIVACYPOLICY;
  visible: boolean;
  contents: NODE[];
  className?: string;
};

export type FootNote = {
  icon?: ImageType | IconType;
  text: string;
};

export type LANDINGHERO = {
  type: SectionType.LANDINGHERO;
  visible: boolean;
  BGImage?: ImageType;
  otherImages?: Record<string, ImageType>;
  title?: RichTextNode[];
  description?: RichTextNode[];
  cta?: Button[];
  children?: React.ReactNode;
  footNote?: FootNote[];
  className?: string;
};

export type Stat = {
  stat: string;
  text: string;
};

export type Stats = {
  type: 'STATS';
  data: Stat[];
};

export type Content = Stats;

export type Comparison = {
  type: 'DANGER' | 'SAFE';
  id: string;
  head?: RichTextNode[];
  title?: RichTextNode[];
  icon?: IconType;
  description?: RichTextNode[];
  content?: Content[];
};

export type PRODUCT = {
  type: SectionType.PRODUCT;
  visible: boolean;
  title?: RichTextNode[];
  comparison?: Comparison[];
};

export type VIDEODEMO = {
  type: SectionType.VIDEODEMO;
  visible: boolean;
  tag?: string;
  title?: RichTextNode[];
  description?: RichTextNode[];
  video?: VideoType;
  className?: string;
};

export type PlatformCard = {
  icon?: IconType;
  text: string;
  id: string;
};

export type PLATFORM = {
  type: SectionType.PLATFORM;
  visible: boolean;
  tag?: string;
  BGImage?: ImageType;
  FGImage?: ImageType;
  cards?: PlatformCard[];
  title?: RichTextNode[];
  description?: RichTextNode[];
  className?: string;
};

export type SupportText = {
  title: string;
  description: string;
};

export type WorkingCard = {
  id: string;
  title: string;
  description: string;
  image: ImageType;
};

export type WORKING = {
  type: SectionType.WORKING;
  visible: boolean;
  tag?: string;
  title?: RichTextNode[];
  description?: RichTextNode[];
  className?: string;
  supportingText?: SupportText;
  cards: WorkingCard[];
};

export type USECASESCard = {
  id: string;
  type: 'IMAGE' | 'TEXT-OVERLAYED-IMAGE';
  image: ImageType;
  title?: string;
  description?: string;
  supportingText?: SupportText;
};

export type USECASES = {
  type: SectionType.USECASES;
  visible: boolean;
  tag?: string;
  title?: RichTextNode[];
  className?: string;
  cards: USECASESCard[];
};

export type AUTHHead = {
  title: RichTextNode[];
  description: string;
  logo?: ImageType;
};

export type FormField = {
  id: string;
  name: keyof loginFormData;
  type: string;
  placeholder: string;
  icon?: IconType;
};

export type AUTHBody = {
  inputs: FormField[];
  links: ({ id: string } & LINK)[];
};

export type Separator = {
  id: number;
  type: 'separator';
  text?: string;
  active: boolean;
};

export type AUTHFoot = {
  buttons: (
    | ({
        type?: 'submit';
        action: 'authWithPopUp' | 'authCustomLogin';
      } & Button)
    | Separator
  )[];
  text?: RichTextNode[];
};

export type AUTHForm = {
  top?: {
    icon: IconType;
    text: string;
  };
  header?: AUTHHead;
  body?: AUTHBody;
  footer?: AUTHFoot;
};

export type CARDType = {
  variant: 'primary' | 'secondary';
  id: string;
  icon?: IconType;
  title: (RichTextNode | ({ id: string } & IconType))[];
  description: string;
};

export type AUTHINFO = {
  image?: ImageType;
  topCard?: CARDType;
  bottom: CARDType[];
  achievement: {
    title: string;
    users: ImageType[];
    ratingText: string;
    star: number;
  };
};

export type AUTHSCREEN = {
  type: SectionType.AUTHSCREEN;
  visible: boolean;
  className?: string;
  form: AUTHForm;
  info: AUTHINFO;
};

export type Section =
  | AUTHSCREEN
  | HERO
  | LANDINGHERO
  | VIDEODEMO
  | PRODUCT
  | PLATFORM
  | WORKING
  | USECASES
  | QNA
  | CTA
  | CONTACTFORM
  | PRICING
  | TESTIMONIAL
  | PRIVACY
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

export type IconNodeType = 'ICON';

export type TextNodeType =
  | 'lineBreak'
  | 'text'
  | 'HEADING'
  | 'ul'
  | 'li'
  | 'link'
  | IconNodeType;

export type Item = { text?: string; type: TextNodeType; link?: LINK };

export type RichTextNode = {
  level?: number;
  id: string;
  text?: string;
  type: TextNodeType;
  bold?: boolean;
  weight?: fontWeight;
  italic?: boolean;
  strong?: boolean;
  underline?: boolean;
  strike?: boolean;
  code?: boolean;
  href?: string;
  items?: Item[];
  link?: LINK;
  active?: boolean;
  stroke?: string | undefined;
  position?: 'center' | 'left' | 'right';
  icon?: string | null | undefined;
  color?: string | undefined;
};

export type contactFormData = z.infer<typeof contactSchema>;
