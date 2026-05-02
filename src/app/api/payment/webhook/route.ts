export async function POST(req: Request) {
  const body = await req.json();

  switch (body.event_type) {
    case 'BILLING.SUBSCRIPTION.ACTIVATED':
      // TODO:update DB
      break;
  }

  return new Response('OK');
}
