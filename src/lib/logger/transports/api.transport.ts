import { LogEntry } from '@/types/logger';

export class ApiTransport {
  async log(entry: LogEntry) {
    if (entry.level !== 'warn' && entry.level !== 'error') {
      return;
    }

    await fetch('/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entry),
    });
  }
}
