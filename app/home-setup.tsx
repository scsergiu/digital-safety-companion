import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeSetupScreen() {
  return (
    <ThemedView style={styles.screen}>
      <ThemedText type="title" style={styles.title}>
        Home Setup
      </ThemedText>
      <ThemedText style={styles.body}>
        Guidance on securing your home network, devices, and accounts in one place.
      </ThemedText>
      <ThemedText style={styles.body}>Coming soon.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    marginBottom: 8,
  },
  body: {
    fontSize: 17,
    lineHeight: 24,
    opacity: 0.9,
  },
});
