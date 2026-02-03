import type { SafetyLevel } from '@/src/features/safety-check';

export interface HistoryEntry {
  id: string;
  question: string;
  timestamp: string; // ISO
  level: SafetyLevel;
  reasons: string[];
  nextSteps: string[];
}
