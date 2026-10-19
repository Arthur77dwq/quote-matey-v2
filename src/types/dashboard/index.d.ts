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
    stats: { name: string; active: boolean; used: number; total: number }[];
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

export type Items = {
  id: string;
  type: 'quote' | 'job' | 'quote_template';
  lineItemCount?: number;
  title: string;
  customer?: {
    name: string;
  };
  amount?: {
    value: number;
    currency: string;
  };
  status?: 'Sent' | 'Draft' | 'scheduled' | 'completed';
  scheduledAt?: string;
  completedAt?: string;
  highlightTerms: string[];
  url: Link;
  location?: {
    address: string;
  };
  actions: [
    {
      id: string;
      label: string;
    },
  ];
};

export type ItemGroup = {
  type: 'quotes' | 'jobs' | 'templates';
  label: string;
  count: number;
  items: Items[];
};

export type SearchData = {
  query: string;
  totalResults: number;
  organization: {
    name: string;
  };
  groups: ItemGroup[];
  navigation: {
    keyboard: {
      next: 'ArrowDown';
      previous: 'ArrowUp';
      open: 'Enter';
      close: 'Escape';
    };
  };
};
