# SEO Development Guide

## Purpose

This guide defines the SEO standards that must be followed when building new pages and features in QuoteMatey.

The goal is to ensure every page is discoverable, indexable, shareable, and optimized for search engines without requiring SEO rework later.

---

## SEO Architecture

The project uses:

- Centralized SEO configuration (`src/config/seo.ts`)
- Metadata utility (`src/lib/seo.ts`)
- Global metadata configuration (`app/layout.tsx`)
- Open Graph defaults
- Twitter Card defaults
- Canonical URL support
- Environment-based indexing rules

Developers should use the provided SEO utilities rather than manually creating metadata whenever possible.

---

## Creating a New Page

Every public page should have metadata.

#### Example

```ts
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'About',
  description: 'Learn more about QuoteMatey.',
  path: '/about',
});
```

---

## Required SEO Elements

Every indexable page should contain:

### Title

Good:

```text
AI Quote Generator for Tradies
```

Bad:

```text
Home
```

#### Guidelines

- Unique per page
- Clearly describe page purpose
- Include primary keyword when relevant
- Avoid keyword stuffing

---

#### Meta Description

Good:

```text
Create professional quotes in minutes with AI-powered quoting software for tradies.
```

Bad:

```text
Welcome to QuoteMatey.
```

##### Guidelines

- 120–160 characters
- Describe user benefit
- Include primary keyword naturally

---

#### Canonical URL

Every public page should define a canonical URL.

Example:

```text
/about
/pricing
/blog/how-to-create-quotes
```

Avoid duplicate URLs pointing to the same content.

---

#### H1 Heading

Every page must have exactly one H1.

Good:

```html
<h1>AI Quote Generator for Tradies</h1>
```

Avoid:

```html
<h1>Welcome</h1>
<h1>Features</h1>
```

Multiple H1s on a page.

---

#### Heading Hierarchy

Use semantic heading order.

Good:

```html
<h1>Main Page Title</h1>
<h2>Features</h2>
<h3>Feature Details</h3>
```

Avoid:

```html
<h1>Main Page Title</h1>
<h4>Features</h4>
```

Skipping heading levels.

---

### URL Standards

#### Use Lowercase URLs

Good:

```text
/about
/contact
/blog/quote-template-guide
```

Bad:

```text
/About
/Blog/PostOne
```

---

#### Use Kebab Case

Good:

```text
/how-to-create-quotes
```

Bad:

```text
/howToCreateQuotes
```

---

#### Use Meaningful Slugs

Good:

```text
/blog/plumbing-quote-template
```

Bad:

```text
/blog/post-123
```

---

### Images

Every content image should include alt text.

Good:

```tsx
<Image
  src="/quote-dashboard.png"
  alt="QuoteMatey dashboard showing generated quotes"
/>
```

Bad:

```tsx
<Image src="/quote-dashboard.png" alt="" />
```

---

### Internal Linking

Whenever relevant, link to other important pages.

Examples:

- Landing Page → Pricing
- Landing Page → Features
- Blog → Related Blog Posts
- FAQ → Contact Page

Benefits:

- Better crawlability
- Better user navigation
- Improved authority flow

---

### Open Graph Images

Public pages should eventually have custom OG images where appropriate.

Fallback image:

```text
/public/og-image.png
```

Used automatically when no page-specific image exists.

---

### Blog Guidelines

Every blog post should contain:

- Unique title
- Unique description
- Meaningful slug
- H1 heading
- Internal links
- Relevant images with alt text

Example:

```text
/blog/how-to-create-construction-quotes
```

---

### Pages That Should Not Be Indexed

Examples:

- Dashboard
- Account Settings
- Authentication Pages
- Internal Tools
- Admin Pages

Use:

```ts
generateMetadata({
  title: 'Dashboard',
  noIndex: true,
});
```

---

### Environment Rules

#### Production

```text
index = true
follow = true
```

#### Development

```text
index = false
follow = false
```

#### Staging

```text
index = false
follow = false
```

Development and staging environments must never be indexed.

---

## SEO Checklist Before Merging

### Metadata

- [ ] Title exists
- [ ] Description exists
- [ ] Canonical URL exists

### Content

- [ ] Single H1
- [ ] Proper heading hierarchy
- [ ] Meaningful content

### Images

- [ ] Alt text added
- [ ] Optimized images used

### Links

- [ ] Internal links added where appropriate

### Indexing

- [ ] Public page indexable
- [ ] Private page marked noindex

### Validation

- [ ] View page source
- [ ] Verify metadata output
- [ ] Verify canonical URL
- [ ] Verify OG tags
- [ ] Run Lighthouse SEO audit
