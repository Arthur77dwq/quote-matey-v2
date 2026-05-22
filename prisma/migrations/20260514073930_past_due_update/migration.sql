/*
  Warnings:

  - Changed the type of `status` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'PAST_DUE', 'CANCELLED', 'EXPIRED', 'SUSPENDED', 'APPROVAL_PENDING');

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "failed_payment_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "grace_period_end" TIMESTAMP(3),
DROP COLUMN "status",
ADD COLUMN     "status" "SubscriptionStatus" NOT NULL;

-- CreateIndex
CREATE INDEX "Subscription_firebase_uid_status_idx" ON "Subscription"("firebase_uid", "status");

-- CreateIndex
CREATE INDEX "Subscription_firebase_uid_end_date_idx" ON "Subscription"("firebase_uid", "end_date");

-- CreateIndex
CREATE INDEX "Subscription_status_idx" ON "Subscription"("status");

-- CreateIndex
CREATE INDEX "Subscription_next_billing_date_idx" ON "Subscription"("next_billing_date");
