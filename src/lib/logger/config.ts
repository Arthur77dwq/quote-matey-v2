import { Runtime } from '@/types/logger';

import { ApiTransport } from './transports/api.transport';
import { ConsoleTransport } from './transports/console.transport';
import { LokiTransport } from './transports/loki.transport';
import { StdoutTransport } from './transports/stdout.transport';
import { LogTransport } from './transports/transport';

interface LoggerConfig {
  runtime: Runtime[];
  enabled: boolean;
  transport: () => LogTransport;
}

export const loggerConfig: LoggerConfig[] = [
  {
    runtime: ['server', 'client'],
    enabled: process.env.NODE_ENV === 'development',
    transport: () => new ConsoleTransport(),
  },
  {
    runtime: ['client'],
    enabled: process.env.NODE_ENV === 'production',
    transport: () => new ApiTransport(),
  },
  {
    runtime: ['server', 'client'],
    enabled: process.env.LOKI_ENABLED === 'true',
    transport: () => new LokiTransport(),
  },
  {
    runtime: ['server'],
    enabled: process.env.NODE_ENV === 'production',
    transport: () => new StdoutTransport(),
  },
];
