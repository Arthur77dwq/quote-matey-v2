import { firebaseAdmin } from '@/lib/firebase/admin';

export async function getUserId(req: Request) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }

  const token = authHeader.split('Bearer ')[1];

  const decoded = await firebaseAdmin.auth().verifyIdToken(token);

  return decoded.uid;
}
