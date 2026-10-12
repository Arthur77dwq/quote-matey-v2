import { CSSProperties } from 'react';

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

export type StatSummary = {
  active: boolean;
  title: DynamicValue;
  consumption: {
    icon?: IconType;
    total: number;
    used: number;
  };
  primaryCTA: CTA;
  style?: CSSProperties;
};

export type SideBarType = {
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
  sidebar?: SideBarType;
};
