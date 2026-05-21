# Subscription & Billing System

This module manages subscription-based access for the Quote SaaS platform.

It integrates:

- Prisma ORM
- PostgreSQL
- PayPal Subscriptions
- Firebase Authentication

---

## Overview

The billing system is built around four core entities:

| Entity       | Purpose                                      |
| ------------ | -------------------------------------------- |
| Plan         | Defines pricing, billing, and availability   |
| PlanLimit    | Defines usage quotas and feature limits      |
| Subscription | Tracks subscription lifecycle and billing    |
| Usage        | Tracks user consumption within billing cycle |

---

## Architecture

```txt
Plan
↓
PlanLimit
↓
Subscription
↓
Usage
↓
Access Control / Rate Limiting
```

---

## Database Models

## 1. Plan

Represents a subscription offering such as:

- Free
- Pro Monthly
- Pro Yearly

### Responsibilities

- Pricing configuration
- Billing intervals
- Environment separation
- PayPal mapping
- Versioning support
- Availability management

### Includes

- `price`
- `currency`
- `billing_interval`
- `paypal_plan_id`
- `paypal_product_id`
- `environment`
- `version`
- `isActive`

---

## 2. PlanLimit

Defines quota rules and usage caps for a plan.

### Responsibilities

- Text generation limits
- Image generation limits
- Reset intervals

### Includes

- `text_limit`
- `image_limit`
- `interval`

---

## 3. Subscription

Tracks a user's subscription lifecycle.

### Responsibilities

- Links users to plans
- Tracks billing state
- Handles renewals/cancellations
- Stores PayPal subscription reference
- Handles failed payments and grace periods

### Includes

- `firebase_uid`
- `paypal_subscription_id`
- `status`
- `next_billing_date`
- `cancel_at_period_end`
- `grace_period_end`
- `failed_payment_count`

---

## 4. Usage

Tracks consumption during a billing period.

### Responsibilities

- Rate limiting
- Usage enforcement
- Analytics support

### Includes

- `text_count`
- `image_count`
- `period_start`
- `period_end`

---

# Subscription Statuses

```txt
ACTIVE
PAST_DUE
CANCELLED
EXPIRED
SUSPENDED
APPROVAL_PENDING
INACTIVE
```

| Status           | Description                              |
| ---------------- | ---------------------------------------- |
| ACTIVE           | Subscription is active and usable        |
| PAST_DUE         | Payment failed but recoverable           |
| CANCELLED        | User cancelled subscription              |
| EXPIRED          | Subscription expired naturally           |
| SUSPENDED        | Suspended due to billing/platform issues |
| APPROVAL_PENDING | Waiting for PayPal approval              |
| INACTIVE         | Subscription exists but inactive         |

---

## Flow

```txt
User Action
↓
Authenticate User
↓
Check Active Subscription
↓
Load Plan
↓
Load Plan Limits
↓
Check Current Usage
↓
Allow / Block Request
```

---

## Billing Lifecycle

```txt
Create Subscription
↓
PayPal Approval
↓
ACTIVE
↓
Recurring Billing
↓
Usage Tracking
↓
Renew / Cancel / Expire
```

---

## Core Rules

- Plan pricing is immutable → use versioning
- Free plans do not require PayPal IDs
- Usage is tracked per billing cycle
- Usage resets based on interval
- PayPal IDs must remain unique
- Environment separation prevents sandbox/live conflicts
- Subscription status controls platform access

---

## Database Constraints

### Plan

- `paypal_plan_id` → unique
- indexed by:
  - `environment`
  - `isActive`

### PlanLimit

Unique constraint:

```prisma
@@unique([plan_id, interval])
```

### Subscription

Indexes:

```prisma
@@index([firebase_uid, status])
@@index([firebase_uid, end_date])
@@index([status])
@@index([next_billing_date])
```

### Usage

Unique constraint:

```prisma
@@unique([firebase_uid, plan_id, period_start])
```

---

## Environment Variables

```env
DATABASE_URL=postgresql://...
PAYPAL_ENV=sandbox
```

Possible values:

```txt
sandbox
live
```

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Generate Prisma client

```bash
npx prisma generate
```

### 3. Run migrations

```bash
npx prisma migrate dev
```

### 4. Seed plans

```bash
npx prisma db seed
```

---

## Plan Versioning Strategy

| Change                  | Strategy                |
| ----------------------- | ----------------------- |
| Price update            | Create new plan version |
| Currency update         | Create new plan version |
| Feature limit update    | Update PlanLimit        |
| Billing interval change | Create new plan version |

---

## Usage Enforcement Strategy

```txt
Request
↓
Identify User
↓
Get Active Subscription
↓
Get Plan Limits
↓
Get Current Usage
↓
Compare Limits
↓
Allow or Reject
```

---

## ERD

![Database ERD](./ERD.png)

---

# Key Design Decisions

| Decision                   | Reason                           |
| -------------------------- | -------------------------------- |
| Versioned plans            | Safe pricing migrations          |
| Environment separation     | Prevent test/live conflicts      |
| Dedicated usage tracking   | Scalable quota enforcement       |
| External PayPal references | Decoupled billing system         |
| Indexed billing dates      | Efficient cron automation        |
| Status enum                | Centralized lifecycle management |
| Grace period support       | Better failed-payment recovery   |

---

# Recommended Future Enhancements

## Feature Flags Per Plan

```prisma
features Json?
```

Useful for:

- premium features
- beta access
- AI model access control

---

## Soft Deletes

```prisma
deletedAt DateTime?
```

Allows archival without permanent deletion.

---

## Additional Usage Types

Future extensibility:

- `audio_count`
- `video_count`
- `storage_usage`

---

# Key Principle

> Plan defines value.
> Subscription assigns access.
> Usage enforces limits.

```

```
