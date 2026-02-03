import AsyncStorage from '@react-native-async-storage/async-storage';

export interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

const defaultStorage: StorageAdapter = {
  getItem: (key) => AsyncStorage.getItem(key),
  setItem: (key, value) => AsyncStorage.setItem(key, value),
  removeItem: (key) => AsyncStorage.removeItem(key),
};

export function getStorage(): StorageAdapter {
  return defaultStorage;
}

export async function getJSON<T>(
  key: string,
  storage: StorageAdapter = defaultStorage
): Promise<T | null> {
  const raw = await storage.getItem(key);
  if (raw == null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function setJSON(
  key: string,
  value: unknown,
  storage: StorageAdapter = defaultStorage
): Promise<void> {
  await storage.setItem(key, JSON.stringify(value));
}
