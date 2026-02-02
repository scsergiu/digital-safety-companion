import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.screen}>
      <ThemedText type="title" style={styles.title}>
        Digital Safety Companion
      </ThemedText>

      <ThemedText style={styles.lead}>
        Ask quick questions about digital safety and get calm, practical guidance—no jargon.
      </ThemedText>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.cardTitle}>
          Areas
        </ThemedText>

        <ThemedText style={styles.bullet}>• Is this safe?</ThemedText>
        <ThemedText style={styles.bullet}>• Home setup</ThemedText>
        <ThemedText style={styles.bullet}>• Kids &amp; family</ThemedText>
        <ThemedText style={styles.bullet}>• Something feels off</ThemedText>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText type="subtitle" style={styles.cardTitle}>
          Next
        </ThemedText>
        <ThemedText>
          We’ll turn these into real tabs and add your first screen:{' '}
          <ThemedText type="defaultSemiBold">Is this safe?</ThemedText>
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  title: {
    marginTop: 6,
  },
  lead: {
    opacity: 0.9,
    lineHeight: 20,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    gap: 10,
    // Note: we intentionally don't set a background color here.
    // ThemedView will handle light/dark styling based on your app theme.
  },
  cardTitle: {
    marginBottom: 2,
  },
  bullet: {
    lineHeight: 22,
  },
});
