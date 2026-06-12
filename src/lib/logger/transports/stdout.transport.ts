import { LogEntry } from '@/types/logger';

import { pinoLogger } from '../pino';
import { LogTransport } from './transport';

export class StdoutTransport implements LogTransport {
  async log(entry: LogEntry): Promise<void> {
    pinoLogger[entry.level](entry.metadata, entry.message);
  }
}
