import { useEffect, useState } from 'react';
import { StyleSheet, Pressable, View, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { historyService } from '@/src/features/history';
import type { HistoryEntry } from '@/src/features/history';

const TRUNCATE_LEN = 50;

function truncate(s: string, max: number): string {
  const t = s.trim();
  if (t.length <= max) return t;
  return t.slice(0, max).trim() + '…';
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const sameDay =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
  if (sameDay) {
    return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  }
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

export default function HistoryScreen() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const load = async () => {
    const list = await historyService.getEntries();
    setEntries(list);
  };

  useEffect(() => {
    load();
  }, []);

  const onEntryPress = (id: string) => {
    router.push({
      pathname: '/history-detail',
      params: { id },
    } as unknown as Parameters<typeof router.push>[0]);
  };

  const renderItem = ({ item }: { item: HistoryEntry }) => (
    <Pressable
      style={[styles.row, { backgroundColor: isDark ? '#1c1c1e' : '#f2f2f7' }]}
      onPress={() => onEntryPress(item.id)}
    >
      <View style={styles.rowContent}>
        <ThemedText type="subtitle" style={styles.rowLevel}>
          {item.level.charAt(0).toUpperCase() + item.level.slice(1)}
        </ThemedText>
        <ThemedText style={styles.rowQuestion} numberOfLines={2}>
          {truncate(item.question, TRUNCATE_LEN)}
        </ThemedText>
        <ThemedText style={styles.rowTime}>{formatTimestamp(item.timestamp)}</ThemedText>
      </View>
    </Pressable>
  );

  return (
    <ThemedView style={styles.screen}>
      <ThemedText type="title" style={styles.title}>
        History
      </ThemedText>
      <ThemedText style={styles.description}>Past safety checks (newest first).</ThemedText>
      {entries.length === 0 ? (
        <ThemedText style={styles.empty}>No checks yet.</ThemedText>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  title: {
    marginTop: 12,
  },
  description: {
    fontSize: 17,
    opacity: 0.7,
    lineHeight: 24,
    marginBottom: 16,
  },
  empty: {
    opacity: 0.6,
    fontSize: 17,
  },
  listContent: {
    paddingBottom: 24,
  },
  row: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  rowContent: {
    gap: 4,
  },
  rowLevel: {
    textTransform: 'capitalize',
  },
  rowQuestion: {
    fontSize: 16,
    lineHeight: 22,
  },
  rowTime: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 4,
  },
});
