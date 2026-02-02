import { useState } from 'react';
import { StyleSheet, TextInput, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function IsThisSafeScreen() {
  const [question, setQuestion] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleCheck = () => {
    // Placeholder - no action yet
  };

  return (
    <ThemedView style={styles.screen}>
      <ThemedText type="title" style={styles.title}>
        Is this safe?
      </ThemedText>

      <ThemedText style={styles.description}>
        Type your question below and we'll help you understand if something is safe.
      </ThemedText>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5',
            color: isDark ? '#fff' : '#000',
            borderColor: isDark ? '#444' : '#ddd',
          },
        ]}
        placeholder="e.g., Is this email from my bank real?"
        placeholderTextColor={isDark ? '#888' : '#999'}
        value={question}
        onChangeText={setQuestion}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleCheck}>
        <ThemedText style={styles.buttonText}>Check</ThemedText>
      </Pressable>

      <ThemedView style={styles.placeholder}>
        <ThemedText style={styles.placeholderText}>
          This will provide guidance in a future version
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
  description: {
    opacity: 0.8,
    lineHeight: 22,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    minHeight: 100,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  placeholder: {
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  placeholderText: {
    opacity: 0.6,
    fontStyle: 'italic',
  },
});
