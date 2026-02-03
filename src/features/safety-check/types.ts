export type SafetyLevel = 'high' | 'medium' | 'low';

export interface SafetyResult {
  level: SafetyLevel;
  reasons: string[];
  nextSteps: string[];
}
