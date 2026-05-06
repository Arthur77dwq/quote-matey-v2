import { plans } from '@/constant/paypal/plan';
import { createPlan, createProduct } from '@/lib/paypal';
import { prisma } from '@/lib/prisma';

const PAYPAL_ENV = process.env.PAYPAL_ENV!;

// Optional: structured logger (safe fallback)
const log = (message: string) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(message);
  }
};

export async function seedPlans() {
  let productId: string;

  const existingProduct = await prisma.plan.findFirst({
    where: {
      paypal_product_id: { not: null },
      environment: PAYPAL_ENV,
    },
    select: { paypal_product_id: true },
  });

  if (existingProduct?.paypal_product_id) {
    productId = existingProduct.paypal_product_id;
  } else {
    productId = await createProduct();
  }

  for (const plan of plans) {
    const isFree = plan.pricing.price === '$0';
    const price = parseInt(plan.pricing.price.replace('$', ''));

    const slug = plan.name === 'Free' ? 'free' : 'starter_monthly';
    const version = 1;
    const dbId = `${slug}_v${version}`;

    const existing = await prisma.plan.findFirst({
      where: {
        id: dbId,
        environment: PAYPAL_ENV,
      },
    });

    if (existing) continue;

    let paypalPlanId: string | null = null;

    if (!isFree) {
      paypalPlanId = await createPlan({
        productId,
        name: `${plan.name} (v${version})`,
        description: plan.description,
        price,
        currency: plan.pricing.currency,
        interval: 'MONTH',
      });
    }

    await prisma.plan.create({
      data: {
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

    await prisma.planLimit.upsert({
      where: {
        plan_id_interval: {
          plan_id: dbId,
          interval: 'WEEK',
        },
      },
      update: {},
      create: {
        plan_id: dbId,
        text_limit: isFree ? 3 : -1,
        image_limit: isFree ? 1 : -1,
        interval: 'WEEK',
      },
    });

    log(`Seeded plan: ${dbId}`);
  }
}

// Proper execution wrapper
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
