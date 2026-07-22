import { DataType } from '@/types/pages';

export const DATA: DataType = {
  metadata: {
    title: 'AI Quote Generator for Tradies',
    description:
      'Turn photos into professional quotes in minutes. Built for tradies who want to quote faster and win more jobs.',
    path: '/',
  },
  sections: [
    {
      type: 'HERO',
      visible: true,
      BGImage: {
        type: 'IMG',
        src: '/images/about/BackgroundSKYUNDERLAY.jpg',
        alt: '',
      },
      title: [
        {
          id: '1',
          bold: true,
          weight: 'bold',
          type: 'text',
          text: 'Turn messy texts into',
        },
        {
          id: '2',
          type: 'lineBreak',
        },
        {
          id: '3',
          bold: true,
          weight: 'bold',
          type: 'text',
          text: 'professional',
          strong: true,
        },
        {
          id: '4',
          bold: true,
          weight: 'bold',
          type: 'text',
          text: ' quotes',
        },
      ],
      description: [
        {
          id: '1',
          type: 'text',
          text: 'Generate trade quotes in under 60 seconds',
        },
      ],
      cta: [
        {
          id: 0,
          variant: 'default',
          text: 'Get started now',
          link: {
            href: '/login',
            target: '_self',
            text: null,
            active: true,
          },
          icon: {
            type: 'ICON',
            active: true,
            position: 'right',
            icon: 'ArrowRight',
          },
        },
        {
          id: 1,
          variant: 'outline',
          text: 'View Demo',
          link: {
            href: '/chat',
            target: '_self',
            text: null,
            active: true,
          },
          icon: null,
        },
      ],
      footNote: [
        {
          icon: {
            type: 'IMG',
            src: '/images/tools.png',
            alt: '',
          },
          text: 'Built for Aussie Tradies',
        },
        {
          icon: {
            type: 'IMG',
            src: '/images/approved.svg',
            alt: '',
          },
          text: 'No credit card needed',
        },
        {
          icon: {
            type: 'IMG',
            src: '/images/thunder.svg',
            alt: '',
          },
          text: '10 free quotes',
        },
      ],
    },
  ],
};
