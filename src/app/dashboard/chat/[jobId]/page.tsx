import { ChatPage } from '@/components/dashboard/chat';

import { DATA } from './data';

type PageProps = {
  params: Promise<{
    jobId: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { jobId } = await params;

  return <ChatPage data={DATA} jobId={jobId} />;
}
