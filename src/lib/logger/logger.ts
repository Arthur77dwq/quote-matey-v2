import { LogEntry, LogLevel } from '@/types/logger';

import { LogTransport } from './transports/transport';

export class Logger {
  constructor(private readonly transports: LogTransport[]) {}

  private async write(
    level: LogLevel,
    message: string,
    metadata?: Record<string, unknown>,
  ) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      metadata,
    };

    await Promise.all(this.transports.map((t) => t.log(entry)));
  }

  info(message: string, metadata?: Record<string, unknown>) {
    return this.write('info', message, metadata);
  }

  warn(message: string, metadata?: Record<string, unknown>) {
    return this.write('warn', message, metadata);
  }

  error(message: string, metadata?: Record<string, unknown>) {
    return this.write('error', message, metadata);
  }

  debug(message: string, metadata?: Record<string, unknown>) {
    return this.write('debug', message, metadata);
  }

  trace(message: string, metadata?: Record<string, unknown>) {
    return this.write('trace', message, metadata);
  }

  fatal(message: string, metadata?: Record<string, unknown>) {
    return this.write('fatal', message, metadata);
  }
}
