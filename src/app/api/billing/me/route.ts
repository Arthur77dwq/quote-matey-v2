// import { getCurrentUserSubscription } from '@/services/subscription';

export async function GET() {
  //   const userId = await getUserId(); // your auth

  //   const data = await getCurrentUserSubscription(userId);
  const data = {};

  return Response.json(data);
}
