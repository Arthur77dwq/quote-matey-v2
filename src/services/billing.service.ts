// import { createSubscription } from '@/lib/paypal/subscription';
// import { prisma } from '@/lib/prisma';

// export async function startSubscription(firebase_uid: string) {
//   const plan = await prisma.plan.findFirst({
//     where: {
//       isActive: true,
//       environment: process.env.PAYPAL_ENV,
//     },
//   });
// //   console.log('Found active plan:', firebase_uid);
//   return createSubscription(plan!.paypal_plan_id!);
// }
