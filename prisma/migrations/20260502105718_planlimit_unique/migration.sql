/*
  Warnings:

  - A unique constraint covering the columns `[plan_id,interval]` on the table `PlanLimit` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "PlanLimit_plan_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "PlanLimit_plan_id_interval_key" ON "PlanLimit"("plan_id", "interval");
