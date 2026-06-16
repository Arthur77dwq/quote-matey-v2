import { LogEntry } from '@/types/logger';

import { LogTransport } from './transport';

export class ConsoleTransport implements LogTransport {
  async log(entry: LogEntry): Promise<void> {
    const payload = JSON.stringify({
      timestamp: entry.timestamp,
      level: entry.level,
      message: entry.message,
      metadata: entry.metadata,
    });

    /* eslint-disable no-console */
    console.log(payload);
  }
}
