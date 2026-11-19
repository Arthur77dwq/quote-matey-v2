export type QuoteStatus = 'Draft' | 'Sent' | 'Accepted' | 'Open';

export type QuoteRecord = {
  id: string;
  jobId: string;
  title: string;
  customer: string;
  status: QuoteStatus;
  price: string;
  hours: string;
  date: string;
  time: string;
  image: string;
  type: string;
  property: string;
  location: string;
};

export const QUOTE_TABS = [
  { label: 'All Quotes', count: null },
  { label: 'Draft', count: 8 },
  { label: 'Sent', count: 3 },
  { label: 'Accepted', count: 1 },
  { label: 'Open', count: 2 },
  { label: 'Archived', count: null },
] as const;

export const QUOTES: QuoteRecord[] = [
  {
    id: 'bathroom-renovation',
    jobId: 'J-2024-0156',
    title: 'Bathroom renovation',
    customer: 'Sarah Johnson',
    status: 'Draft',
    price: '$4,250 – $4,950',
    hours: '12 – 16 hours',
    date: 'Today',
    time: '10:24 AM',
    image: '/images/LandingPageImages/mKkLAF31DUtBRHKXlDoILV9RDc.jpg',
    type: 'Bathroom Renovation',
    property: 'Residential',
    location: '123 Smith St, Brisbane QLD 4000',
  },
  {
    id: 'kitchen-plumbing',
    jobId: 'J-2024-0155',
    title: 'Kitchen plumbing',
    customer: 'Mike Wilson',
    status: 'Sent',
    price: '$1,850 – $2,250',
    hours: '6 – 8 hours',
    date: 'Yesterday',
    time: '4:15 PM',
    image: '/images/LandingPageImages/lSZuKptayJeB4Xcw10qjE7IisQw.png',
    type: 'Kitchen Plumbing',
    property: 'Residential',
    location: '42 George St, Brisbane QLD 4000',
  },
  {
    id: 'hot-water-install',
    jobId: 'J-2024-0154',
    title: 'Hot water system install',
    customer: 'Emma Thompson',
    status: 'Accepted',
    price: '$1,650 – $1,950',
    hours: '3 – 4 hours',
    date: '2 days ago',
    time: '2:30 PM',
    image: '/images/HVACTechnician.jpg',
    type: 'Hot Water Installation',
    property: 'Residential',
    location: '8 Boundary Rd, Brisbane QLD 4000',
  },
  {
    id: 'burst-pipe-repair',
    jobId: 'J-2024-0153',
    title: 'Burst pipe repair',
    customer: 'David Brown',
    status: 'Open',
    price: '$380 – $650',
    hours: '2 – 3 hours',
    date: '3 days ago',
    time: '11:20 AM',
    image: '/images/leaking-sink.jpg',
    type: 'Pipe Repair',
    property: 'Residential',
    location: '91 Albert St, Brisbane QLD 4000',
  },
  {
    id: 'toilet-replacement',
    jobId: 'J-2024-0152',
    title: 'Toilet replacement',
    customer: 'Lisa Martinez',
    status: 'Draft',
    price: '$550 – $750',
    hours: '2 – 3 hours',
    date: '4 days ago',
    time: '9:10 AM',
    image: '/images/LandingPageImages/fRXrDTNbxZX05PeBdTktaFaTK4M.png',
    type: 'Toilet Replacement',
    property: 'Residential',
    location: '15 Queen St, Brisbane QLD 4000',
  },
  {
    id: 'outdoor-tap-install',
    jobId: 'J-2024-0151',
    title: 'Outdoor tap install',
    customer: 'James Carter',
    status: 'Sent',
    price: '$280 – $380',
    hours: '1 – 2 hours',
    date: '5 days ago',
    time: '3:45 PM',
    image: '/images/tap.jpg',
    type: 'Tap Installation',
    property: 'Residential',
    location: '67 Creek Rd, Brisbane QLD 4000',
  },
  {
    id: 'shower-leak-fix',
    jobId: 'J-2024-0150',
    title: 'Shower leak fix',
    customer: 'Rebecca Lee',
    status: 'Draft',
    price: '$450 – $650',
    hours: '2 – 3 hours',
    date: '1 week ago',
    time: '10:05 AM',
    image: '/images/plumber2.png',
    type: 'Shower Repair',
    property: 'Residential',
    location: '22 Eagle St, Brisbane QLD 4000',
  },
  {
    id: 'vanity-installation',
    jobId: 'J-2024-0149',
    title: 'Vanity installation',
    customer: 'Chris Anderson',
    status: 'Open',
    price: '$750 – $1,100',
    hours: '3 – 4 hours',
    date: '1 week ago',
    time: '8:30 AM',
    image: '/images/LandingPageImages/nsiuCZqClS4uPF5Umd6U8V4H0.png',
    type: 'Vanity Installation',
    property: 'Residential',
    location: '4 Adelaide St, Brisbane QLD 4000',
  },
];

export const MATERIALS = [
  ['Wall & Floor Tiles', '$850 – $1,100'],
  ['Shower Screen', '$600 – $750'],
  ['Vanity Unit', '$700 – $900'],
  ['Toilet Suite', '$450 – $650'],
  ['Plumbing Fixtures & Fittings', '$350 – $500'],
  ['Waterproofing Materials', '$200 – $300'],
] as const;
