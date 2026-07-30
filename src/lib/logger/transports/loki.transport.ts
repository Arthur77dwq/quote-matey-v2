import { LogEntry } from '@/types/logger';

import { LogTransport } from './transport';

export class LokiTransport implements LogTransport {
  async log(entry: LogEntry): Promise<void> {
    JSON.stringify({
      timestamp: entry.timestamp,
      level: entry.level,
      message: entry.message,
      metadata: entry.metadata,
    });
  }
}
