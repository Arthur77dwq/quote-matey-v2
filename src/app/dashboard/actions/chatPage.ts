'use server';
import { withServerActionAuth } from '@/lib/auth/withAuth';

export async function changeChatTitle(formData: FormData) {
  return withServerActionAuth(async () => {
    formData.get('jobId');
    formData.get('title');
  });
}
