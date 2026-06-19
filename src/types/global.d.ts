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

export type IconType = {
  active: boolean;
  icon?: string | null;
};

export type ButtonsType =
  | 'btn'
  | 'icon_btn'
  | 'form_btn'
  | 'load_btn'
  | 'demo_btn'
  | 'wait_btn';

export type Theme = 'dark' | 'light';

export type Button = {
  id: number;
  type: ButtonsType;
  theme: Theme;
  text: string;
  icon: IconType;
};

export type headers = {
  logo: ImageType;
  type: HeaderType;
  navBar: {
    active: boolean;
    links?: LINK[] | null;
  };
  buttons?: Button[];
};

export type GlobalData = {
  brand: BrandType;
  metadata?: GlobalMetaDataType | null;
  headers?: headers | null;
};
