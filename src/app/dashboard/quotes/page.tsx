'use client';

import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Ellipsis,
  FileDown,
  Filter,
  Layers,
  Pencil,
  Plus,
  Search,
  Send,
  Trash2,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

import {
  MATERIALS,
  QUOTE_TABS,
  QuoteRecord,
  QUOTES,
  QuoteStatus,
} from './data';

const statusStyles: Record<QuoteStatus, string> = {
  Draft: 'bg-[#E7F8EB] text-[#39A958]',
  Sent: 'bg-[#EAF1FF] text-[#3978DC]',
  Accepted: 'bg-[#E4F7E8] text-[#27A34D]',
  Open: 'bg-[#FFF1DE] text-[#F29A2E]',
};
function generateQuoteCopyId(quoteId: string) {
  return `${quoteId}-copy-${Date.now()}`;
}

type MaterialItem = { id: string; name: string; price: string };
type PricingRow = { label: string; value: string };

type QuoteSections = {
  jobScope: string;
  labourRate: string;
  labourHours: string;
  labourCost: string;
  materials: MaterialItem[];
  materialsTotal: string;
  pricingRows: PricingRow[];
  pricingTotal: string;
  customerMessage: string;
};

const DEFAULT_SECTIONS: QuoteSections = {
  jobScope:
    'Supply and install new tiles, shower, vanity and toilet in small bathroom. Includes waterproofing, plumbing, and cleanup.',
  labourRate: '2 × Plumbers @ $110/hr',
  labourHours: '12 – 16 hours',
  labourCost: '$1,320 – $1,760',
  materials: MATERIALS.map(([name, price], index) => ({
    id: `material-${index}`,
    name,
    price,
  })),
  materialsTotal: '$3,150 – $4,200',
  pricingRows: [
    { label: 'Labour', value: '$1,320 – $1,760' },
    { label: 'Materials', value: '$3,150 – $4,200' },
    { label: 'Sub Total (ex. GST)', value: '$4,470 – $5,960' },
    { label: 'GST (10%)', value: '$447 – $596' },
  ],
  pricingTotal: '$4,917 – $6,556',
  customerMessage:
    'Thanks for the opportunity!\nWe pride ourselves on quality workmanship and reliable service. If you have any questions, just let us know.',
};

const fieldClass =
  'w-full rounded-md border border-[#DFE3E8] bg-white px-2 py-1.5 text-[0.6875rem] text-[#20242A] outline-none focus:border-[#FF5A1F]';

function StatusBadge({ status }: { status: QuoteStatus }) {
  return (
    <span
      className={cn(
        'inline-flex min-w-14 items-center justify-center rounded-lg px-2.5 py-1 text-[0.6875rem] font-semibold',
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
}

function QuoteRow({
  quote,
  selected,
  menuOpen,
  onSelect,
  onDuplicate,
  onMarkSent,
  onToggleMenu,
}: {
  quote: QuoteRecord;
  selected: boolean;
  menuOpen: boolean;
  onSelect: () => void;
  onDuplicate: () => void;
  onMarkSent: () => void;
  onToggleMenu: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') onSelect();
      }}
      aria-pressed={selected}
      className={cn(
        'grid min-h-[5.5rem] w-full grid-cols-[minmax(10rem,1fr)_4rem_6.5rem_4.25rem_1.75rem] items-center gap-2 border-b border-[#E8EAED] px-3 text-left transition-colors min-[1450px]:grid-cols-[minmax(13rem,1fr)_4.75rem_7.5rem_5.25rem_1.75rem] min-[1450px]:gap-3',
        selected
          ? 'rounded-lg border border-[#FF8B5B] bg-[#FFF8F4] shadow-[0_0_0_1px_rgba(255,139,91,0.12)]'
          : 'hover:bg-neutral-50',
      )}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="relative size-17 shrink-0 overflow-hidden rounded-md bg-neutral-100">
          <Image
            src={quote.image}
            alt=""
            fill
            sizes="68px"
            className="object-cover"
          />
        </span>
        <span className="min-w-0">
          <strong className="block truncate text-[0.8125rem] font-semibold text-[#20242A]">
            {quote.title}
          </strong>
          <span className="mt-1 block text-[0.6875rem] text-[#68717D]">
            ID: {quote.jobId}
          </span>
          <span className="mt-0.5 block truncate text-[0.6875rem] text-[#68717D]">
            {quote.customer}
          </span>
        </span>
      </span>
      <StatusBadge status={quote.status} />
      <span className="text-center">
        <strong className="block text-[0.8125rem] font-semibold text-[#20242A]">
          {quote.price}
        </strong>
        <span className="mt-1 block text-[0.6875rem] text-[#68717D]">
          {quote.hours}
        </span>
      </span>
      <span className="text-right text-[0.6875rem] leading-5 text-[#68717D]">
        <span className="block">{quote.date}</span>
        <span className="block">{quote.time}</span>
      </span>
      <span className="relative flex justify-end">
        <button
          type="button"
          aria-label={`Actions for ${quote.title}`}
          aria-expanded={menuOpen}
          onClick={(event) => {
            event.stopPropagation();
            onToggleMenu();
          }}
          className="flex size-7 items-center justify-center rounded-md bg-white text-[#5E6670] shadow-sm transition hover:bg-[#F3F5F7]"
        >
          <Ellipsis className="size-4" />
        </button>
        {menuOpen && (
          <span className="absolute right-0 top-8 z-20 w-35 rounded-lg border border-[#E0E4E8] bg-white p-1 shadow-lg">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onSelect();
                onToggleMenu();
              }}
              className="w-full rounded-md px-2 py-1.5 text-left text-[0.6875rem] hover:bg-[#F5F7F9]"
            >
              Open quote
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onDuplicate();
                onToggleMenu();
              }}
              className="w-full rounded-md px-2 py-1.5 text-left text-[0.6875rem] hover:bg-[#F5F7F9]"
            >
              Duplicate
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onMarkSent();
                onToggleMenu();
              }}
              className="w-full rounded-md px-2 py-1.5 text-left text-[0.6875rem] hover:bg-[#F5F7F9]"
            >
              Mark as sent
            </button>
          </span>
        )}
      </span>
    </div>
  );
}

