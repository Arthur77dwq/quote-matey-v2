-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "billing_interval" TEXT,
    "isFree" BOOLEAN NOT NULL DEFAULT true,
    "paypal_plan_id" TEXT,
    "paypal_product_id" TEXT,
    "environment" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanLimit" (
    "id" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "text_limit" INTEGER NOT NULL,
    "image_limit" INTEGER NOT NULL,
    "interval" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanLimit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "firebase_uid" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "paypal_subscription_id" TEXT,
    "status" TEXT NOT NULL,
    "start_date" TIMESTAMP(3),
    "next_billing_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "cancel_at_period_end" BOOLEAN NOT NULL DEFAULT false,
    "last_payment_date" TIMESTAMP(3),
    "last_payment_amount" INTEGER,
    "currency" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usage" (
    "id" TEXT NOT NULL,
    "firebase_uid" TEXT NOT NULL,
    "plan_id" TEXT NOT NULL,
    "text_count" INTEGER NOT NULL DEFAULT 0,
    "image_count" INTEGER NOT NULL DEFAULT 0,
    "period_start" TIMESTAMP(3) NOT NULL,
    "period_end" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plan_paypal_plan_id_key" ON "Plan"("paypal_plan_id");

-- CreateIndex
CREATE INDEX "Plan_environment_isActive_idx" ON "Plan"("environment", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "PlanLimit_plan_id_key" ON "PlanLimit"("plan_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_paypal_subscription_id_key" ON "Subscription"("paypal_subscription_id");

-- CreateIndex
CREATE INDEX "Subscription_firebase_uid_status_idx" ON "Subscription"("firebase_uid", "status");

-- CreateIndex
CREATE INDEX "Usage_firebase_uid_idx" ON "Usage"("firebase_uid");

-- CreateIndex
CREATE UNIQUE INDEX "Usage_firebase_uid_plan_id_period_start_key" ON "Usage"("firebase_uid", "plan_id", "period_start");

-- AddForeignKey
ALTER TABLE "PlanLimit" ADD CONSTRAINT "PlanLimit_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
