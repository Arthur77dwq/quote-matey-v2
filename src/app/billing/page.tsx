import {
  cancelSubscriptionAction,
  createSubscriptionAction,
} from '@/app/actions/billing';
import { getActiveSubscriptionByUser } from '@/db/subscription';
import { getUserId } from '@/lib/auth/user';

export default async function BillingPage() {
  const uid = await getUserId();
  const sub = await getActiveSubscriptionByUser(uid);

  return (
    <div>
      <h1>Billing</h1>

      <p>Plan: {sub?.plan?.name || 'Free'}</p>
      <p>Status: {sub ? sub.status : 'Inactive'}</p>

      {/* SUBSCRIBE */}
      {!sub && (
        <form action={createSubscriptionAction}>
          <input type="hidden" name="planId" value="starter_monthly_v1" />
          <button type="submit">Upgrade to Starter</button>
        </form>
      )}

      {/* CANCEL */}
      {sub && (
        <form action={cancelSubscriptionAction}>
          <input
            type="hidden"
            name="subscriptionId"
            value={sub.paypal_subscription_id || ''}
          />
          <button type="submit">Cancel Subscription</button>
        </form>
      )}
    </div>
  );
}
