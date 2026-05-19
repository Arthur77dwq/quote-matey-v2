# Subscription & Billing System

This module manages subscription-based access for the Quote SaaS platform.

It integrates:

- Prisma (PostgreSQL)
- PayPal Subscriptions
- Firebase Authentication

---

## Overview

The system is built using four core entities:

| Entity       | Purpose                   |
| ------------ | ------------------------- |
| Plan         | Defines pricing & billing |
| PlanLimit    | Defines feature limits    |
| Subscription | Tracks user subscription  |
| Usage        | Tracks consumption        |

---

## Architecture

```txt

Plans (DB)
↓
Subscriptions (User mapping)
↓
Usage (Consumption tracking)
↓
Access Control (Middleware)

```

---

## Data Model

### Plan

Defines available pricing tiers.

- price, currency
- billing interval (MONTH/YEAR)
- PayPal mapping
- versioning support

---

### PlanLimit

Defines feature limits per plan.

- text/image limits
- interval (WEEK/MONTH)

---

### Subscription

Tracks user's active plan.

- linked to Firebase UID
- PayPal subscription ID
- status (ACTIVE, CANCELLED)

---

### Usage

Tracks user consumption.

- text_count / image_count
- period-based tracking

---

## Flow

```txt

User Action
↓
Check Subscription
↓
Get Plan
↓
Get Limits
↓
Check Usage
↓
Allow / Block

```

---

## Core Rules

- Plan pricing is immutable → use versioning
- Only one ACTIVE subscription per user
- Free plans do not use PayPal
- Usage resets based on interval

---

## Environment

```txt
PAYPAL_ENV=sandbox | live
DATABASE_URL=...
```

---

## Setup

### 1. Install dependencies

```txt

npm install
```

### 2. Generate Prisma client

```txt

npx prisma generate
```

### 3. Run migrations

```txt

npx prisma migrate dev
```

### 4. Seed plans

```txt

npm run seed:plans
```

---

## Plan Versioning Strategy

| Change         | Action                  |
| -------------- | ----------------------- |
| Price update   | Create new plan version |
| Feature update | Update PlanLimit        |

---

## Key Principle

> Plan defines value, Subscription assigns it, Usage enforces it
