import { plans } from '@/constant/paypal/plan';
import { createPlan, createProduct } from '@/lib/paypal';
import { prisma } from '@/lib/prisma';

const PAYPAL_ENV = process.env.PAYPAL_ENV!;

const log = (message: string) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(message);
  }
};

type Interval = 'WEEK' | 'MONTH' | 'YEAR';
export async function seedPlans() {
  let productId: string;

  // Reuse existing PayPal product if already seeded
  const existingProduct = await prisma.plan.findFirst({
    where: {
      paypal_product_id: {
        not: null,
      },

      environment: PAYPAL_ENV,
    },

    select: {
      paypal_product_id: true,
    },
  });

  if (existingProduct?.paypal_product_id) {
    productId = existingProduct.paypal_product_id;
  } else {
    productId = (await createProduct()) || '';

    if (!productId) {
      throw new Error('Failed to create PayPal product');
    }
  }

  for (const plan of plans) {
    const isFree = plan.pricing.price === '$0';

    const price = parseInt(plan.pricing.price.replace('$', ''));

    const version = plan.version;

    // Final DB identity
    const dbId = `${plan.id}_v${version}`;

    // Check existing DB plan
    const existingPlan = await prisma.plan.findUnique({
      where: {
        id: dbId,
      },
    });

    let paypalPlanId: string | null = existingPlan?.paypal_plan_id || null;

    // Create PayPal plan only if:
    // - paid plan
    // - PayPal plan missing
    if (!isFree && !paypalPlanId) {
      paypalPlanId = await createPlan({
        productId,

        name: `${plan.name} (v${version})`,

        description: plan.description,

        price,

        currency: plan.pricing.currency,

        interval: plan.period as Interval,
      });

      if (!paypalPlanId) {
        throw new Error(`Failed to create PayPal plan for ${dbId}`);
      }
    }

    // Transaction keeps DB consistent
    await prisma.$transaction(async (tx) => {
      // PLAN
      await tx.plan.upsert({
        where: {
          id: dbId,
        },

        update: {
          name: plan.name,

          description: plan.description,

          price,

          currency: plan.pricing.currency,

          billing_interval: 'MONTH',

          isActive: true,

          paypal_plan_id: paypalPlanId,

          paypal_product_id: isFree ? null : productId,
        },

        create: {
          id: dbId,

          name: plan.name,

          description: plan.description,

          price,

          currency: plan.pricing.currency,

          billing_interval: 'MONTH',

          isFree,

          paypal_plan_id: paypalPlanId,

          paypal_product_id: isFree ? null : productId,

          environment: PAYPAL_ENV,

          version,

          isActive: true,
        },
      });

      // PLAN LIMITS
      await tx.planLimit.upsert({
        where: {
          plan_id_interval: {
            plan_id: dbId,

            interval: plan.period as Interval,
          },
        },

        update: {
          text_limit: isFree ? 3 : -1,

          image_limit: isFree ? 1 : -1,
        },

        create: {
          plan_id: dbId,

          text_limit: isFree ? 3 : -1,

          image_limit: isFree ? 1 : -1,

          interval: plan.period as Interval,
        },
      });
    });

    log(`Seeded plan: ${dbId}`);
  }
}

// EXECUTION WRAPPER
async function main() {
  try {
    await seedPlans();
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Seed failed:', error);

  process.exit(1);
});
