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
          color: 'white',
        },
        defaultValue: {
          id: 'primary-cta-title',
          active: true,
          type: 'TEXT',
          text: 'New Quote',
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
        {
          active: true,
          href: '/dashboard/quotes', // TODO: use defined urls only from a constant file, for easy management of urls in future.
          target: '_self',
          text: 'Quotes',
          icon: {
            type: 'ICON',
            active: true,
            position: 'left',
            icon: 'TextQuote',
          },
          highlight: {
            active: true,
            type: 'badge',
            defaultValue: '12',
          },
        },
        {
          active: true,
          href: '/dashboard/templates', // TODO: use defined urls only from a constant file, for easy management of urls in future.
          target: '_self',
          text: 'Templates',
          icon: {
            type: 'ICON',
            active: true,
            position: 'left',
            icon: 'NotepadText',
          },
        },
        {
          active: true,
          href: '/dashboard/settings', // TODO: use defined urls only from a constant file, for easy management of urls in future.
          target: '_self',
          text: 'Settings',
          icon: {
            type: 'ICON',
            active: true,
            position: 'left',
            icon: 'Settings',
          },
        },
        {
          active: true,
          href: '/dashboard/plan', // TODO: use defined urls only from a constant file, for easy management of urls in future.
          target: '_self',
          text: 'Plan',
          icon: {
            type: 'ICON',
            active: true,
            position: 'left',
            icon: 'CreditCard',
          },
        },
        {
          active: true,
          href: '/dashboard/analytics', // TODO: use defined urls only from a constant file, for easy management of urls in future.
          target: '_self',
          text: 'Analytics',
          icon: {
            type: 'ICON',
            active: true,
            position: 'left',
            icon: 'ChartNoAxesColumn',
          },
          highlight: {
            active: true,
            type: 'badge',
            defaultValue: 'Admin',
          },
        },
      ],
    },
    statSummary: {
      active: true,
      title: {
        active: true,
        defaultValue: {
          id: 'defaultvalue-stat-summary',
          active: true,
          type: 'TEXT',
          text: 'Free Plan',
        },
        afterValue: {
          active: true,
          id: 'aftervalue-stat-summary-title',
          type: 'LINK',
          href: '/dashboard/plan',
          target: '_self',
          text: 'Upgrade',
        },
      },
      primaryCTA: {
        active: true,
        title: {
          active: true,
          beforeValue: {
            id: 'before-value-stat-summary-primary-cta',
            active: true,
            type: 'TEXT',
            text: 'Upgrade to',
          },
          defaultValue: {
            active: true,
            type: 'TEXT',
            id: 'default-value-stat-summary-primary-cta',
            text: 'Starter Plan',
          },
        },
        description: {
          active: true,
          afterValue: {
            id: 'desc-after-value-stat-summary-primary-cta',
            active: true,
            type: 'TEXT',
            text: '/month',
          },
          defaultValue: {
            id: 'desc-default-value-stat-summary-primary-cta',
            active: true,
            type: 'TEXT',
            text: '$ 19.99',
          },
        },
        action: 'upgradeToNextPlan',
        style: 'primary',
      },
      consumption: {
        icon: {
          active: true,
          type: 'ICON',
          icon: 'Info',
          position: 'right',
          color: 'grey',
        },
        total: 100,
        used: 20,
      },
    },
    bottom: {
      active: true,
      title: 'Need help?',
      description: "We're here to help you",
      icon: {
        active: true,
        position: 'right',
        type: 'ICON',
        icon: 'CircleQuestionMark',
      },
      link: {
        active: true,
        href: '/contact',
        target: '_self',
        text: 'Contact support',
        icon: {
          active: true,
          position: 'right',
          type: 'ICON',
          icon: 'MoveRight',
        },
      },
    },
  },
};
