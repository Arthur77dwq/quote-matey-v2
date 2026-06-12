import pino from 'pino';

import { LogEntry } from '@/types/logger';

import { LogTransport } from './transport';

const pinoInstance = pino({
  level: process.env.LOG_LEVEL ?? 'info',
});

export class PinoTransport implements LogTransport {
  async log(entry: LogEntry): Promise<void> {
    pinoInstance[entry.level](
      {
        ...entry.metadata,
        timestamp: entry.timestamp,
      },
      entry.message,
    );
  }
}
