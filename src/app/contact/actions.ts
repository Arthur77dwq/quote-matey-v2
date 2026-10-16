'use server';

import { contactSchema } from '@/lib/schemas/contact.schema';

const DISCORD_FIELD_LIMIT = 1024;

export type ContactActionResult =
  | { success: true }
  | { success: false; message: string };

function field(name: string, value?: string) {
  return value
    ? {
        name,
        value: value.slice(0, DISCORD_FIELD_LIMIT),
        inline: true,
      }
    : null;
}

export async function submitContactFormAction(
  data: unknown,
): Promise<ContactActionResult> {
  const result = contactSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: 'Please check the submitted information.',
    };
  }

  const webhookUrl = process.env.DISCORD_CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    return {
      success: false,
      message: 'Contact service is not configured.',
    };
  }

  const { name, email, phone, subject, message } = result.data;
  const fields = [
    field('Name', name),
    field('Email', email),
    field('Phone', phone),
    field('Subject', subject),
  ].filter((item) => item !== null);

  try {
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
      return {
        success: false,
        message: 'Unable to send your message right now.',
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      message: 'Unable to send your message right now.',
    };
  }
}
