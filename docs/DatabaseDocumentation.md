# 📘 Database Documentation (SaaS Billing System)

---

## 1. `Plan` — Subscription Plan Definition

### Purpose

Represents a **subscription offering** (e.g., Free, Pro Monthly, Pro Yearly).
This is the **source of truth for pricing, PayPal mapping, and availability**.

---

### Fields

| Field               | Type     | Required | Description                                                                                     |
| ------------------- | -------- | -------- | ----------------------------------------------------------------------------------------------- |
| `id`                | String   | true     | Unique identifier for the plan (e.g., `free_v1`, `pro_v2`). Used internally and for versioning. |
| `name`              | String   | true     | Display name of the plan (e.g., “Free”, “Pro”).                                                 |
| `description`       | String   | false    | Optional human-readable description used in UI/marketing.                                       |
| `price`             | Int      | true     | Price of the plan in smallest currency unit (e.g., cents). Example: `499` = $4.99.              |
| `currency`          | String   | true     | Currency code (ISO 4217), e.g., `AUD`, `USD`.                                                   |
| `billing_interval`  | String   | false    | Billing frequency (`MONTH`, `YEAR`). Null for free plans.                                       |
| `isFree`            | Boolean  | true     | Indicates if plan is free. Controls billing logic.                                              |
| `paypal_plan_id`    | String   | false    | PayPal Plan ID (external reference). Must be unique.                                            |
| `paypal_product_id` | String   | false    | PayPal Product ID associated with this plan.                                                    |
| `environment`       | String   | true     | Environment where plan exists: `sandbox` or `live`.                                             |
| `version`           | Int      | true     | Version of the plan (used for upgrades/migrations).                                             |
| `isActive`          | Boolean  | true     | Whether the plan is currently available for new subscriptions.                                  |
| `createdAt`         | DateTime | true     | Timestamp when record was created.                                                              |
| `updatedAt`         | DateTime | true     | Timestamp of last update (auto-managed).                                                        |

---

### Relationships

- `subscriptions` → All user subscriptions tied to this plan
- `limits` → Usage limits associated with this plan

---

### Constraints & Rules

- `paypal_plan_id` must be unique
- Only **one active version per plan type per environment**
- `isFree = true` → no PayPal IDs required
- `billing_interval` should be null for free plans

---

### Example

```json
{
  "id": "pro_v2",
  "name": "Pro",
  "description": "Best for professionals",
  "price": 499,
  "currency": "AUD",
  "billing_interval": "MONTH",
  "isFree": false,
  "paypal_plan_id": "P-XXXX",
  "paypal_product_id": "PROD-XXXX",
  "environment": "sandbox",
  "version": 2,
  "isActive": true
}
```

---

## 2. `PlanLimit` — Usage Limits per Plan

### Purpose

Defines **rate limits or quotas** for a plan (e.g., 100 texts/month).

---

### Fields

| Field         | Type     | Required | Description                                 |
| ------------- | -------- | -------- | ------------------------------------------- |
| `id`          | String   | true     | Unique ID (auto-generated via cuid).        |
| `plan_id`     | String   | true     | Foreign key referencing `Plan.id`.          |
| `plan`        | Relation | true     | Associated plan.                            |
| `text_limit`  | Int      | true     | Maximum number of text operations allowed.  |
| `image_limit` | Int      | true     | Maximum number of image operations allowed. |
| `interval`    | String   | true     | Reset interval (`WEEK`, `MONTH`).           |
| `createdAt`   | DateTime | true     | Record creation timestamp.                  |
| `updatedAt`   | DateTime | true     | Last update timestamp.                      |

---

### Constraints

- Unique combination:

```ts id="unique_limit"
(plan_id, interval);
```

👉 Prevents duplicate limits for same interval

---

### Example

```json
{
  "plan_id": "pro_v2",
  "text_limit": 1000,
  "image_limit": 100,
  "interval": "MONTH"
}
```

---

## 3. `Subscription` — User Subscription Record

### Purpose

Tracks **which user is subscribed to which plan**, including billing lifecycle and status.

---

### Fields

| Field                    | Type     | Required | Description                                        |
| ------------------------ | -------- | -------- | -------------------------------------------------- |
| `id`                     | String   | true     | Unique subscription ID.                            |
| `firebase_uid`           | String   | true     | User identifier (from Firebase Auth).              |
| `plan_id`                | String   | true     | Associated plan ID.                                |
| `plan`                   | Relation | true     | Linked plan.                                       |
| `paypal_subscription_id` | String   | false    | PayPal subscription ID (external reference).       |
| `status`                 | String   | true     | Subscription status (`ACTIVE`, `CANCELLED`, etc.). |
| `start_date`             | DateTime | false    | When subscription started.                         |
| `next_billing_date`      | DateTime | false    | Next billing cycle date.                           |
| `end_date`               | DateTime | false    | When subscription ended.                           |
| `cancel_at_period_end`   | Boolean  | true     | Whether cancellation is scheduled.                 |
| `last_payment_date`      | DateTime | false    | Last successful payment timestamp.                 |
| `last_payment_amount`    | Int      | false    | Amount charged in last payment.                    |
| `currency`               | String   | false    | Currency used for billing.                         |
| `createdAt`              | DateTime | true     | Creation timestamp.                                |
| `updatedAt`              | DateTime | true     | Last update timestamp.                             |

---

### Relationships

- Many subscriptions → one plan
- One user (`firebase_uid`) → many subscriptions over time

---

### Constraints

- `paypal_subscription_id` must be unique
- Indexed:

```ts
(firebase_uid, status);
```

---

### Example

```json
{
  "firebase_uid": "user_123",
  "plan_id": "pro_v2",
  "status": "ACTIVE",
  "paypal_subscription_id": "I-XXXX",
  "next_billing_date": "2026-06-01"
}
```

---

## 4. `Usage` — User Consumption Tracking

### Purpose

Tracks **how much a user has used** within a billing period.

---

### Fields

| Field          | Type     | Required | Description                      |
| -------------- | -------- | -------- | -------------------------------- |
| `id`           | String   | true     | Unique record ID.                |
| `firebase_uid` | String   | true     | User identifier.                 |
| `plan_id`      | String   | true     | Associated plan.                 |
| `text_count`   | Int      | true     | Number of text operations used.  |
| `image_count`  | Int      | true     | Number of image operations used. |
| `period_start` | DateTime | true     | Start of usage window.           |
| `period_end`   | DateTime | true     | End of usage window.             |
| `createdAt`    | DateTime | true     | Creation timestamp.              |
| `updatedAt`    | DateTime | true     | Last update timestamp.           |

---

### Constraints

- Unique per billing cycle:

```ts
(firebase_uid, plan_id, period_start);
```

- Indexed:

```ts
firebase_uid;
```

---

### Example

```json
{
  "firebase_uid": "user_123",
  "plan_id": "pro_v2",
  "text_count": 120,
  "image_count": 10,
  "period_start": "2026-05-01",
  "period_end": "2026-06-01"
}
```

---

## System Flow (How Tables Work Together)

1. `Plan` defines pricing and availability
2. `PlanLimit` defines allowed usage
3. `Subscription` links user → plan
4. `Usage` tracks consumption per cycle

---

## Database ERD

![Database ERD](./ERD.svg)

## Key Design Decisions

- **Versioning (`version`)** → allows safe pricing updates
- **Environment separation (`sandbox/live`)** → avoids test/live conflicts
- **External IDs (PayPal)** → keeps system decoupled
- **Usage table** → supports rate limiting + billing enforcement
