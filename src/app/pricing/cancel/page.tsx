'use client';
import { XCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formattedDate } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default function CancelPage() {
  const urlParams = useSearchParams();
  const params = {
    plan: urlParams.get('plan') || null,
    next_billing_date: urlParams.get('next_billing_date') || null,
    subscription_id: urlParams.get('subscription_id') || null,
  };
  const isScheduledCancellation =
    Boolean(params.next_billing_date) && Boolean(params.plan);

  const isCheckoutCancellation = Boolean(params.subscription_id);

  return (
    <div className="pt-24 size-full flex items-center justify-center bg-background p-8">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="justify-center items-center pb-4">
          <div className="rounded-full bg-destructive/10 p-4 mb-4">
            <XCircle className="size-16 text-destructive" />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <h1 className="text-3xl">Subscription Cancelled</h1>
          {isScheduledCancellation && (
            <>
              <p className="text-muted-foreground text-lg">
                Your subscription has been canceled.
              </p>
              <p className="text-muted-foreground text-lg">
                You’ll continue to have access until{' '}
                <strong>
                  {formattedDate(params?.next_billing_date || '')}
                </strong>
                . No further charges will be made.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-medium">{params.plan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Next billing date
                  </span>
                  <span className="font-medium">
                    {formattedDate(params?.next_billing_date || '')}
                  </span>
                </div>
              </div>
            </>
          )}
          {isCheckoutCancellation && (
            <>
              <p className="text-muted-foreground text-lg">
                Your subscription has been cancelled. No charges were made to
                your account.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <p className="text-sm">
                  You can upgrade your plan at any time from the pricing page.
                </p>
                <ul className="text-sm text-left space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-[#f57a0a] mt-0.5">•</span>
                    <span>Your current plan remains active</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#f57a0a] mt-0.5">•</span>
                    <span>No changes to your account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#f57a0a] mt-0.5">•</span>
                    <span>All your data is safe and secure</span>
                  </li>
                </ul>
              </div>
            </>
          )}
          <p className="text-sm text-muted-foreground">
            Need help choosing the right plan? Contact our support team.
          </p>
        </CardContent>

        {/* <CardFooter className="flex flex-col gap-3">
          <Link to="/billing" className="w-full">
            <Button className="w-full bg-[#0a1628] hover:bg-[#0a1628]/80 text-white">
              View Plans
            </Button>
          </Link>
          <Link to="/" className="w-full">
            <Button variant="outline" className="w-full">
              Go to Dashboard
            </Button>
          </Link>
        </CardFooter> */}
      </Card>
    </div>
  );
}
