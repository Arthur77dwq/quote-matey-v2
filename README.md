# 🚀 QuoteMatey

> AI-powered tool to generate professional job quotes in seconds.

[![CI](https://github.com/Arthur77dwq/quote-matey-v2/actions/workflows/ci.yml/badge.svg)](https://github.com/Arthur77dwq/quote-matey-v2/actions)

---

## 🛠️ Tech Stack

<!-- markdownlint-disable-next-line MD033 -->
<img src="https://skillicons.dev/icons?i=react,typescript,nextjs,tailwind" alt="Tech stack: React, TypeScript, Next.js, Tailwind CSS" />

---

## ✨ What is QuoteMatey?

**QuoteMatey** helps tradies, freelancers, and service businesses:

👉 Generate **clear, professional quotes instantly**  
👉 Improve **client communication**  
👉 Close deals faster with **structured pricing**

---

## 🎯 Why QuoteMatey?

Creating quotes manually is:

- Time-consuming ❌
- Inconsistent ❌
- Hard to scale ❌

**QuoteMatey solves this with AI.**

---

## ⚡ Features

- 🧠 AI-powered quote generation
- 💬 Chat-based interface
- 📄 Clean, client-ready formatting
- 🎯 Customizable inputs
- ⚡ Fast & minimal UX
- 🧩 Scalable architecture

---

## 🖥️ Live Demo

👉 https://quotematey.com _(update if needed)_

---

## 🛠️ Tech Stack (Detailed)

- **Framework:** Next.js 16
- **Frontend:** React 19
- **UI:** Tailwind CSS + shadcn/ui
- **Validation:** Zod
- **Testing:** Vitest + Playwright
- **Tooling:** ESLint, Prettier, Husky

---

## 🚀 Getting Started

### 1. Clone

```bash
git clone https://github.com/Arthur77dwq/quote-matey-v2.git
cd quote-matey-v2
```

### 2. Install

```bash
npm install
```

### 3. Run

```bash
npm run dev
```

---

## 🔧 Scripts

```bash
npm run dev         # start dev server
npm run build       # production build
npm run start       # start prod server
npm run lint        # lint
npm run typecheck   # type check
npm run format      # format code
npm run test        # unit tests (vitest)
npm run e2e         # end-to-end tests (playwright)
```

---

## 🧪 Testing

### ⚡ Unit Testing (Vitest)

```bash
npm run test
```

- Test business logic (usage limits, API handling)
- Fast feedback during development

---

### 🚀 E2E Testing (Playwright)

```bash
npm run e2e
```

- Tests real user flows:
  - Login
  - Image upload → quote
  - Payment flow

👉 Tests are located in:

```text
e2e/
```

---

## 🔐 Environment Variables

Create `.env`:

```env
GOOGLE_API_KEY=
AZURE_API_KEY=
NEXT_PUBLIC_GA_ID=
```

---

## 🧪 CI / Quality

This project includes:

- ✅ Linting
- ✅ Type checking
- ✅ Build validation
- ✅ Unit testing (Vitest)
- ✅ E2E testing (Playwright)
- ✅ Pre-push checks (Husky)

---

## 📁 Project Structure

```text
.
├── app/
├── components/
├── hooks/
├── lib/
├── public/
├── styles/
├── e2e/        # Playwright tests
├── tests/      # Unit tests (optional)
├── types/
```

---

## 🧩 Design System

- Built with **shadcn/ui**
- Tailwind-based tokens
- Modular + scalable components

---

## 🚀 Deployment

Recommended: **Vercel**

```bash
npm run build
```

---

## 🤝 Contributing

```bash
git checkout -b feature/your-feature
git commit -m "feat: add feature"
git push origin your-branch
```

---

## ⭐ Support

If you like this project:

👉 Give it a star
👉 Share with others

---

## 💡 Vision

> Make quoting effortless, professional, and scalable for every service business.
