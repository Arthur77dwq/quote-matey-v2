import {
  getFreePlanUsagePage,
  incrementImageUsage,
  incrementTextUsage,
  resetUsageCycle,
} from '@/db/usage';
import { getUserId } from '@/lib/auth/user';

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