function SectionNumber({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex size-4 shrink-0 items-center justify-center rounded bg-[#68717D] text-[0.625rem] font-bold text-white">
      {children}
    </span>
  );
}

function DetailHeading({
  number,
  children,
  editing,
  onEdit,
}: {
  number: number;
  children: string;
  editing: boolean;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <SectionNumber>{number}</SectionNumber>
      <h3 className="text-[0.8125rem] font-semibold text-[#292D32]">
        {children}
      </h3>
      <button
        type="button"
        aria-label={editing ? `Cancel editing ${children}` : `Edit ${children}`}
        aria-pressed={editing}
        onClick={onEdit}
        className={cn(
          'flex size-5 items-center justify-center rounded transition hover:bg-[#F0F2F4] hover:text-[#4E5661]',
          editing ? 'bg-[#FFF1EA] text-[#FF5A1F]' : 'text-[#8A919B]',
        )}
      >
        {editing ? <X className="size-3" /> : <Pencil className="size-3" />}
      </button>
    </div>
  );
}

function EditorFooter({
  onCancel,
  onSave,
  saveDisabled = false,
}: {
  onCancel: () => void;
  onSave: () => void;
  saveDisabled?: boolean;
}) {
  return (
    <div className="mt-3 flex justify-end gap-2">
      <button
        type="button"
        onClick={onCancel}
        className="h-7 rounded-md border border-[#DFE3E8] px-3 text-[0.6875rem] font-semibold text-[#4E5661] hover:bg-[#F5F7F9]"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={onSave}
        disabled={saveDisabled}
        className="h-7 rounded-md bg-[#FF4F12] px-3 text-[0.6875rem] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Save
      </button>
    </div>
  );
}

function LabeledField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[0.625rem] font-semibold text-[#68717D]">
        {label}
      </span>
      {children}
    </label>
  );
}

