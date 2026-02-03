import type { SafetyResult } from '@/src/features/safety-check';
import { getJSON, setJSON, type StorageAdapter } from '@/src/lib/storage';
import type { HistoryEntry } from './types';

const HISTORY_KEY = '@digital_safety_companion/history';
const MAX_ENTRIES = 20;

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function isHistoryEntry(x: unknown): x is HistoryEntry {
  if (x == null || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.question === 'string' &&
    typeof o.timestamp === 'string' &&
    (o.level === 'high' || o.level === 'medium' || o.level === 'low') &&
    Array.isArray(o.reasons) &&
    Array.isArray(o.nextSteps)
  );
}

function parseEntries(raw: unknown): HistoryEntry[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(isHistoryEntry);
}

export function createHistoryService(storage: StorageAdapter) {
  return {
    async addEntry(question: string, result: SafetyResult): Promise<void> {
      const raw = await getJSON<unknown>(HISTORY_KEY, storage);
      const entries = parseEntries(raw);
      const entry: HistoryEntry = {
        id: generateId(),
        question: question.trim(),
        timestamp: new Date().toISOString(),
        level: result.level,
        reasons: [...result.reasons],
        nextSteps: [...result.nextSteps],
      };
      const next = [entry, ...entries].slice(0, MAX_ENTRIES);
      await setJSON(HISTORY_KEY, next, storage);
    },

    async getEntries(): Promise<HistoryEntry[]> {
      const raw = await getJSON<unknown>(HISTORY_KEY, storage);
      const entries = parseEntries(raw);
      return [...entries].sort((a, b) =>
        b.timestamp > a.timestamp ? 1 : b.timestamp < a.timestamp ? -1 : 0
      );
    },

    async getEntry(id: string): Promise<HistoryEntry | null> {
      const entries = await this.getEntries();
      return entries.find((e) => e.id === id) ?? null;
    },
  };
}

export type HistoryService = ReturnType<typeof createHistoryService>;
