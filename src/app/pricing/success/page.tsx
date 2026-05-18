'use client';

import { CheckCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { apiJson } from '@/lib/api';
import { formattedDate } from '@/lib/utils';
import { PaypalVerifyResponse } from '@/types/paypal/subscription';

type VerifyResponse = {
  status: boolean;
  subscription: PaypalVerifyResponse;
  msg: string;
};

export default function SuccessPage() {
  const params = useSearchParams();
  const subscriptionId = params.get('subscription_id');
  const [subscription, setSubscription] = useState<PaypalVerifyResponse | null>(
    null,
  );

  useEffect(() => {
    const load = async () => {
      try {
        const { subscription } = await apiJson<VerifyResponse>(
          '/api/subscription/verify',
          {
            method: 'POST',

            body: JSON.stringify({
              subscriptionId: subscriptionId,
            }),
          },
        );
        setSubscription(subscription);
      } catch {
        // intentionally left empty
      }
    };
    void load();
  }, [subscriptionId]);

  return (
    <div className="pt-24 size-full flex items-center justify-center bg-background p-8">
      {subscription && (
        <Card className="w-full max-w-md text-center">
          <CardHeader className="justify-center items-center pb-4">
            <div className="w-fit rounded-full bg-[#f57a0a]/10 p-4 mb-4">
              <CheckCircle className="size-16 text-[#f57a0a]" />
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <h1 className="text-3xl">Subscription Successful!</h1>
            <p className="text-muted-foreground text-lg">
              Welcome to your new plan. Your account has been upgraded
              successfully.
            </p>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              {/* <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Plan</span>
                <span className="font-medium">Starter Plan</span>
              </div> */}
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Billing</span>
                <span className="font-medium">
                  $
                  {subscription?.billing_info?.last_payment?.amount?.value ||
                    ''}
                  /month
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Next billing date</span>
                <span className="font-medium">
                  {formattedDate(
                    subscription?.billing_info?.next_billing_time || '',
                  )}
                </span>
              </div>
            </div>

            {/* <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to your inbox with all the
            details.
          </p> */}
          </CardContent>

          {/* <CardFooter className="flex flex-col gap-3">
          <Link to="/" className="w-full">
            <Button className="w-full bg-[#0a1628] hover:bg-[#0a1628]/80 text-white">
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/billing" className="w-full">
            <Button variant="outline" className="w-full">
              View Billing Details
            </Button>
          </Link>
        </CardFooter> */}
        </Card>
      )}
    </div>
  );
}
