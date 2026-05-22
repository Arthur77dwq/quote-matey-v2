import { cookies } from 'next/headers';

import { verify } from './verify';

export async function getUserId(token?: string) {
  if (!token) {
    const cookieStore = await cookies();
    token = cookieStore.get('token')?.value;
  }

  if (!token) {
    throw new Error('Unauthorized');
  }

  try {
    return await verify(token);
  } catch {
    throw new Error('Unauthorized');
  }
}
