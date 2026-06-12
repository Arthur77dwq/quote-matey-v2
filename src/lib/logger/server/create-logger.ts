import { Logger } from '../logger';
import { getTransports } from '../transports';
import { LogTransport } from '../transports/transport';

export function createServerLogger() {
  const transports: LogTransport[] = getTransports(['server']);

  return new Logger(transports);
}
