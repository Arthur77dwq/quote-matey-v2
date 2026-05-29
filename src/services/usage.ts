import { getPlanLimit } from '@/db/planLimit/read';
import {
  createUsage,
  getFreePlanUsagePage,
  incrementImageUsage,
  incrementTextUsage,
  resetUsageCycle,
} from '@/db/usage';
import { getUserUsage } from '@/db/usage/read';
import { getUserId } from '@/lib/auth/user';
import { Subscription } from '@/types/subscription';

import { getCurrentUserSubscription } from './subscription';

export async function updateUsage(types: string[]) {
  const { uid } = await getUserId();
  const subscription = await getCurrentUserSubscription(uid);
  if (subscription) {
    types.forEach(async (type) => {
      if (type === 'text') {
        await incrementTextUsage({
          firebase_uid: uid,
          plan_id: subscription.plan_id,
        });
      } else {
        if (type === 'image')
          await incrementImageUsage({
            firebase_uid: uid,
            plan_id: subscription.plan_id,
          });
      }
    });
  }
}

async function resetUsageRows(rows: { id: string }[]) {
  await Promise.all(rows.map((row) => resetUsageCycle(row.id)));
}

export async function resetFreePlanUsage() {
  let page = 1;

  while (true) {
    const rows = await getFreePlanUsagePage(page);

    if (rows.length === 0) {
      break;
    }

    await resetUsageRows(rows);

    page++;
  }
}

export async function ensureUsage(subscription: Subscription) {
  if (subscription) {
    const availableUsage = await getUserUsage(
      subscription.firebase_uid,
      subscription.plan_id,
    );

    if (!availableUsage) {
      const limit = await getPlanLimit(subscription.plan_id);

      const now = new Date();
      const nextMonth = new Date(now);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      if (limit)
        await createUsage({
          firebase_uid: subscription.firebase_uid,
          plan_id: subscription.plan_id,
          period_start: now,
          period_end:
            limit.interval === 'WEEK'
              ? new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
              : nextMonth,
        });
    }
  }
}
