# Design System Documentation

## Overview

This design system provides a scalable, maintainable, and themeable foundation for building user interfaces using Tailwind CSS v4.

The system is organized around Design Tokens and Component Patterns.

Design tokens serve as the single source of truth for visual properties such as colors, typography, spacing, radius, shadows, motion, and layering.

---

# Architecture

## Directory Structure

```txt
src/
└── styles/
    ├── globals.css

    ├── tokens/
    │   ├── colors.css
    │   ├── typography.css
    │   ├── spacing.css
    │   ├── radius.css
    │   ├── shadows.css
    │   ├── motion.css
    │   └── z-index.css

    ├── themes/
    │   ├── light.css
    │   └── dark.css

    └── components/
        ├── typography.css
        ├── buttons.css
        ├── forms.css
        ├── cards.css
        ├── layouts.css
        └── animations.css
```

---

# Design Principles

## 1. Design Tokens First

All visual values must originate from design tokens.

Avoid hardcoded values.

Bad:

```tsx
<div className="bg-[#3b82f6]">
```

Good:

```tsx
<div className="bg-action-primary">
```

---

## 2. Semantic Tokens Over Primitive Tokens

Application code should consume semantic tokens whenever possible.

Bad:

```tsx
<div className="bg-primary-500">
```

Good:

```tsx
<div className="bg-action-primary">
```

This allows visual redesigns without changing component implementations.

---

## 3. Single Source of Truth

Every design value must be defined only once.

Bad:

```css
--primary-color: #3b82f6;
--button-color: #3b82f6;
```

Good:

```css
--primary-500: #3b82f6;

--action-primary: var(--primary-500);
```

---

## 4. Theme Driven Architecture

Themes modify semantic tokens only.

Primitive tokens must remain unchanged.

---

# Token Categories

## Colors

Location:

```txt
styles/tokens/colors.css
```

Contains:

- Primitive colors
- Tailwind token mappings

Examples:

```css
--primary-500
--neutral-900
--success-500
```

### Semantic Colors

Defined inside theme files.

Examples:

```css
--text-primary
--surface-primary
--border-default
--action-primary
--status-success
```

---

## Typography

Location:

```txt
styles/tokens/typography.css
```

Contains:

### Font Families

```css
--font-sans
--font-mono
```

### Headings

```css
--text-heading-1
--text-heading-2
--text-heading-3
--text-heading-4
--text-heading-5
--text-heading-6
```

### Body Text

```css
--text-body-lg
--text-body-md
--text-body-sm
--text-body-xs
```

### Display Text

```css
--text-display-xl
--text-display-lg
```

### Font Weights

```css
--font-weight-regular
--font-weight-medium
--font-weight-semibold
--font-weight-bold
```

---

## Spacing

Location:

```txt
styles/tokens/spacing.css
```

Spacing follows an 8px grid system.

Scale:

```txt
4px
8px
12px
16px
24px
32px
48px
64px
96px
128px
```

Examples:

```css
--spacing-4
--spacing-8
--spacing-16
```

Component spacing tokens:

```css
--button-padding-x-md
--card-padding-md
--modal-padding
```

---

## Radius

Location:

```txt
styles/tokens/radius.css
```

Examples:

```css
--radius-sm
--radius-md
--radius-lg
--radius-xl
```

Usage:

| Component | Radius    |
| --------- | --------- |
| Inputs    | radius-md |
| Buttons   | radius-md |
| Cards     | radius-lg |
| Dropdowns | radius-lg |
| Modals    | radius-xl |

---

## Shadows

Location:

```txt
styles/tokens/shadows.css
```

Examples:

```css
--shadow-xs
--shadow-sm
--shadow-md
--shadow-lg
--shadow-xl
```

Usage:

| Token     | Purpose   |
| --------- | --------- |
| shadow-xs | Buttons   |
| shadow-sm | Cards     |
| shadow-md | Tooltips  |
| shadow-lg | Dropdowns |
| shadow-xl | Modals    |

---

## Motion

Location:

```txt
styles/tokens/motion.css
```

Contains:

### Durations

```css
--duration-fast
--duration-normal
--duration-slow
```

### Easings

```css
--ease-standard
--ease-enter
--ease-exit
--ease-bounce
```

### Keyframes

```css
fade-in
fade-out
slide-up
slide-down
scale-in
scale-out
drop
```

---

## Z-Index

Location:

```txt
styles/tokens/z-index.css
```

Hierarchy:

```txt
1900 System
1800 Loading

1700 Notifications
1600 Toasts

1500 Drawers
1400 Modals
1300 Modal Backdrop

1200 Tooltips
1100 Popovers
1000 Dropdowns

300 Sidebar
200 Header
100 Sticky

0 Base
```

Rule:

Never use arbitrary z-index values.

Bad:

```css
z-index: 9999;
```

Good:

```css
z-index: var(--z-modal);
```

---

# Themes

## Light Theme

Location:

```txt
styles/themes/light.css
```

Responsible for mapping semantic tokens to light-mode values.

Example:

```css
--text-primary
--surface-primary
--action-primary
```

---

## Dark Theme

Location:

```txt
styles/themes/dark.css
```

Responsible for mapping semantic tokens to dark-mode values.

Example:

```css
.dark {
  --text-primary: var(--neutral-0);
}
```

---

# Component Layer

The component layer consumes design tokens.

Components should never define colors, spacing, shadows, or typography values directly.

---

## Typography Components

Location:

```txt
styles/components/typography.css
```

Available classes:

```txt
.display-xl
.display-lg

.h1
.h2
.h3
.h4
.h5
.h6

.body-lg
.body-md
.body-sm
.body-xs

.label-lg
.label-md
.label-sm

.caption
.overline
```

Example:

```tsx
<h1 className="h1">
  Dashboard
</h1>

<p className="body-md">
  Welcome back.
</p>
```

---

## Buttons

Location:

```txt
styles/components/buttons.css
```

Available classes:

```txt
.btn
.btn-sm
.btn-md
.btn-lg

.btn-primary
.btn-secondary
.btn-danger
```

Example:

```tsx
<button className="btn btn-md btn-primary">Save</button>
```

---

## Forms

Location:

```txt
styles/components/forms.css
```

Available classes:

```txt
.input
.label
.helper-text
.error-text
```

Example:

```tsx
<label className="label">
  Email
</label>

<input className="input" />
```

---

## Cards

Location:

```txt
styles/components/cards.css
```

Available classes:

```txt
.card
.card-header
.card-title
.card-content
.card-footer
```

---

## Layout Utilities

Location:

```txt
styles/components/layouts.css
```

Available utilities:

```txt
.page
.section

.stack-xs
.stack-sm
.stack-md
.stack-lg

.cluster

.center
```

---

# Tailwind Usage

The design system exposes semantic tokens through Tailwind.

Example:

```tsx
<div className="bg-surface-primary">
```

```tsx
<p className="text-text-primary">
```

```tsx
<div className="border-border-default">
```

```tsx
<button className="bg-action-primary">
```

---

# Adding New Colors

### Step 1

Add primitive token.

```css
--brand-purple-500: #7c3aed;
```

### Step 2

Map semantic token.

```css
--action-brand: var(--brand-purple-500);
```

### Step 3

Expose to Tailwind.

```css
--color-action-brand: var(--action-brand);
```

---

# Adding New Components

Rules:

1. Use existing tokens.
2. Never hardcode colors.
3. Never hardcode spacing.
4. Never hardcode radius.
5. Never hardcode shadows.
6. Support dark mode automatically through semantic tokens.

---

# Accessibility Standards

Requirements:

- Minimum touch target: 44px
- Visible focus states required
- Keyboard navigation supported
- WCAG AA contrast minimum
- Avoid using color as the only indicator of state

---

# Code Review Checklist

Before merging UI changes:

