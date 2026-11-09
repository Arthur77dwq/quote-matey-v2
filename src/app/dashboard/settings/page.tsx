'use client';

import {
  Bell,
  Briefcase,
  CheckCircle2,
  ClipboardList,
  DollarSign,
  FileText,
  Mail,
  MessageCircle,
  Pencil,
  Plug,
  Shield,
  Smile,
  Star,
  Store,
  Trash2,
  User,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

/* ---------- data ---------- */

const NAV_ITEMS = [
  { key: 'business-profile', label: 'Business Profile', icon: Store },
  { key: 'pricing-rates', label: 'Pricing & Rates', icon: DollarSign },
  { key: 'ai-preferences', label: 'AI & Preferences', icon: Star },
  {
    key: 'templates-defaults',
    label: 'Templates Defaults',
    icon: ClipboardList,
  },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'integrations', label: 'Integrations', icon: Plug },
  { key: 'team', label: 'Team', icon: User, disabled: true, comingSoon: true },
] as {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  comingSoon?: boolean;
}[];

const TONES = [
  { value: 'Formal', icon: Briefcase },
  { value: 'Neutral', icon: Smile },
  { value: 'Casual', icon: MessageCircle },
];

const SYSTEM_STATUS = [
  { label: 'Autosave', status: 'Enabled' },
  { label: 'Global settings', status: 'Up to date' },
  { label: 'AI preferences', status: 'Active' },
  { label: 'Rate calculations', status: 'Applying correctly' },
];

const PREVIEW = {
  subtitle: 'Plumbing Services',
  quoteId: 'J-2024-0156',
  date: '12 May 2024',
  jobScope:
    'Supply and install new bathroom fixtures including toilet, vanity and shower.',
  labour: '12 – 16 hours',
  materials: '$3,150 – $4,200',
  total: '$4,917 – $6,556',
};

/* ---------- shared bits ---------- */

