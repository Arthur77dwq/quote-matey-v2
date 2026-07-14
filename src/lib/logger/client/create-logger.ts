import { Logger } from '../logger';
import { getTransports } from '../transports';
import { LogTransport } from '../transports/transport';

export function createClientLogger() {
  const transports: LogTransport[] = getTransports(['client']);

  return new Logger(transports);
}
