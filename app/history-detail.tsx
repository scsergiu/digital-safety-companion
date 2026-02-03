import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { historyService } from '@/src/features/history';
import type { HistoryEntry } from '@/src/features/history';

export default function HistoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [entry, setEntry] = useState<HistoryEntry | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    if (!id) return;
    historyService.getEntry(id).then(setEntry);
  }, [id]);

  if (id == null) {
    return (
      <ThemedView style={styles.screen}>
        <ThemedText>Missing entry.</ThemedText>
      </ThemedView>
    );
  }

  if (entry === null) {
    return (
      <ThemedView style={styles.screen}>
        <ThemedText>Loading…</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.screen}>
      <ThemedText type="title" style={styles.title}>
        {entry.level.charAt(0).toUpperCase() + entry.level.slice(1)}
      </ThemedText>
      <View style={[styles.card, { backgroundColor: isDark ? '#1c1c1e' : '#f2f2f7' }]}>
        <ThemedText type="subtitle" style={styles.label}>
          Question
        </ThemedText>
        <ThemedText style={styles.question}>{entry.question}</ThemedText>
      </View>
      <View style={[styles.card, { backgroundColor: isDark ? '#1c1c1e' : '#f2f2f7' }]}>
        <ThemedText type="subtitle" style={styles.label}>
          Reasons
        </ThemedText>
        {entry.reasons.map((r, i) => (
          <ThemedText key={i} style={styles.bullet}>
            • {r}
          </ThemedText>
        ))}
        <ThemedText type="subtitle" style={[styles.label, styles.nextLabel]}>
          Next steps
        </ThemedText>
        {entry.nextSteps.map((s, i) => (
          <ThemedText key={i} style={styles.step}>
            {i + 1}. {s}
          </ThemedText>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  title: {
    marginTop: 12,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  label: {
    marginBottom: 4,
  },
  question: {
    fontSize: 17,
    lineHeight: 24,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 22,
  },
  nextLabel: {
    marginTop: 12,
  },
  step: {
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.9,
  },
});