function TextSectionEditor({
  label,
  value,
  onSave,
  onCancel,
}: {
  label: string;
  value: string;
  onSave: (value: string) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState(value);

  return (
    <div className="mt-2">
      <textarea
        aria-label={label}
        rows={5}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        className={cn(fieldClass, 'resize-none leading-[1.45]')}
      />
      <EditorFooter
        onCancel={onCancel}
        onSave={() => onSave(draft.trim())}
        saveDisabled={!draft.trim()}
      />
    </div>
  );
}

function LabourEditor({
  rate,
  hours,
  cost,
  onSave,
  onCancel,
}: {
  rate: string;
  hours: string;
  cost: string;
  onSave: (values: { rate: string; hours: string; cost: string }) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState({ rate, hours, cost });
  const update = (key: keyof typeof draft, value: string) =>
    setDraft((current) => ({ ...current, [key]: value }));

  return (
    <div className="mt-2 space-y-2">
      <LabeledField label="Crew & rate">
        <input
          value={draft.rate}
          onChange={(event) => update('rate', event.target.value)}
          className={fieldClass}
        />
      </LabeledField>
      <div className="grid grid-cols-2 gap-2">
        <LabeledField label="Hours">
          <input
            value={draft.hours}
            onChange={(event) => update('hours', event.target.value)}
            className={fieldClass}
          />
        </LabeledField>
        <LabeledField label="Labour cost">
          <input
            value={draft.cost}
            onChange={(event) => update('cost', event.target.value)}
            className={fieldClass}
          />
        </LabeledField>
      </div>
      <EditorFooter
        onCancel={onCancel}
        onSave={() =>
          onSave({
            rate: draft.rate.trim(),
            hours: draft.hours.trim(),
            cost: draft.cost.trim(),
          })
        }
        saveDisabled={
          !draft.rate.trim() || !draft.hours.trim() || !draft.cost.trim()
        }
      />
    </div>
  );
}

function MaterialsEditor({
  materials,
  total,
  onSave,
  onCancel,
}: {
  materials: MaterialItem[];
  total: string;
  onSave: (materials: MaterialItem[], total: string) => void;
  onCancel: () => void;
}) {
  const [rows, setRows] = useState(materials);
  const [draftTotal, setDraftTotal] = useState(total);

  const updateRow = (id: string, key: 'name' | 'price', value: string) =>
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, [key]: value } : row)),
    );
  const removeRow = (id: string) =>
    setRows((current) => current.filter((row) => row.id !== id));
  const addRow = () =>
    setRows((current) => [
      ...current,
      { id: crypto.randomUUID(), name: '', price: '' },
    ]);

  const cleaned = rows
    .filter((row) => row.name.trim())
    .map((row) => ({
      ...row,
      name: row.name.trim(),
      price: row.price.trim(),
    }));

  return (
    <div className="mt-2 space-y-2">
      {rows.map((row) => (
        <div
          key={row.id}
          className="grid grid-cols-[minmax(0,1fr)_7.5rem_1.75rem] items-center gap-2"
        >
          <input
            aria-label="Material name"
            placeholder="Material"
            value={row.name}
            onChange={(event) => updateRow(row.id, 'name', event.target.value)}
            className={fieldClass}
          />
          <input
            aria-label="Material price"
            placeholder="$0 – $0"
            value={row.price}
            onChange={(event) => updateRow(row.id, 'price', event.target.value)}
            className={fieldClass}
          />
          <button
            type="button"
            aria-label={`Remove ${row.name || 'material'}`}
            onClick={() => removeRow(row.id)}
            className="flex size-7 items-center justify-center rounded-md text-[#8A919B] hover:bg-[#FDECEC] hover:text-[#D93025]"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addRow}
        className="flex items-center gap-1.5 text-[0.6875rem] font-semibold text-[#FF5A1F]"
      >
        <Plus className="size-3.5" /> Add material
      </button>
      <LabeledField label="Total materials">
        <input
          value={draftTotal}
          onChange={(event) => setDraftTotal(event.target.value)}
          className={fieldClass}
        />
      </LabeledField>
      <EditorFooter
        onCancel={onCancel}
        onSave={() => onSave(cleaned, draftTotal.trim())}
        saveDisabled={!draftTotal.trim()}
      />
    </div>
  );
}

function PricingEditor({
  rows,
  total,
  onSave,
  onCancel,
}: {
  rows: PricingRow[];
  total: string;
  onSave: (rows: PricingRow[], total: string) => void;
  onCancel: () => void;
}) {
  const [draftRows, setDraftRows] = useState(rows);
  const [draftTotal, setDraftTotal] = useState(total);

  const updateRow = (label: string, value: string) =>
    setDraftRows((current) =>
      current.map((row) => (row.label === label ? { ...row, value } : row)),
    );

  return (
    <div className="mt-2 space-y-2">
      {draftRows.map((row) => (
        <LabeledField key={row.label} label={row.label}>
          <input
            value={row.value}
            onChange={(event) => updateRow(row.label, event.target.value)}
            className={fieldClass}
          />
        </LabeledField>
      ))}
      <LabeledField label="Total (inc. GST)">
        <input
          value={draftTotal}
          onChange={(event) => setDraftTotal(event.target.value)}
          className={fieldClass}
        />
      </LabeledField>
      <EditorFooter
        onCancel={onCancel}
        onSave={() =>
          onSave(
            draftRows.map((row) => ({ ...row, value: row.value.trim() })),
            draftTotal.trim(),
          )
        }
        saveDisabled={
          !draftTotal.trim() || draftRows.some((row) => !row.value.trim())
        }
      />
    </div>
  );
}

function QuoteActions({
  onCopy,
  onExport,
  onMarkSent,
}: {
  onCopy: () => void;
  onExport: () => void;
  onMarkSent: () => void;
}) {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="rounded-xl border border-[#E8EAED] bg-white p-3">
      <h3 className="mb-3 text-[0.8125rem] font-semibold">Actions</h3>
      <div className="space-y-2">
        <button
          type="button"
          onClick={onExport}
          className="flex h-8 w-full items-center justify-center gap-2 rounded-md bg-[#FF4F12] text-[0.6875rem] font-semibold text-white"
        >
          <FileDown className="size-3.5" /> Export PDF
        </button>
        <button
          type="button"
          onClick={onCopy}
          className="flex h-8 w-full items-center justify-center gap-2 rounded-md border border-[#DFE3E8] text-[0.6875rem] font-semibold"
        >
          <Copy className="size-3.5" /> Copy Quote
        </button>
        <button
          type="button"
          onClick={onMarkSent}
          className="flex h-8 w-full items-center justify-center gap-2 rounded-md border border-[#DFE3E8] text-[0.6875rem] font-semibold"
        >
          <Send className="size-3.5" /> Mark as Sent
        </button>
        <button
          type="button"
          onClick={() => setMoreOpen((current) => !current)}
          aria-expanded={moreOpen}
          className="flex h-8 w-full items-center justify-center gap-2 rounded-md border border-[#DFE3E8] text-[0.6875rem] font-semibold"
        >
          <Ellipsis className="size-3.5" /> More Actions
        </button>
        {moreOpen && (
          <p className="rounded-md border border-[#DFE3E8] bg-[#F8F9FA] p-2 text-[0.625rem] leading-4 text-[#68717D]">
            Archive, delete, share actions connect with quote backend later.
          </p>
        )}
      </div>
    </div>
  );
}

