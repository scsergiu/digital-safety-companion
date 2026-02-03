import type { SafetyLevel, SafetyResult } from './types';

const HIGH_KEYWORDS = [
  'bank',
  'password',
  'login',
  'verification code',
  'otp',
  'gift card',
  'crypto',
  'wire',
  'urgent',
  'whatsapp',
  'link',
];

const MEDIUM_KEYWORDS = ['wifi', 'permission', 'app store', 'bluetooth'];

function hasKeyword(text: string, keywords: string[]): boolean {
  const lower = text.toLowerCase();
  return keywords.some((kw) => lower.includes(kw));
}

function buildResult(level: SafetyLevel, reasons: string[], nextSteps: string[]): SafetyResult {
  return { level, reasons, nextSteps };
}

const EMPTY_REASONS = ['Share a bit more so we can help.'];
const EMPTY_NEXT_STEPS = ["Describe what you saw or what you're unsure about."];

const HIGH_REASONS = ['This mentions things often used in scams.'];
const HIGH_NEXT_STEPS = [
  "Take a pause. Don't click links or share codes.",
  'Contact the real company or person through a known channel if you need to check.',
];

const MEDIUM_REASONS = ["This could be legitimate, but it's worth double-checking."];
const MEDIUM_NEXT_STEPS = [
  'Check the source. Is it from someone or somewhere you trust?',
  "When in doubt, don't tap links or give out info.",
];

const LOW_REASONS = ['Nothing obviously risky stood out.'];
const LOW_NEXT_STEPS = ['If something still feels off, trust your gut and ask someone you trust.'];

export function assessSafety(input: string): SafetyResult {
  const trimmed = input.trim();

  if (trimmed.length === 0) {
    return buildResult('low', EMPTY_REASONS, EMPTY_NEXT_STEPS);
  }

  const hasHigh = hasKeyword(trimmed, HIGH_KEYWORDS);
  const hasMedium = hasKeyword(trimmed, MEDIUM_KEYWORDS);

  if (hasHigh) {
    return buildResult('high', HIGH_REASONS, HIGH_NEXT_STEPS);
  }
  if (hasMedium) {
    return buildResult('medium', MEDIUM_REASONS, MEDIUM_NEXT_STEPS);
  }
  return buildResult('low', LOW_REASONS, LOW_NEXT_STEPS);
}
