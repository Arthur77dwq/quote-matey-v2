'use server';

import { redirect } from 'next/navigation';

import { withServerActionAuth } from '@/lib/auth/withAuth';

export async function newJobId() {
  return withServerActionAuth(async () => {
    return crypto.randomUUID();
  });
}

export async function newChat() {
  return withServerActionAuth(async () => {
    const newJobId = crypto.randomUUID();
    redirect(`/dashboard/chat/${newJobId}`);
  });
}

export async function changeChatTitle(formData: FormData) {
  return withServerActionAuth(async () => {
    formData.get('jobId');
    formData.get('title');
    // TODO: Implement this action, update the title of chat with provided jobId
  });
}
