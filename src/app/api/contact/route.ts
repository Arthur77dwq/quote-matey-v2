import { contactSchema } from '@/lib/schemas/contact.schema';

const DISCORD_FIELD_LIMIT = 1024;

function field(name: string, value?: string) {
  return value
    ? {
        name,
        value: value.slice(0, DISCORD_FIELD_LIMIT),
        inline: true,
      }
    : null;
}

export async function POST(request: Request) {
  const webhookUrl = process.env.DISCORD_CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    return Response.json(
      { message: 'Contact service is not configured.' },
      { status: 500 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      { message: 'Please check the submitted information.' },
      { status: 400 },
    );
  }

  const { name, email, phone, subject, message } = result.data;
  const fields = [
    field('Name', name),
    field('Email', email),
    field('Phone', phone),
    field('Subject', subject),
  ].filter((item) => item !== null);

  const discordResponse = await fetch(`${webhookUrl}?wait=true`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      thread_name: (subject || `Contact request from ${name}`).slice(0, 100),
      allowed_mentions: { parse: [] },
      embeds: [
        {
          title: 'New QuoteMatey contact request',
          description: message,
          color: 0x102e60,
          fields,
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  if (!discordResponse.ok) {
    return Response.json(
      { message: 'Unable to send your message right now.' },
      { status: 502 },
    );
  }

  return Response.json({ success: true });
}
