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
            style: {
              color: 'oklch(70.5% 0.213 47.604)',
              backgroundColor: '#FFEEE8',
            },
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
            style: {
              color: '#8B6BF6',
              backgroundColor: '#F3EEFE',
            },
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
        stats: [
          {
            name: 'Quotes',
            active: true,
            used: 10,
            total: 40,
          },
          {
            name: 'Images',
            active: true,
            used: 20,
            total: 60,
          },
        ],
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

export const SEARCH_DEMO_DATA = {
  query: '',
  totalResults: 6,
  organization: {
    name: 'Plumbing Co.',
  },
  groups: [
    {
      type: 'quotes',
      label: 'Quotes',
      count: 2,
      items: [
        {
          id: 'Q-1042',
          type: 'quote',
          title: 'Hot water system replacement',
          customer: {
            name: 'Sarah Wilson',
          },
          amount: {
            value: 2450,
            currency: 'USD',
          },
          status: 'Sent',
          highlightTerms: ['Hot water'],
          url: {
            href: '/dashboard/quote/?id=Q-1042',
            target: '_self',
            text: null,
            active: true,
          },
          actions: [
            {
              id: 'open',
              label: 'Open quote',
            },
          ],
        },
        {
          id: 'Q-1038',
          type: 'quote',
          title: 'Hot water unit installation',
          customer: {
            name: 'James Cooper',
          },
          amount: {
            value: 1850,
            currency: 'USD',
          },
          status: 'Draft',
          highlightTerms: ['Hot water'],
          url: {
            href: '/dashboard/quote/?id=Q-1038',
            target: '_self',
            text: null,
            active: true,
          },
          actions: [
            {
              id: 'open',
              label: 'Open quote',
            },
          ],
        },
      ],
    },
    {
      type: 'jobs',
      label: 'Jobs',
      count: 2,
      items: [
        {
          id: 'J-0286',
          type: 'job',
          title: 'Hot water cylinder repair',
          location: {
            address: '18 Oak St',
          },
          status: 'scheduled',
          scheduledAt: '2026-10-16',
          highlightTerms: ['Hot water'],
          url: {
            href: '/dashboard/job/?id=J-0286',
            target: '_self',
            text: null,
            active: true,
          },
          actions: [
            {
              id: 'open',
              label: 'Open job',
            },
          ],
        },
        {
          id: 'J-0274',
          type: 'job',
          title: 'Hot water valve replacement',
          location: {
            address: '42 Park Rd',
          },
          status: 'completed',
          completedAt: '2026-10-12',
          highlightTerms: ['Hot water'],
          url: {
            href: '/dashboard/job/?id=J-0274',
            target: '_self',
            text: null,
            active: true,
          },
          actions: [
            {
              id: 'open',
              label: 'Open job',
            },
          ],
        },
      ],
    },
    {
      type: 'templates',
      label: 'Templates',
      count: 2,
      items: [
        {
          id: 'QT-001',
          type: 'quote_template',
          title: 'Hot water system replacement',
          lineItemCount: 6,
          highlightTerms: ['Hot water'],
          url: {
            href: '/dashboard/template/?id=QT-001',
            target: '_self',
            text: null,
            active: true,
          },
          actions: [
            {
              id: 'open',
              label: 'Open template',
            },
          ],
        },
        {
          id: 'QT-002',
          type: 'quote_template',
          title: 'Hot water service & maintenance',
          lineItemCount: 4,
          highlightTerms: ['Hot water'],
          url: {
            href: '/dashboard/template/?id=QT-002',
            target: '_self',
            text: null,
            active: true,
          },
          actions: [
            {
              id: 'open',
              label: 'Open template',
            },
          ],
        },
      ],
    },
  ],
  navigation: {
    keyboard: {
      next: 'ArrowDown',
      previous: 'ArrowUp',
      open: 'Enter',
      close: 'Escape',
    },
    selectedItemId: 'Q-1042',
  },
};