- No hardcoded colors
- No hardcoded spacing
- No hardcoded shadows
- No hardcoded radius
- No arbitrary z-index values
- Uses semantic tokens
- Supports dark mode
- Uses typography classes consistently
- Uses spacing scale consistently
- Accessible interactions implemented

---

# Versioning

Changes to design tokens should be treated as system-level changes.

Major token modifications must be documented and reviewed before release.

## Versioning Strategy

The design system follows Semantic Versioning (SemVer).

```txt
MAJOR.MINOR.PATCH

Example:

1.0.0
1.1.0
1.1.1
2.0.0
```

---

## Version Types

### Patch Release

Patch releases contain non-breaking changes.

Examples:

- Fix incorrect token value
- Fix component styling bug
- Improve documentation
- Add missing hover state
- Accessibility improvements
- Internal refactoring

```txt
1.0.0 → 1.0.1
```

---

### Minor Release

Minor releases contain backward-compatible additions.

Examples:

- Add new color tokens
- Add new typography variants
- Add new component variants
- Add new utility classes
- Add new animations
- Add new spacing tokens

```txt
1.0.0 → 1.1.0
```

Existing implementations must continue to work.

---

### Major Release

Major releases contain breaking changes.

Examples:

- Remove tokens
- Rename tokens
- Change semantic token meaning
- Remove component variants
- Modify component API
- Restructure theme architecture

```txt
1.0.0 → 2.0.0
```

Migration documentation is required for all major releases.

---

# Token Versioning Rules

## Safe Changes

These changes are allowed in minor releases.

### Add New Token

```css
--primary-700: #2557d6;
```

### Add New Semantic Token

```css
--action-secondary: var(--neutral-600);
```

### Add New Component Variant

```css
.btn-outline
```

---

## Breaking Changes

These changes require a major release.

### Removing Tokens

Bad:

```css
/* removed */

--primary-500
```

### Renaming Tokens

Bad:

```css
--primary-500
```

to

```css
--brand-primary
```

### Changing Semantic Meaning

Bad:

```css
--text-primary
```

Previously:

```css
--text-primary: black;
```

Now:

```css
--text-primary: blue;
```

This changes design intent and may affect the entire application.

---

# Deprecation Policy

Before removing a token:

### Release 1

Mark token as deprecated.

```css
/* @deprecated use --action-primary */

--primary-button-color
```

### Release 2

Notify consumers.

Document migration path.

### Release 3

Remove token.

This gives teams sufficient time to migrate.

---

# Component Versioning

## Non-Breaking

Examples:

- Add new button variant
- Add optional prop
- Improve styling
- Accessibility fixes

```txt
1.2.0 → 1.3.0
```

---

## Breaking

Examples:

- Remove prop
- Rename prop
- Change default behavior
- Remove variant

```txt
1.2.0 → 2.0.0
```

---

# Theme Versioning

Theme changes require special attention.

## Safe

```css
--action-primary: #3b82f6;
```

to

```css
--action-primary: #2f73e8;
```

Small visual adjustments.

---

## Breaking

```css
--surface-primary
```

changing from light background to dark background.

Large visual changes affecting layouts and contrast should be released as a major version.

---

# Release Process

## Patch Release

```txt
1.0.0 → 1.0.1
```

Requirements:

- Review
- Visual QA

---

## Minor Release

```txt
1.0.0 → 1.1.0
```

Requirements:

- Review
- Visual QA
- Documentation update
- Changelog update

---

## Major Release

```txt
1.0.0 → 2.0.0
```

Requirements:

- Architecture review
- Design review
- Documentation update
- Changelog update
- Migration guide
- Consumer validation

---

# Changelog Format

## Example

```md
# 1.2.0

## Added

- Added action-secondary token
- Added btn-outline variant

## Changed

- Improved modal shadow

## Deprecated

- primary-button-color

## Removed

None
```

---

# Ownership

Changes to the following require design system review:

- Color tokens
- Typography tokens
- Spacing scale
- Radius scale
- Shadow scale
- Motion tokens
- Theme mappings
- Shared component APIs

These are considered system-level changes and should not be modified without review.
