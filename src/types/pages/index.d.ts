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
