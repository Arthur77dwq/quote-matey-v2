# Contributing Guide

## Purpose

This document defines the standards and workflow for contributing to the Design System.

The goal is to ensure consistency, maintainability, accessibility, and scalability across all design system assets.

All contributors must follow these guidelines before submitting changes.

---

# Design System Philosophy

The design system is built on the following hierarchy:

```txt
Design Tokens
    ↓
Themes
    ↓
Components
    ↓
Application Features
```

Application code must never bypass the design system.

---

# Before You Start

Before making changes, review:

- DESIGN_SYSTEM.md
- VERSIONING.md
- CHANGELOG.md

Understand:

- Existing tokens
- Existing component patterns
- Theme architecture
- Versioning rules

---

# Directory Ownership

## Tokens

Location:

```txt
styles/tokens/
```

Contains:

```txt
colors.css
typography.css
spacing.css
radius.css
shadows.css
motion.css
z-index.css
```

Responsibility:

- Define system-level design values
- Never contain component styles

---

## Themes

Location:

```txt
styles/themes/
```

Contains:

```txt
light.css
dark.css
```

Responsibility:

- Map semantic tokens
- Control theme behavior

---

## Components

Location:

```txt
styles/components/
```

Responsibility:

- Consume tokens
- Define reusable UI patterns

---

# Contribution Rules

## Rule 1: No Hardcoded Colors

Do not write:

```css
color: #3b82f6;
```

Use:

```css
color: var(--action-primary);
```

---

## Rule 2: No Hardcoded Spacing

Do not write:

```css
padding: 18px;
```

Use:

```css
padding: var(--spacing-4);
```

or

```css
padding: var(--card-padding-md);
```

---

## Rule 3: No Hardcoded Radius

Do not write:

```css
border-radius: 14px;
```

Use:

```css
border-radius: var(--radius-card);
```

---

## Rule 4: No Hardcoded Shadows

Do not write:

```css
box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
```

Use:

```css
box-shadow: var(--shadow-card);
```

---

## Rule 5: No Arbitrary Z-Index

Do not write:

```css
z-index: 9999;
```

Use:

```css
z-index: var(--z-modal);
```

---

## Rule 6: Theme Compatibility Required

Every UI change must support:

- Light mode
- Dark mode

Never use theme-specific values directly.

Bad:

```css
color: white;
```

Good:

```css
color: var(--text-primary);
```

---

# Adding New Tokens

## When To Add A Token

Add a new token only when:

- Existing tokens cannot satisfy the requirement
- The value will likely be reused
- The token represents a meaningful design decision

---

## When Not To Add A Token

Do not add tokens for one-off use cases.

Bad:

```css
--marketing-hero-special-padding
```

Good:

```css
--section-gap-lg
```

---

# Adding Colors

## Step 1

Add primitive token.

```css
--brand-purple-500: #7c3aed;
```

---

## Step 2

Create semantic mapping.

```css
--action-brand: var(--brand-purple-500);
```

---

## Step 3

Expose through Tailwind.

```css
--color-action-brand: var(--action-brand);
```

---

## Step 4

Document the addition.

Update:

- DESIGN_SYSTEM.md
- CHANGELOG.md

---

# Adding Typography

Add typography tokens in:

```txt
styles/tokens/typography.css
```

If reusable classes are required:

```txt
styles/components/typography.css
```

Document:

- Intended use
- Size
- Weight
- Responsive behavior

---

# Adding Components

Before creating a new component:

Ask:

1. Does an existing component solve the problem?
2. Can the component be extended?
3. Can composition solve the problem?

Only create a new component if reuse is expected.

---

# Component Requirements

Every component must:

- Use design tokens
- Support themes
- Be accessible
- Be responsive
- Be documented

---

# Accessibility Requirements

All UI changes must satisfy:

## Focus States

Interactive elements must show visible focus indicators.

Required:

```css
box-shadow: var(--shadow-focus);
```

---

## Keyboard Navigation

Users must be able to operate interfaces using a keyboard.

---

## Touch Targets

Minimum size:

```txt
44px × 44px
```

---

## Color Contrast

Must meet WCAG AA standards.

---

# Pull Request Checklist

Before submitting a pull request:

## Design Tokens

- No hardcoded colors
- No hardcoded spacing
- No hardcoded radius
- No hardcoded shadows
- No arbitrary z-index values

---

## Components

- Responsive
- Accessible
- Theme compatible
- Reusable

---

## Documentation

Updated if required:

- DESIGN_SYSTEM.md
- CHANGELOG.md

---

## Testing

Verified:

- Light theme
- Dark theme
- Desktop
- Tablet
- Mobile

---

# Naming Conventions

## Primitive Tokens

Pattern:

```txt
category-scale
```

Examples:

```txt
primary-500
neutral-100
success-500
```

---

## Semantic Tokens

Pattern:

```txt
purpose-state
```

Examples:

```txt
text-primary
surface-secondary
border-default
action-primary
status-success
```

---

## Component Classes

Pattern:

```txt
component-variant
```

Examples:

```txt
btn-primary
btn-secondary
card-header
card-footer
```

---

# Deprecation Process

Deprecated items must remain available for at least one release cycle.

Example:

```css
/* @deprecated use --action-primary */

--primary-button-color
```

Deprecation requires:

1. Documentation update
2. Changelog entry
3. Migration guidance

---

# Review Requirements

The following changes require design system review:

- Color tokens
- Typography tokens
- Spacing scale
- Radius scale
- Shadow scale
- Motion tokens
- Theme architecture
- Shared component APIs

These are considered system-level changes.

---

# Documentation Requirements

Every significant contribution must answer:

1. What changed?
2. Why was it needed?
3. What tokens were added or modified?
4. Is it breaking?
5. Does it require migration?

If the answer to any of these is yes, update the documentation accordingly.

---

# Definition Of Done

A contribution is complete when:

- Code follows design system rules
- Documentation is updated
- Accessibility requirements are met
- Theme compatibility is verified
- Responsive behavior is verified
- Review feedback is addressed
- Changelog is updated

Only then should a change be considered ready for release.
