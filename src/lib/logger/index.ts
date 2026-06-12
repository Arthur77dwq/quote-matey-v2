import { Logger } from './logger';
import { PinoTransport } from './transports/pino.transport';

export const logger = new Logger([new PinoTransport()]);
