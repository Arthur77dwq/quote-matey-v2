# Design System

## Principles

### Design Tokens First

Components should never use raw color values.

❌ Avoid:

```tsx
className = 'bg-blue-500 text-white';
```

✅ Prefer:

```tsx
className = 'bg-primary text-primary-foreground';
```

or

```tsx
className = 'bg-action-primary text-white';
```

### Semantic Over Primitive

Use semantic tokens in application code.

| Primitive   | Semantic       |
| ----------- | -------------- |
| blue-500    | action-primary |
| neutral-900 | text-primary   |
| neutral-600 | text-secondary |
| red-500     | status-danger  |

---

# Foundations

## Colors

### Neutral

| Token       | Value   |
| ----------- | ------- |
| neutral-0   | #FFFFFF |
| neutral-50  | #EDF1F4 |
| neutral-100 | #DDE5ED |
| neutral-300 | #BABABA |
| neutral-600 | #4D585F |
| neutral-800 | #323232 |
| neutral-900 | #1D1D1D |
| neutral-950 | #000000 |

### Primary

| Token       | Value   |
| ----------- | ------- |
| primary-400 | #5290F4 |
| primary-500 | #3B82F6 |
| primary-600 | #406AE4 |

### Success

| Token       | Value   |
| ----------- | ------- |
| success-100 | #8AE389 |
| success-500 | #10B981 |

### Danger

| Token      | Value   |
| ---------- | ------- |
| danger-500 | #F51C23 |

### Warning

| Token       | Value   |
| ----------- | ------- |
| warning-400 | #FDBB6E |
| warning-500 | #FF8B06 |
| warning-600 | #FF530A |

### Info

| Token    | Value   |
| -------- | ------- |
| info-100 | #E2F5FF |
| info-900 | #102E60 |

---

## Semantic Colors

### Text

| Token          | Usage                    |
| -------------- | ------------------------ |
| text-primary   | Main content             |
| text-secondary | Supporting content       |
| text-muted     | Placeholder, helper text |
| text-inverse   | Text on dark surfaces    |

### Surfaces

| Token             | Usage             |
| ----------------- | ----------------- |
| surface-primary   | Page background   |
| surface-secondary | Cards             |
| surface-tertiary  | Elevated surfaces |

### Borders

| Token          | Usage               |
| -------------- | ------------------- |
| border-default | Standard border     |
| border-subtle  | Low emphasis border |
| border-focus   | Focus ring          |

### Actions

| Token                | Usage            |
| -------------------- | ---------------- |
| action-primary       | Main CTA         |
| action-primary-hover | CTA hover        |
| action-secondary     | Secondary action |

### Status

| Token          | Usage               |
| -------------- | ------------------- |
| status-success | Success state       |
| status-warning | Warning state       |
| status-danger  | Error state         |
| status-info    | Informational state |

---

# Typography

## Font Family

### Sans

```css
font-sans
```

Geist

### Mono

```css
font-mono
```

Geist Mono

---

## Type Scale

| Token     | Size | Usage          |
| --------- | ---- | -------------- |
| text-xs   | 12px | Labels         |
| text-sm   | 14px | Secondary text |
| text-base | 16px | Body text      |
| text-lg   | 18px | Large body     |
| text-xl   | 20px | Section title  |
| text-2xl  | 24px | Page title     |
| text-3xl  | 30px | Hero title     |

---

## Font Weights

| Weight   | Value |
| -------- | ----- |
| Regular  | 400   |
| Medium   | 500   |
| Semibold | 600   |
| Bold     | 700   |

---

# Spacing

Based on an 8px grid.

| Token | Value |
| ----- | ----- |
| 1     | 4px   |
| 2     | 8px   |
| 3     | 12px  |
| 4     | 16px  |
| 6     | 24px  |
| 8     | 32px  |
| 12    | 48px  |
| 16    | 64px  |
| 24    | 96px  |

### Usage

| Pattern         | Value |
| --------------- | ----- |
| Button padding  | 16px  |
| Card padding    | 24px  |
| Section spacing | 32px  |
| Page spacing    | 48px  |

---

# Border Radius

| Token     | Usage  |
| --------- | ------ |
| radius-sm | Badges |
| radius-md | Inputs |
| radius-lg | Cards  |
| radius-xl | Modals |

---

# Shadows

| Token     | Usage                |
| --------- | -------------------- |
| shadow-sm | Buttons              |
| shadow-md | Dropdowns            |
| shadow-lg | Dialogs              |
| shadow-xl | Full-screen overlays |

---

# Motion

## Durations

| Token           | Value |
| --------------- | ----- |
| duration-fast   | 150ms |
| duration-normal | 250ms |
| duration-slow   | 400ms |

---

## Easing

### Standard

```css
cubic-bezier(0.4, 0, 0.2, 1)
```

### Bounce

```css
cubic-bezier(0.34, 1.56, 0.64, 1)
```

---

# Layering

| Token      | Value |
| ---------- | ----- |
| z-dropdown | 1000  |
| z-sticky   | 1100  |
| z-modal    | 1200  |
| z-popover  | 1300  |
| z-toast    | 1400  |
| z-tooltip  | 1500  |

Never use arbitrary z-index values.

---

# Accessibility

## Rules

- Minimum body text: 14px
- Interactive targets: 44px minimum
- Focus indicators required
- Keyboard navigation supported
- WCAG AA color contrast minimum

---

# Components

## Button

### Variants

- Primary
- Secondary
- Outline
- Ghost
- Danger

### Sizes

- Small
- Medium
- Large

### States

- Default
- Hover
- Active
- Focus
- Disabled
- Loading

---

## Input

### States

- Default
- Focus
- Error
- Disabled
- Read Only

---

## Card

### Variants

- Default
- Elevated
- Interactive

---

## Modal

### States

- Open
- Closed
- Loading

---

# Naming Conventions

## Design Tokens

```txt
primary-500
neutral-100
success-500
```

## Semantic Tokens

```txt
text-primary
surface-primary
action-primary
status-danger
```

## Components

```txt
button
input
card
modal
```

---

# Do

✅ Use semantic tokens

✅ Reuse existing components

✅ Support dark mode

✅ Ensure accessibility

---

# Don't

❌ Hardcode colors

❌ Use arbitrary spacing values

❌ Use arbitrary z-index values

❌ Create component-specific colors without justification