function Panel({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-[#eeeeee] bg-white p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-[#0a1628]">{label}</Label>
      {children}
    </div>
  );
}

function SuffixInput({
  defaultValue,
  suffix,
}: {
  defaultValue: string;
  suffix?: string;
}) {
  return (
    <div className="relative">
      <Input defaultValue={defaultValue} className={suffix ? 'pr-10' : ''} />
      {suffix && (
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          {suffix}
        </span>
      )}
    </div>
  );
}

/* ---------- page ---------- */

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('business-profile');
  const [businessName, setBusinessName] = useState('John D. Plumbing Co.');

  const goTo = (key: string) => {
    setActiveTab(key);
    document
      .querySelector(`#section-${key}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex w-full flex-col bg-[#fafafa] lg:h-[calc(100vh-4rem)] lg:flex-row lg:overflow-hidden">
      {/* Settings sub-nav (fixed width, own scroll) */}
      <aside className="w-full shrink-0 border-b border-[#eeeeee] bg-white px-4 py-6 lg:h-full lg:w-[220px] lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <SettingsMenu activeTab={activeTab} onChange={goTo} />
      </aside>

      {/* Main column (flexible width, own scroll) */}
      <main className="min-w-0 flex-1 lg:h-full lg:overflow-y-auto">
        <div className="mx-auto w-full max-w-4xl space-y-4 p-6 lg:p-8">
          <section id="section-business-profile" className="scroll-mt-6">
            <h2 className="mb-4 text-lg font-semibold text-[#0a1628]">
              Business Profile
            </h2>
            <BusinessProfile
              businessName={businessName}
              onNameChange={setBusinessName}
            />
          </section>

          <section id="section-pricing-rates" className="scroll-mt-6">
            <PricingRates />
          </section>

          <section id="section-ai-preferences" className="scroll-mt-6">
            <AIPreferences />
          </section>

          <section id="section-templates-defaults" className="scroll-mt-6">
            <TemplatesDefaults />
          </section>

          <section id="section-notifications" className="scroll-mt-6">
            <Notifications />
          </section>

          <section id="section-integrations" className="scroll-mt-6">
            <Integrations />
          </section>
        </div>
      </main>

      {/* Right panel (fixed width, own scroll) */}
      <aside className="w-full shrink-0 space-y-4 border-t border-[#eeeeee] bg-white p-6 lg:h-full lg:w-[360px] lg:overflow-y-auto lg:border-l lg:border-t-0">
        <LivePreviewHeader />
        <SampleQuotePreview businessName={businessName} />
        <SystemStatusCard />
        <DangerZoneCard />
      </aside>
    </div>
  );
}

/* ---------- sub-nav ---------- */

function SettingsMenu({
  activeTab,
  onChange,
}: {
  activeTab: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="px-3 text-lg font-semibold text-[#0a1628]">Settings</h2>
      <nav className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = activeTab === item.key;
          return (
            <button
              key={item.key}
              disabled={item.disabled}
              onClick={() => onChange(item.key)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
                  ? 'bg-[#FFF0EA] font-semibold text-[#FF4D00]'
                  : 'text-[#0a1628]/80 hover:bg-[#FFF0EA]/60 hover:text-[#FF4D00]'
              } ${item.disabled ? 'cursor-not-allowed opacity-70' : ''}`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
              {item.comingSoon && (
                <span className="text-xs font-normal text-muted-foreground">
                  (Coming soon)
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

/* ---------- main cards ---------- */

function BusinessProfile({
  businessName,
  onNameChange,
}: {
  businessName: string;
  onNameChange: (v: string) => void;
}) {
  return (
    <Panel>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[170px_1fr]">
        {/* Logo */}
        <div>
          <Label className="mb-2 block text-sm font-semibold text-[#0a1628]">
            Business Logo
          </Label>
          <div className="relative h-[150px] w-[150px] rounded-2xl bg-[#f4f4f5] flex items-center justify-center">
            <Image
              src="/images/quotematey-logo.png"
              alt="Business Logo"
              width={100}
              height={100}
              className="h-[100px] w-[100px] rounded-xl bg-white object-contain p-2 shadow-sm"
            />
            <button
              type="button"
              aria-label="Edit logo"
              className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0a1628] shadow-md hover:text-[#FF4D00] transition-colors"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <FormField label="Business Name">
            <Input
              value={businessName}
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full"
            />
          </FormField>
          <FormField label="Trade Type">
            <Select defaultValue="Plumbing">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Plumbing">Plumbing</SelectItem>
                <SelectItem value="Electrical">Electrical</SelectItem>
                <SelectItem value="Carpentry">Carpentry</SelectItem>
                <SelectItem value="Cleaning">Cleaning</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="ABN (Optional)">
            <Input defaultValue="12 345 678 901" className="w-full" />
          </FormField>
          <FormField label="Website (Optional)">
            <Input defaultValue="www.jdplumbing.com.au" className="w-full" />
          </FormField>
        </div>
      </div>
    </Panel>
  );
}

function PricingRates() {
  return (
    <Panel>
      <h2 className="mb-5 text-lg font-semibold text-[#0a1628]">
        Pricing &amp; Rates
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 items-end">
        <FormField label="Hourly Rate">
          <SuffixInput defaultValue="$110.00" suffix="/hr" />
        </FormField>
        <FormField label="Markup Percentage">
          <SuffixInput defaultValue="25" suffix="%" />
        </FormField>
        <FormField label="Minimum Callout Fee">
          <SuffixInput defaultValue="$90.00" />
        </FormField>
        <FormField label="GST">
          <div className="flex h-9 items-center gap-3">
            <Switch
              defaultChecked
              className="data-[state=checked]:bg-green-600"
            />
            <span className="text-sm text-muted-foreground">
              10% (Included)
            </span>
          </div>
        </FormField>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-lg bg-[#ecfdf3] px-4 py-3">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
        <span className="text-sm text-[#0a1628]/80">
          These rates are used in all AI calculations and quote estimates.
        </span>
      </div>
    </Panel>
  );
}

function AIPreferences() {
  const [tone, setTone] = useState('Formal');

  return (
    <Panel>
      <h2 className="mb-5 text-lg font-semibold text-[#0a1628]">
        AI &amp; Preferences
      </h2>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-2">
        <FormField label="Tone of Voice">
          <div className="flex flex-wrap gap-3">
            {TONES.map(({ value, icon: Icon }) => {
              const selected = tone === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTone(value)}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                    selected
                      ? 'border-[#FFD9C9] bg-[#FFF0EA] text-[#0a1628]'
                      : 'border-[#eeeeee] bg-[#fafafa] text-[#0a1628]/80 hover:bg-[#FFF0EA]/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {value}
                </button>
              );
            })}
          </div>
        </FormField>

        <FormField label="AI Model Quality">
          <Select defaultValue="Balanced (Recommended)">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Balanced (Recommended)">
                Balanced (Recommended)
              </SelectItem>
              <SelectItem value="Fast">Fast</SelectItem>
              <SelectItem value="High Quality">High Quality</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Default Quote Language">
          <Select defaultValue="English (Australia)">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="English (Australia)">
                English (Australia)
              </SelectItem>
              <SelectItem value="English (US)">English (US)</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Default Currency">
          <Select defaultValue="AUD (Australian Dollar)">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AUD (Australian Dollar)">
                AUD (Australian Dollar)
              </SelectItem>
              <SelectItem value="USD (US Dollar)">USD (US Dollar)</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>
    </Panel>
  );
}

function TemplatesDefaults() {
  const template = 'Standard Repair';
  const [content, setContent] = useState(
    'Scope: [DESCRIPTION]\nLabour: [HOURS] hrs @ $[RATE]\nMaterials: [MATERIALS]\nTotal: $[TOTAL]',
  );

  return (
    <Panel>
      <h2 className="mb-5 text-lg font-semibold text-[#0a1628]">
        Templates Defaults
      </h2>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <FormField label="Default Template">
          <Select defaultValue={template}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Standard Repair">Standard Repair</SelectItem>
              <SelectItem value="Quote">Quote</SelectItem>
              <SelectItem value="Invoice">Invoice</SelectItem>
              <SelectItem value="Work Order">Work Order</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="AI Template Instructions">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full font-mono text-sm"
          />
        </FormField>
      </div>
    </Panel>
  );
}

function Notifications() {
  return (
    <Panel>
      <h2 className="mb-5 text-lg font-semibold text-[#0a1628]">
        Notifications
      </h2>
      <div className="space-y-3 text-sm text-muted-foreground">
        <p>No notification is currently enabled yet.</p>
        <p>Toggle settings below to activate them.</p>
      </div>
    </Panel>
  );
}

function Integrations() {
  const integrations = [
    { id: 'stripe', name: 'Stripe', desc: 'Payments & invoicing', icon: Zap },
    { id: 'mailgun', name: 'Mailgun', desc: 'Email delivery', icon: Mail },
    { id: 'xero', name: 'Xero', desc: 'Accounting sync', icon: FileText },
    {
      id: 'quickbooks',
      name: 'QuickBooks',
      desc: 'US accounting',
      icon: Briefcase,
    },
  ];

  return (
    <Panel>
      <h2 className="mb-5 text-lg font-semibold text-[#0a1628]">
        Integrations
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {integrations.map(({ id, name, desc, icon: Icon }) => (
          <div
            key={id}
            className="flex items-center gap-4 rounded-xl border border-[#eeeeee] p-5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FFF0EA]">
              <Icon className="h-6 w-6 text-[#FF4D00]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-[#0a1628]">
                {name}
              </div>
              <div className="truncate text-xs text-muted-foreground">
                {desc}
              </div>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-lg bg-[#0a1628] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0a1628]/90"
            >
              Connect
            </button>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-lg bg-[#FFF0EA] px-4 py-3">
        <Shield className="h-5 w-5 shrink-0 text-[#FF4D00]" />
        <span className="text-sm text-[#0a1628]/80">
          Connected integrations sync securely via OAuth. No API keys stored in
          plain text.
        </span>
      </div>
    </Panel>
  );
}

/* ---------- right panel ---------- */

function LivePreviewHeader() {
  return (
    <div className="rounded-xl border border-[#eeeeee] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#0a1628]">Live Preview</h3>
        <span className="rounded-md bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
          Live
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        See how your settings affect AI quotes.
      </p>
    </div>
  );
}

function SampleQuotePreview({ businessName }: { businessName: string }) {
  return (
    <div className="rounded-xl border border-green-100 bg-[#ecfdf3] p-5">
      <h3 className="mb-4 text-base font-semibold text-[#0a1628]">
        Sample Quote Preview
      </h3>

      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="font-bold text-[#0a1628]">{businessName}</div>
            <div className="text-xs text-muted-foreground">
              {PREVIEW.subtitle}
            </div>
          </div>
          <div className="shrink-0 text-right text-[11px] text-muted-foreground">
            <div>Quote ID: {PREVIEW.quoteId}</div>
            <div>{PREVIEW.date}</div>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-sm font-semibold text-[#0a1628]">Job Scope</div>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {PREVIEW.jobScope}
          </p>
        </div>

        <div className="mt-4 divide-y divide-[#eeeeee] border-t border-[#eeeeee] text-sm">
          <div className="flex items-center justify-between py-3">
            <span className="font-semibold text-[#0a1628]">
              Labour Estimate
            </span>
            <span className="font-semibold text-green-600">
              {PREVIEW.labour}
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="font-semibold text-[#0a1628]">Materials</span>
            <span className="font-semibold text-[#0a1628]">
              {PREVIEW.materials}
            </span>
          </div>
          <div className="flex items-center justify-between pt-3">
            <span className="font-semibold text-green-600">
              Total (inc. GST)
            </span>
            <span className="text-base font-bold text-green-600">
              {PREVIEW.total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemStatusCard() {
  return (
    <div className="rounded-xl border border-[#eeeeee] bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-[#0a1628]">
        System Status
      </h3>
      <div className="space-y-3">
        {SYSTEM_STATUS.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
              <span className="text-[#0a1628]/90">{item.label}</span>
            </div>
            <span className="text-sm text-green-600">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DangerZoneCard() {
  return (
    <div className="rounded-xl border border-[#eeeeee] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2 text-red-600">
        <Trash2 className="h-5 w-5" />
        <h3 className="text-base font-semibold">Danger Zone</h3>
      </div>
      <div className="text-sm font-semibold text-[#0a1628]">
        Reset all settings
      </div>
      <p className="mt-1 mb-4 text-sm text-muted-foreground">
        This will revert everything to default.
      </p>
      <button
        type="button"
        className="w-full rounded-lg border border-red-400 bg-white py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        Reset Settings
      </button>
    </div>
  );
}
