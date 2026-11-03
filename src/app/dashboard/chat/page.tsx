import { ChatPage } from '@/components/dashboard/chat';

import { DATA } from './data';

export default async function Page() {
  return <ChatPage data={DATA} />;
}
