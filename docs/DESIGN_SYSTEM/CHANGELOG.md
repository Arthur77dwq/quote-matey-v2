# Changelog

All notable changes to the Design System will be documented in this file.

This project follows Semantic Versioning (SemVer).

Version format:

```txt
MAJOR.MINOR.PATCH
```

Example:

```txt
1.0.0
1.1.0
1.1.1
2.0.0
```

---

# [Unreleased]

## Added

- None

## Changed

- None

## Deprecated

- None

## Removed

- None

## Fixed

- None

---

# [1.0.0] - 2026-06-17

## Added

### Foundation Tokens

#### Colors

Added complete color token system.

Primitive tokens:

```txt
neutral-0
neutral-50
neutral-100
neutral-300
neutral-600
neutral-800
neutral-900
neutral-950

primary-400
primary-500
primary-600

success-100
success-500

warning-400
warning-500
warning-600

danger-500

info-100
info-900
```

Semantic tokens:

```txt
text-primary
text-secondary
text-muted
text-disabled
text-inverse

surface-primary
surface-secondary
surface-tertiary
surface-inverse

border-subtle
border-default
border-strong

action-primary

status-success
status-warning
status-danger
status-info
```

---

#### Typography

Added typography token system.

Display:

```txt
display-xl
display-lg
```

Headings:

```txt
heading-1
heading-2
heading-3
heading-4
heading-5
heading-6
```

Body:

```txt
body-lg
body-md
body-sm
body-xs
```

Labels:

```txt
label-lg
label-md
label-sm
```

Additional:

```txt
caption
overline
```

---

#### Spacing

Added spacing scale based on an 8px grid.

```txt
spacing-0
spacing-1
spacing-2
spacing-3
spacing-4
spacing-5
spacing-6
spacing-8
spacing-10
spacing-12
spacing-16
spacing-20
spacing-24
spacing-32
```

---

#### Radius

Added radius scale.

```txt
radius-none
radius-xs
radius-sm
radius-md
radius-lg
radius-xl
radius-2xl
radius-full
```

---

#### Shadows

Added elevation token system.

```txt
shadow-xs
shadow-sm
shadow-md
shadow-lg
shadow-xl
shadow-2xl
```

---

#### Motion

Added motion token system.

Durations:

```txt
duration-fast
duration-normal
duration-slow
duration-slower
```

Easing:

```txt
ease-standard
ease-enter
ease-exit
ease-bounce
ease-emphasized
```

Animations:

```txt
fade-in
fade-out
slide-up
slide-down
slide-left
slide-right
scale-in
scale-out
drop
```

---

#### Layering

Added z-index token hierarchy.

```txt
z-base
z-content

z-sticky
z-header
z-sidebar

z-dropdown
z-popover
z-tooltip

z-modal-backdrop
z-modal
z-drawer

z-toast
z-notification

z-loading
z-system
```

---

### Themes

Added:

```txt
Light Theme
Dark Theme
```

Theme architecture based on semantic tokens.

---

### Components

Added component layer.

Typography:

```txt
display-xl
display-lg

h1
h2
h3
h4
h5
h6

body-lg
body-md
body-sm
body-xs

label-lg
label-md
label-sm

caption
overline
```

Buttons:

```txt
btn
btn-primary
btn-secondary
btn-danger

btn-sm
btn-md
btn-lg
```

Forms:

```txt
input
label
helper-text
error-text
```

Cards:

```txt
card
card-header
card-title
card-content
card-footer
```

Layouts:

```txt
page
section

stack-xs
stack-sm
stack-md
stack-lg

cluster
center
```

---

### Documentation

Added:

```txt
DESIGN_SYSTEM.md
CONTRIBUTING.md
VERSIONING.md
CHANGELOG.md
```

---

## Changed

- Initial release.

---

## Deprecated

- None

---

## Removed

- None

---

## Fixed

- None

---

# Changelog Guidelines

## Added

New features.

Examples:

- New token
- New component
- New variant
- New utility

---

## Changed

Changes to existing behavior.

Examples:

- Updated token value
- Improved component implementation
- Theme refinements

---

## Deprecated

Features planned for removal.

Example:

```txt
Deprecated action-secondary-old.
Use action-secondary instead.
```

---

## Removed

Features removed from the design system.

Examples:

- Deleted token
- Deleted component
- Deleted variant

---

## Fixed

Bug fixes.

Examples:

- Accessibility improvements
- Focus state fixes
- Theme consistency fixes
- Responsive issues

---

# Release Workflow

Before every release:

1. Update CHANGELOG.md
2. Update version number
3. Update migration guides if needed
4. Verify documentation
5. Complete visual QA
6. Complete accessibility review

No release should be published without a changelog entry.