function QuoteHealth() {
  const items = [
    'Scope defined',
    'Labour estimated',
    'Materials added',
    'Pricing set',
    'Customer message',
  ];

  return (
    <div className="rounded-xl border border-[#E8EAED] bg-white p-3">
      <h3 className="mb-3 text-[0.8125rem] font-semibold">Quote Health</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center justify-between text-[0.625rem] text-[#535B66]"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-3 text-[#33B55C]" /> {item}
            </span>
            <CheckCircle2 className="size-3 text-[#33B55C]" />
          </li>
        ))}
      </ul>
      <p className="mt-4 text-center text-[0.625rem] font-semibold">
        100% Complete
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E8F4EB]">
        <div className="h-full w-full rounded-full bg-[#2DB153]" />
      </div>
    </div>
  );
}

function JobDetails({ quote }: { quote: QuoteRecord }) {
  const images = [
    '/images/LandingPageImages/mKkLAF31DUtBRHKXlDoILV9RDc.jpg',
    '/images/LandingPageImages/lSZuKptayJeB4Xcw10qjE7IisQw.png',
    '/images/plumber2.png',
  ];

  return (
    <div className="rounded-xl border border-[#E8EAED] bg-white p-3">
      <h3 className="mb-3 text-[0.8125rem] font-semibold">Job Details</h3>
      <dl className="space-y-3 text-[0.625rem]">
        <div>
          <dt className="font-semibold">Type</dt>
          <dd className="mt-0.5 text-[#68717D]">{quote.type}</dd>
        </div>
        <div>
          <dt className="font-semibold">Property</dt>
          <dd className="mt-0.5 text-[#68717D]">{quote.property}</dd>
        </div>
        <div>
          <dt className="font-semibold">Location</dt>
          <dd className="mt-0.5 leading-4 text-[#68717D]">{quote.location}</dd>
        </div>
      </dl>
      <p className="mt-3 text-[0.625rem] font-semibold">Photos</p>
      <div className="mt-2 grid grid-cols-3 gap-1.5">
        {images.map((image, index) => (
          <div
            key={image}
            className="relative aspect-square overflow-hidden rounded-md bg-neutral-100"
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="60px"
              className="object-cover"
            />
            {index === 2 && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/35 text-[0.6875rem] font-semibold text-white">
                +2
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function QuoteDetails({
  quote,
  onBack,
  onCopy,
  onDuplicate,
  onExport,
  onMarkSent,
  onUpdateName,
  sections,
  onUpdateSections,
}: {
  quote: QuoteRecord;
  onBack: () => void;
  onCopy: () => void;
  onDuplicate: () => void;
  onExport: () => void;
  onMarkSent: () => void;
  onUpdateName: (name: string) => void;
  sections: QuoteSections;
  onUpdateSections: (patch: Partial<QuoteSections>) => void;
}) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(quote.title);
  const [activeDetailTab, setActiveDetailTab] = useState('Summary');
  const [topMenuOpen, setTopMenuOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<number | null>(null);
  const topMenuRef = useRef<HTMLDivElement>(null);
  const hasUnsavedChanges = name.trim() !== quote.title;

  const toggleSection = (section: number) =>
    setEditingSection((current) => (current === section ? null : section));
  const closeEditor = () => setEditingSection(null);
  const saveSection = (patch: Partial<QuoteSections>, message: string) => {
    onUpdateSections(patch);
    setEditingSection(null);
    toast.success(message);
  };

  useEffect(() => {
    const closeTopMenu = (event: MouseEvent) => {
      if (!topMenuRef.current?.contains(event.target as Node)) {
        setTopMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', closeTopMenu);
    return () => document.removeEventListener('mousedown', closeTopMenu);
  }, []);

  return (
    <section className="flex h-full min-w-0 flex-col bg-[#FCFCFD]">
      <div className="relative flex h-13 shrink-0 items-center justify-between border-b border-[#E8EAED] px-5">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-[0.6875rem] font-medium text-[#4E5661]"
        >
          <ArrowLeft className="size-3.5" /> Back to quotes
        </button>
        <div ref={topMenuRef} className="flex gap-2">
          <button
            type="button"
            onClick={onDuplicate}
            className="flex h-8 items-center gap-2 rounded-md border border-[#DFE3E8] px-3 text-[0.6875rem] font-semibold"
          >
            <Layers className="size-3.5" /> Duplicate
          </button>
          <button
            type="button"
            onClick={() => setTopMenuOpen((current) => !current)}
            aria-expanded={topMenuOpen}
            className="flex size-8 items-center justify-center rounded-md border border-[#DFE3E8]"
          >
            <Ellipsis className="size-4" />
          </button>
          {topMenuOpen && (
            <div className="absolute right-5 top-11 z-20 w-40 rounded-lg border border-[#DFE3E8] bg-white p-1 shadow-lg">
              <button
                type="button"
                onClick={onCopy}
                className="w-full rounded-md px-3 py-2 text-left text-[0.6875rem] hover:bg-[#F5F7F9]"
              >
                Copy quote
              </button>
              <button
                type="button"
                onClick={onExport}
                className="w-full rounded-md px-3 py-2 text-left text-[0.6875rem] hover:bg-[#F5F7F9]"
              >
                Export quote
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 border-b border-[#E8EAED] bg-white px-5 pt-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              {isEditingName ? (
                <input
                  autoFocus
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') {
                      setName(quote.title);
                      setIsEditingName(false);
                    }
                  }}
                  className="h-7 w-55 rounded-md border border-[#C9D0D7] px-2 text-[1rem] font-semibold text-[#20242A] outline-none focus:border-[#FF5A1F]"
                />
              ) : (
                <h2 className="text-[1rem] font-semibold text-[#20242A]">
                  {quote.title}
                </h2>
              )}
              <button
                type="button"
                aria-label="Edit quote name"
                onClick={() => setIsEditingName(true)}
                className="text-[#9299A3] transition hover:text-[#4E5661]"
              >
                <Pencil className="size-3.5" />
              </button>
            </div>
            <p className="mt-2 flex items-center gap-3 text-[0.6875rem] text-[#68717D]">
              <span>Job ID: {quote.jobId}</span>
              <span className="h-3 w-px bg-[#D9DDE2]" />
              <span>Created: Today, 10:24 AM</span>
              <span className="h-3 w-px bg-[#D9DDE2]" />
              <span>Valid for 30 days</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {hasUnsavedChanges && (
              <button
                type="button"
                onClick={() => {
                  onUpdateName(name.trim());
                  setIsEditingName(false);
                }}
                disabled={!name.trim()}
                className="rounded-md bg-[#FF4F12] px-3 py-2 text-[0.6875rem] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Save updates
              </button>
            )}
            <button className="rounded-md bg-[#E7F8EB] px-3 py-2 text-[0.6875rem] font-semibold text-[#36A657]">
              {quote.status}⌄
            </button>
          </div>
        </div>
        <div className="mt-5 flex gap-8 text-[0.6875rem] font-medium text-[#5F6772]">
          {['Summary', 'Versions (2)', 'Activity', 'Details'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveDetailTab(tab)}
              className={cn(
                'border-b-2 px-1 pb-3',
                activeDetailTab === tab
                  ? 'border-[#FF5A1F] font-semibold text-[#FF5A1F]'
                  : 'border-transparent',
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeDetailTab === 'Summary' ? (
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_10.5rem] gap-3 overflow-y-auto p-3">
          <div className="overflow-hidden rounded-xl border border-[#E8EAED] bg-white">
            <div className="border-b border-[#E8EAED] p-3">
              <DetailHeading
                number={1}
                editing={editingSection === 1}
                onEdit={() => toggleSection(1)}
              >
                Job Scope
              </DetailHeading>
              {editingSection === 1 ? (
                <TextSectionEditor
                  label="Job scope"
                  value={sections.jobScope}
                  onCancel={closeEditor}
                  onSave={(jobScope) =>
                    saveSection({ jobScope }, 'Job scope updated.')
                  }
                />
              ) : (
                <p className="mt-2 text-[0.6875rem] leading-[1.45] text-[#4E5661]">
                  {sections.jobScope}
                </p>
              )}
            </div>

            <div className="border-b border-[#E8EAED] p-3">
              <DetailHeading
                number={2}
                editing={editingSection === 2}
                onEdit={() => toggleSection(2)}
              >
                Labour Estimate
              </DetailHeading>
              {editingSection === 2 ? (
                <LabourEditor
                  rate={sections.labourRate}
                  hours={sections.labourHours}
                  cost={sections.labourCost}
                  onCancel={closeEditor}
                  onSave={({ rate, hours, cost }) =>
                    saveSection(
                      {
                        labourRate: rate,
                        labourHours: hours,
                        labourCost: cost,
                      },
                      'Labour estimate updated.',
                    )
                  }
                />
              ) : (
                <div className="mt-2 flex items-center justify-between text-[0.6875rem]">
                  <span>{sections.labourRate}</span>
                  <span className="text-right">
                    <strong className="block text-[#2FAE54]">
                      {sections.labourHours}
                    </strong>
                    <span className="mt-1 block font-semibold">
                      {sections.labourCost}
                    </span>
                  </span>
                </div>
              )}
            </div>

            <div className="border-b border-[#E8EAED] p-3">
              <DetailHeading
                number={3}
                editing={editingSection === 3}
                onEdit={() => toggleSection(3)}
              >
                Materials
              </DetailHeading>
              {editingSection === 3 ? (
                <MaterialsEditor
                  materials={sections.materials}
                  total={sections.materialsTotal}
                  onCancel={closeEditor}
                  onSave={(materials, materialsTotal) =>
                    saveSection(
                      { materials, materialsTotal },
                      'Materials updated.',
                    )
                  }
                />
              ) : (
                <>
                  <div className="mt-2 space-y-2">
                    {sections.materials.map((material) => (
                      <div
                        key={material.id}
                        className="flex items-center justify-between text-[0.6875rem]"
                      >
                        <span className="flex items-center gap-2 text-[#4E5661]">
                          <span className="grid size-3 grid-cols-2 gap-px">
                            <i className="rounded-[1px] bg-[#8A929D]" />
                            <i className="rounded-[1px] bg-[#8A929D]" />
                            <i className="rounded-[1px] bg-[#8A929D]" />
                            <i className="rounded-[1px] bg-[#8A929D]" />
                          </span>
                          {material.name}
                        </span>
                        <strong>{material.price}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-[#EEF0F2] pt-3 text-[0.6875rem] font-semibold">
                    <span>Total Materials</span>
                    <span className="text-[#2FAE54]">
                      {sections.materialsTotal}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="border-b border-[#E8EAED] p-3">
              <DetailHeading
                number={4}
                editing={editingSection === 4}
                onEdit={() => toggleSection(4)}
              >
                Pricing Summary
              </DetailHeading>
              {editingSection === 4 ? (
                <PricingEditor
                  rows={sections.pricingRows}
                  total={sections.pricingTotal}
                  onCancel={closeEditor}
                  onSave={(pricingRows, pricingTotal) =>
                    saveSection(
                      { pricingRows, pricingTotal },
                      'Pricing summary updated.',
                    )
                  }
                />
              ) : (
                <div className="mt-2 space-y-1.5 text-[0.6875rem]">
                  {sections.pricingRows.map((row) => (
                    <div key={row.label} className="flex justify-between">
                      <span>{row.label}</span>
                      <strong>{row.value}</strong>
                    </div>
                  ))}
                  <div className="flex justify-between pt-1 font-semibold text-[#2FAE54]">
                    <span>Total (inc. GST)</span>
                    <span>{sections.pricingTotal}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-3">
              <DetailHeading
                number={5}
                editing={editingSection === 5}
                onEdit={() => toggleSection(5)}
              >
                Customer Message
              </DetailHeading>
              {editingSection === 5 ? (
                <TextSectionEditor
                  label="Customer message"
                  value={sections.customerMessage}
                  onCancel={closeEditor}
                  onSave={(customerMessage) =>
                    saveSection(
                      { customerMessage },
                      'Customer message updated.',
                    )
                  }
                />
              ) : (
                <p className="mt-2 whitespace-pre-line text-[0.6875rem] leading-[1.55] text-[#4E5661]">
                  {sections.customerMessage}
                </p>
              )}
            </div>
          </div>

          <aside className="space-y-3">
            <QuoteActions {...{ onCopy, onExport, onMarkSent }} />
            <QuoteHealth />
            <JobDetails quote={quote} />
          </aside>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 items-center justify-center p-6">
          <div className="max-w-sm text-center">
            <h3 className="text-sm font-semibold text-[#20242A]">
              {activeDetailTab}
            </h3>
            <p className="mt-2 text-xs leading-5 text-[#68717D]">
              {activeDetailTab === 'Versions (2)' &&
                'Version 2 is current. Version history loads from saved quote records later.'}
              {activeDetailTab === 'Activity' &&
                'No recent activity for this mock quote.'}
              {activeDetailTab === 'Details' &&
                'Quote metadata, customer details, job details show here when backend connects.'}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRecord[]>(QUOTES);
  const [selectedId, setSelectedId] = useState(QUOTES[0].id);
  const [activeTab, setActiveTab] = useState('All Quotes');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('All Status');
  const [quoteType, setQuoteType] = useState('All Types');
  const [sortOrder, setSortOrder] = useState('Date: Newest');
  const [showFilters, setShowFilters] = useState(false);
  const [detailOpen, setDetailOpen] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  // Per-quote editable sections (UI only until the backend is connected)
  const [sectionsById, setSectionsById] = useState<
    Record<string, QuoteSections>
  >({});
  const pageSize = 5;

  const filteredQuotes = useMemo(() => {
    return quotes.filter((quote) => {
      const matchesTab =
        activeTab === 'All Quotes' ||
        (activeTab !== 'Archived' && quote.status === activeTab);
      const matchesStatus = status === 'All Status' || quote.status === status;
      const matchesType =
        quoteType === 'All Types' || quote.type.includes(quoteType);
      const normalizedQuery = query.trim().toLowerCase();
      const matchesQuery =
        !normalizedQuery ||
        quote.title.toLowerCase().includes(normalizedQuery) ||
        quote.customer.toLowerCase().includes(normalizedQuery) ||
        quote.jobId.toLowerCase().includes(normalizedQuery);

      return matchesTab && matchesStatus && matchesType && matchesQuery;
    });
  }, [activeTab, query, quoteType, quotes, status]);

  const visibleQuotes = useMemo(() => {
    return [...filteredQuotes].sort((first, second) => {
      if (sortOrder === 'Date: Oldest')
        return first.jobId.localeCompare(second.jobId);
      return second.jobId.localeCompare(first.jobId);
    });
  }, [filteredQuotes, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(visibleQuotes.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedQuotes = visibleQuotes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const selectedQuote =
    quotes.find((quote) => quote.id === selectedId) ?? quotes[0] ?? QUOTES[0];

  const selectedSections = sectionsById[selectedQuote.id] ?? DEFAULT_SECTIONS;

  const updateSelectedSections = (patch: Partial<QuoteSections>) => {
    setSectionsById((current) => ({
      ...current,
      [selectedQuote.id]: {
        ...(current[selectedQuote.id] ?? DEFAULT_SECTIONS),
        ...patch,
      },
    }));
  };

  const markSelectedQuoteAsSent = () => {
    if (!selectedQuote || selectedQuote.status === 'Sent') {
      toast.info('This quote is already marked as sent.');
      return;
    }

    setQuotes((current) =>
      current.map((quote) =>
        quote.id === selectedQuote.id ? { ...quote, status: 'Sent' } : quote,
      ),
    );
    toast.success('Quote marked as sent.');
  };

  const markQuoteAsSent = (id: string) => {
    const quote = quotes.find((item) => item.id === id);
    if (!quote || quote.status === 'Sent') {
      toast.info('This quote is already marked as sent.');
      return;
    }

    setQuotes((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: 'Sent' } : item,
      ),
    );
    toast.success('Quote marked as sent.');
  };

  const duplicateQuote = (quote: QuoteRecord) => {
    const copy: QuoteRecord = {
      ...quote,
      id: generateQuoteCopyId(quote.id),
      jobId: `${quote.jobId}-COPY`,
      title: `Copy of ${quote.title}`,
      status: 'Draft',
      date: 'Today',
      time: 'Now',
    };

    setQuotes((current) => [copy, ...current]);
    setSectionsById((current) => ({
      ...current,
      [copy.id]: current[quote.id] ?? DEFAULT_SECTIONS,
    }));
    setSelectedId(copy.id);
    setActiveTab('All Quotes');
    setPage(1);
    toast.success('Quote duplicated as a draft.');
  };

  const duplicateSelectedQuote = () => {
    if (selectedQuote) duplicateQuote(selectedQuote);
  };

  const updateSelectedQuoteName = (name: string) => {
    if (!selectedQuote || !name) return;

    setQuotes((current) =>
      current.map((quote) =>
        quote.id === selectedQuote.id ? { ...quote, title: name } : quote,
      ),
    );
    toast.success('Quote updates saved.');
  };

  const clearFilters = () => {
    setQuery('');
    setStatus('All Status');
    setQuoteType('All Types');
    setSortOrder('Date: Newest');
    setActiveTab('All Quotes');
    setPage(1);
  };

  const copySelectedQuote = async () => {
    if (!selectedQuote) return;

    const summary = `${selectedQuote.title} (${selectedQuote.jobId}) — ${selectedQuote.price}`;
    try {
      await navigator.clipboard.writeText(summary);
      toast.success('Quote summary copied.');
    } catch {
      toast.info('Copy is only available in a secure browser context.');
    }
  };

  const exportSelectedQuote = () => {
    toast.info(
      'PDF export will be connected when quotes are stored in the backend.',
    );
  };

  return (
    <div
      className={cn(
        'grid h-[calc(100vh-5rem)] min-h-0 grid-cols-1 overflow-hidden bg-white',
        detailOpen &&
          'min-[1200px]:grid-cols-[minmax(32rem,1.08fr)_minmax(29rem,0.92fr)]',
      )}
    >
      <section className="flex min-h-0 flex-col border-r border-[#E3E6EA] bg-white">
        <div className="shrink-0 border-b border-[#E8EAED] px-6 pt-3">
          <div className="flex gap-4 overflow-x-auto min-[1450px]:gap-7">
            {QUOTE_TABS.map((tab) => (
              <button
                key={tab.label}
                type="button"
                onClick={() => {
                  setActiveTab(tab.label);
                  setPage(1);
                }}
                className={cn(
                  'flex h-12 shrink-0 items-center gap-2 border-b-2 px-1 text-[0.6875rem] font-semibold',
                  activeTab === tab.label
                    ? 'border-[#FF5A1F] text-[#FF5A1F]'
                    : 'border-transparent text-[#4E5661]',
                )}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className="rounded-full bg-[#F2F3F5] px-1.5 py-0.5 text-[0.625rem] text-[#5F6772]">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 px-6 py-4">
          <label className="flex h-9 min-w-45 flex-1 items-center gap-2 rounded-md border border-[#DFE3E8] px-3">
            <Search className="size-4 text-[#818995]" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search quotes..."
              className="min-w-0 flex-1 bg-transparent text-[0.6875rem] outline-none placeholder:text-[#9299A3]"
            />
          </label>
          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
            className="h-9 rounded-md border border-[#DFE3E8] bg-white px-2 text-[0.6875rem] font-medium outline-none"
          >
            <option>All Status</option>
            <option>Draft</option>
            <option>Sent</option>
            <option>Accepted</option>
            <option>Open</option>
          </select>
          <select
            value={quoteType}
            onChange={(event) => {
              setQuoteType(event.target.value);
              setPage(1);
            }}
            className="h-9 rounded-md border border-[#DFE3E8] bg-white px-2 text-[0.6875rem] font-medium outline-none"
          >
            <option>All Types</option>
            <option>Bathroom</option>
            <option>Kitchen</option>
            <option>Repair</option>
          </select>
          <select
            value={sortOrder}
            onChange={(event) => {
              setSortOrder(event.target.value);
              setPage(1);
            }}
            className="h-9 rounded-md border border-[#DFE3E8] bg-white px-2 text-[0.6875rem] font-medium outline-none"
          >
            <option>Date: Newest</option>
            <option>Date: Oldest</option>
          </select>
          <button
            type="button"
            onClick={() => setShowFilters((current) => !current)}
            aria-expanded={showFilters}
            className="flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md border border-[#DFE3E8] px-3 text-[0.6875rem] font-semibold"
          >
            <Filter className="size-3.5" /> Filters
          </button>
          {showFilters && (
            <div className="flex w-full items-center justify-between rounded-md bg-[#F7F8FA] px-3 py-2 text-[0.6875rem] text-[#5F6772]">
              <span>Use search, status, type, and date to refine quotes.</span>
              <button
                type="button"
                onClick={clearFilters}
                className="font-semibold text-[#FF5A1F]"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6">
          {paginatedQuotes.length ? (
            paginatedQuotes.map((quote) => (
              <QuoteRow
                key={quote.id}
                quote={quote}
                selected={selectedId === quote.id}
                menuOpen={menuOpenId === quote.id}
                onSelect={() => {
                  setSelectedId(quote.id);
                  setDetailOpen(true);
                }}
                onDuplicate={() => duplicateQuote(quote)}
                onMarkSent={() => markQuoteAsSent(quote.id)}
                onToggleMenu={() =>
                  setMenuOpenId((current) =>
                    current === quote.id ? null : quote.id,
                  )
                }
              />
            ))
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-[#7B838E]">
              No quotes match these filters.
            </div>
          )}
        </div>

        <footer className="flex h-12 shrink-0 items-center justify-between border-t border-[#E8EAED] px-6 text-[0.6875rem] text-[#68717D]">
          <span>
            Showing{' '}
            {visibleQuotes.length ? (currentPage - 1) * pageSize + 1 : 0} to{' '}
            {Math.min(currentPage * pageSize, visibleQuotes.length)} of{' '}
            {visibleQuotes.length} quotes
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronLeft className="size-4" />
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  className={cn(
                    'flex size-7 items-center justify-center rounded-md',
                    currentPage === pageNumber &&
                      'border border-[#FF8B5B] bg-[#FFF7F3] font-semibold text-[#FF5A1F]',
                  )}
                >
                  {pageNumber}
                </button>
              ),
            )}
            <button
              type="button"
              aria-label="Next page"
              disabled={currentPage === totalPages}
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              className="disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </footer>
      </section>

      <div className={cn('hidden min-h-0', detailOpen && 'min-[1200px]:block')}>
        <QuoteDetails
          key={selectedQuote.id}
          quote={selectedQuote}
          onBack={() => setDetailOpen(false)}
          onCopy={copySelectedQuote}
          onDuplicate={duplicateSelectedQuote}
          onExport={exportSelectedQuote}
          onMarkSent={markSelectedQuoteAsSent}
          onUpdateName={updateSelectedQuoteName}
          sections={selectedSections}
          onUpdateSections={updateSelectedSections}
        />
      </div>
    </div>
  );
}
