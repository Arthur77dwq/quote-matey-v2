import { cookies } from 'next/headers';

import { firebaseAdmin } from '@/lib/firebase/admin';

export async function getUserId(token?: string) {
  if (!token) {
    const cookieStore = await cookies();
    token = cookieStore.get('token')?.value;
  }

  if (!token) {
    throw new Error('Unauthorized');
  }

  try {
    const decoded = await firebaseAdmin.auth().verifyIdToken(token);
    return decoded;
  } catch {
    throw new Error('Unauthorized');
  }
}
