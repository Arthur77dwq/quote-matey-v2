'use client';

// import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

import {
  Card,
  CardContent,
  // CardFooter,
  CardHeader,
} from '@/components/ui/card';

export default function SuccessPage() {
  // const router = useRouter();

  // useEffect(() => {
  //   setTimeout(() => {
  //     router.push('/pricing');
  //   }, 3000);
  // });

  return (
    <div className="pt-24 size-full flex items-center justify-center bg-background p-8">
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
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Plan</span>
              <span className="font-medium">Pro Plan</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Billing</span>
              <span className="font-medium">$29/month</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Next billing date</span>
              <span className="font-medium">June 16, 2026</span>
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
    </div>
  );
}
