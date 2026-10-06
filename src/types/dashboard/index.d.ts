import { IconType, ImageType, LINK, NavBar } from '../global';
import { RichText } from '../pages';

export type ActionCallSignature =
  keyof import('@/app/dashboard/actions').ACTIONS;

export type DynamicValue =
  | {
      active: true;
      beforeValue?: RichText;
      afterValue?: RichText;
      defaultValue: RichText;
    }
  | { active: false };

export type CTA = {
  active: boolean;
  title: DynamicValue;
  description: DynamicValue;
  action: LINK | ActionCallSignature;
  style: 'primary' | 'secondary' | 'tertiary'; // TODO: Add styles according to design system
};

export type StatCategory = {
  active: boolean;
  name: string;
  icon: IconType;
} & DynamicValue;

export type StatSummary = {
  active: boolean;
  title: string;
  cta: LINK;
  primaryCTA: CTA;
  stats: StatCategory[];
};

export type SideBar = {
  active: boolean;
  logo?: ImageType & LINK;
  navBar?: NavBar;
  primaryCta?: CTA;
  statSummary?: StatSummary;
  bottom?: {
    active: boolean;
    title: string;
    description: string;
    link: LINK;
    icon: IconType;
  };
};

export type DashboardData = {
  sidebar?: SideBar;
};
