import { createClientLogger } from './client/create-logger';
import { createServerLogger } from './server/create-logger';

export const serverLogger = createServerLogger();
export const clientLogger = createClientLogger();
