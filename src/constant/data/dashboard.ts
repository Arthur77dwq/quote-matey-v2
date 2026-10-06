import { DashboardData } from '@/types/dashboard';

export const DASHBOARD_DATA: DashboardData = {
  sidebar: {
    active: true,
    logo: {
      type: 'IMG',
      alt: 'QuoteMatey | HOME',
      src: '/quotematey-hor-with-out-subtitle.png',
      href: '/',
      target: '_self',
      active: true,
      text: null,
    },
    primaryCta: {
      active: true,
      title: {
        active: true,
        beforeValue: {
          id: 'primary-cta-before-value',
          active: true,
          type: 'ICON',
          icon: 'Sparkles',
          position: 'left',
        },
        defaultValue: {
          id: 'primary-cta-title',
          active: true,
          type: 'TEXT',
          text: 'Chat',
        },
      },
      description: {
        active: false,
      },
      style: 'primary',
      action: 'newChat',
    },
    navBar: {
      active: true,
      links: [
        {
          active: true,
          href: '/dashboard/chat', // TODO: use defined urls only from a constant file, for easy management of urls in future.
          target: '_self',
          text: 'Chat',
          icon: {
            type: 'ICON',
            active: true,
            position: 'left',
            icon: 'MessageCircle',
          },
        },
      ],
    },
  },
};
