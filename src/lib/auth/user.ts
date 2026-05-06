import { cookies } from 'next/headers';

import { firebaseAdmin } from '@/lib/firebase/admin';

export async function getUserId() {
  const cookieStore = await cookies();

  const token = cookieStore.get('token')?.value;

  if (!token) {
    throw new Error('Unauthorized');
  }

  try {
    const decoded = await firebaseAdmin.auth().verifyIdToken(token);
    const uid: string = decoded.uid;
    return uid;
  } catch {
    throw new Error('Unauthorized');
  }
}
