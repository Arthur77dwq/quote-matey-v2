import { LogEntry } from '@/types/logger';

export interface LogTransport {
  log(entry: LogEntry): Promise<void>;
}
