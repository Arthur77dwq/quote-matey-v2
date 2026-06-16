import { Runtime } from '@/types/logger';

import { loggerConfig } from '../config';

export function getTransports(runtimes: Runtime[]) {
  return loggerConfig
    .filter((config) => {
      return (
        config.enabled &&
        runtimes.some((runtime) => config.runtime.includes(runtime))
      );
    })
    .map((config) => config.transport());
}
