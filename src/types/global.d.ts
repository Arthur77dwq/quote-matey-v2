import { z } from 'zod';

import {
  loginSchema,
  resetSchema,
  signUpSchema,
} from '@/lib/schemas/auth.schema';

export type User = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  token: string;
  subscription: Subscription[] | null;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  withPopUp: () => Promise<UserCredential | undefined>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<UserCredential | undefined>;
  signUp: (
    name: string,
    email: string,
    password: string,
  ) => Promise<UserCredential | undefined>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<UserCredential | undefined>;
};

export type ErrorConfig = {
  message: string;
  type?: 'error' | 'warning' | 'info';
  hide?: boolean;
  action?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type PreviewFile = File & {
  preview: string;
  base64: string;
};

export type MetadataProps = {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
};
export type LogoType = {
  normal: string;
  big?: string | null;
  with_bg?: string | null;
  social?: string | null;
  long_with_subtitle?: string | null;
  long_with_out_subtitle?: string | null;
};

export type BrandType = {
  logo: LogoType;
};

export type ImageType = {
  type: 'IMG';
  alt: string;
  src: string;
};

export type GlobalMetaDataType = {
  siteName: string;
  siteUrl: string;
  category: string;
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string[];
  defaultOgImage: string;
  author: string;
  robots: {
    index: boolean;
    follow: boolean;
  };
};

export type HeaderType = 'GLOBAL_HEADER';
export type FooterType = 'GLOBAL_FOOTER';

export type IconType = {
  type: 'ICON';
  active: boolean;
  position: 'left' | 'center' | 'right';
  icon?: string | null;
};

export type Theme = 'dark' | 'light';

export type buttonVarient =
  | 'default'
  | 'secondary'
  | 'secondary-dark'
  | 'outline';

export type LINK = {
  href: string;
  target: '_self' | '_blank' | '_parent' | '_top' | string;
  text: string | null;
  active: boolean;
};

export type Button = {
  id: number;
  variant: buttonVariants;
  link: LINK | null;
  text: string;
  icon: IconType | null;
};

export type headers = {
  logo: ImageType & Link;
  type: HeaderType;
  navBar: {
    active: boolean;
    links?: LINK[] | null;
  };
  buttons?: Button[];
};

export type FOOTERLINKS = {
  category: string;
  links: LINK[];
};

export type footer = {
  BgImage: ImageType;
  type: FooterType;
  title: string;
  cta: LINK;
  linkCategory: FOOTERLINKS[];
};

export type loginFormData = z.infer<typeof loginSchema>;
export type signUpFormData = z.infer<typeof signUpSchema>;
export type resetFormData = z.infer<typeof resetSchema>;

export type GlobalData = {
  brand: BrandType;
  metadata?: GlobalMetaDataType | null;
  headers?: headers | null;
  footer?: footer | null;
};
