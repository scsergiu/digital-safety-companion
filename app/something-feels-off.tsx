import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function SomethingFeelsOffScreen() {
  return (
    <ThemedView style={styles.screen}>
      <ThemedText type="title" style={styles.title}>
        Something Feels Off
      </ThemedText>
      <ThemedText style={styles.body}>
        When something doesn&apos;t feel right but you&apos;re not sure what—we&apos;ll help you
        spot and respond to it.
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
