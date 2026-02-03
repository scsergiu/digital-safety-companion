import type { StorageAdapter } from '@/src/lib/storage';
import { createHistoryService } from './historyService';

function inMemoryStorage(): StorageAdapter {
  const map = new Map<string, string>();
  return {
    getItem: async (key) => map.get(key) ?? null,
    setItem: async (key, value) => {
      map.set(key, value);
    },
    removeItem: async (key) => {
      map.delete(key);
    },
  };
}

const sampleResult = {
  level: 'high' as const,
  reasons: ['Reason'],
  nextSteps: ['Step'],
};

describe('historyService', () => {
  it('adds entry and returns newest first', async () => {
    const storage = inMemoryStorage();
    const service = createHistoryService(storage);
    await service.addEntry('First', sampleResult);
    await service.addEntry('Second', sampleResult);
    const entries = await service.getEntries();
    expect(entries.length).toBe(2);
    expect(entries[0].question).toBe('Second');
    expect(entries[1].question).toBe('First');
  });

  it('caps at 20 entries with newest first', async () => {
    const storage = inMemoryStorage();
    const service = createHistoryService(storage);
    for (let i = 0; i < 25; i++) {
      await service.addEntry(`Question ${i}`, sampleResult);
    }
    const entries = await service.getEntries();
    expect(entries.length).toBe(20);
    const questions = entries.map((e) => e.question);
    expect(questions).toContain('Question 24');
    expect(questions).toContain('Question 5');
    expect(questions).not.toContain('Question 0');
  });

  it('returns safe empty array for corrupt storage', async () => {
    const storage = inMemoryStorage();
    await storage.setItem('@digital_safety_companion/history', 'not json');
    const service = createHistoryService(storage);
    const entries = await service.getEntries();
    expect(entries).toEqual([]);
  });

  it('returns safe empty array for non-array data', async () => {
    const storage = inMemoryStorage();
    await storage.setItem('@digital_safety_companion/history', '{"foo":1}');
    const service = createHistoryService(storage);
    const entries = await service.getEntries();
    expect(entries).toEqual([]);
  });

  it('returns safe empty array for invalid entry shape', async () => {
    const storage = inMemoryStorage();
    await storage.setItem('@digital_safety_companion/history', '[{"id":"x"}]');
    const service = createHistoryService(storage);
    const entries = await service.getEntries();
    expect(entries).toEqual([]);
  });

  it('getEntry returns entry by id', async () => {
    const storage = inMemoryStorage();
    const service = createHistoryService(storage);
    await service.addEntry('Find me', sampleResult);
    const entries = await service.getEntries();
    const id = entries[0].id;
    const one = await service.getEntry(id);
    expect(one).not.toBeNull();
    expect(one?.question).toBe('Find me');
    expect(one?.level).toBe('high');
  });

  it('getEntry returns null for unknown id', async () => {
    const storage = inMemoryStorage();
    const service = createHistoryService(storage);
    const one = await service.getEntry('nonexistent');
    expect(one).toBeNull();
  });

  it('add same question twice creates two entries with different ids', async () => {
    const storage = inMemoryStorage();
    const service = createHistoryService(storage);
    await service.addEntry('Same question', sampleResult);
    await service.addEntry('Same question', sampleResult);
    const entries = await service.getEntries();
    expect(entries.length).toBe(2);
    expect(entries[0].id).not.toBe(entries[1].id);
    expect(entries[0].question).toBe('Same question');
    expect(entries[1].question).toBe('Same question');
  });

  it('deserializes stored entries and returns newest first', async () => {
    const storage = inMemoryStorage();
    const service = createHistoryService(storage);
    await service.addEntry('A', { level: 'low', reasons: ['r1'], nextSteps: ['s1'] });
    await service.addEntry('B', { level: 'medium', reasons: ['r2'], nextSteps: ['s2'] });
    const entries = await service.getEntries();
    expect(entries.length).toBe(2);
    const byQuestion = Object.fromEntries(entries.map((e) => [e.question, e]));
    expect(byQuestion.A?.level).toBe('low');
    expect(byQuestion.B?.level).toBe('medium');
  });
});
