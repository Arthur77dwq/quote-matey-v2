import { firebaseAdmin } from '@/lib/firebase/admin';

export async function verify(token: string) {
  const decoded = await firebaseAdmin.auth().verifyIdToken(token);
  return decoded;
}
