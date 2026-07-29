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
      type: 'LANDINGHERO',
      visible: true,
      BGImage: {
        type: 'IMG',
        src: '/images/openScene.png',
        alt: '',
      },
      otherImages: {
        uiView: {
          type: 'IMG',
          src: '/images/dashboard.png',
          alt: '',
        },
        overlay: {
          type: 'IMG',
          src: '/images/mountain.png',
          alt: '',
        },
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
          variant: 'secondary',
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
    {
      type: 'PRODUCT',
      visible: true,
      title: [
        {
          id: '1',
          bold: true,
          weight: 'bold',
          type: 'text',
          text: 'Stop losing jobs to',
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
          text: `"I'll send it tonight."`,
          strong: true,
        },
      ],
      comparison: [
        {
          type: 'DANGER',
          icon: {
            type: 'ICON',
            active: true,
            position: 'center',
            icon: 'X',
            color: '#FF530A',
          },
          id: '1',
          head: [
            {
              id: '1',
              bold: true,
              weight: 'medium',
              type: 'text',
              text: 'Before QuoteMatey',
            },
          ],
          title: [
            {
              id: '1',
              bold: true,
              weight: 'bold',
              type: 'text',
              text: "The 'Busy Tradie' Text",
              strong: true,
            },
          ],
          description: [
            {
              id: '1',
              bold: true,
              weight: 'bold',
              type: 'text',
              text: 'I can fix your tap leak in 5',
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
              text: 'hours will cost $200 + gst',
            },
          ],
          content: [
            {
              type: 'STATS',
              data: [
                {
                  stat: '24%',
                  text: 'Chance to win the job',
                },
                {
                  stat: '43%',
                  text: 'Quote Pricing Accuracy',
                },
              ],
            },
          ],
        },
        {
          type: 'SAFE',
          icon: {
            type: 'ICON',
            active: true,
            position: 'center',
            icon: 'Check',
            color: '#10B17E',
          },
          id: '2',
          head: [
            {
              id: '1',
              bold: true,
              weight: 'medium',
              type: 'text',
              text: 'After QuoteMatey',
            },
          ],
          title: [
            {
              id: '1',
              bold: true,
              weight: 'bold',
              type: 'text',
              text: 'The QuoteMatey Response',
            },
          ],
          description: [
            {
              id: '1',
              bold: true,
              weight: 'bold',
              type: 'text',
              text: "G'day, I can get that leaking tap sorted for you quickly. The job involves isolating the supply, replacing the faulty internal components, and testing the seal. You are looking at a price between $180 and $350 depending on the specific tap type. I will make sure everything is left clean once the job is done. Let me know if you want to get this booked in. Cheers",
            },
          ],
          content: [
            {
              type: 'STATS',
              data: [
                {
                  stat: '89%',
                  text: 'Chance to win the job',
                },
                {
                  stat: '93%',
                  text: 'Quote Pricing Accuracy',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
