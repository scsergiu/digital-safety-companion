import { getStorage } from '@/src/lib/storage';
import { createHistoryService } from './historyService';

export type { HistoryEntry } from './types';
export { createHistoryService } from './historyService';
export type { HistoryService } from './historyService';

export const historyService = createHistoryService(getStorage());
