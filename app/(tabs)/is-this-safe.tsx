import { useState } from 'react';
import { StyleSheet, TextInput, Pressable, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { assessSafety } from '@/src/features/safety-check';
import type { SafetyResult } from '@/src/features/safety-check';

export default function IsThisSafeScreen() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<SafetyResult | null>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleCheck = () => {
    setResult(assessSafety(question));
  };

  return (
    <ThemedView style={styles.screen}>
      <ThemedText type="title" style={styles.title}>
        Is this safe?
      </ThemedText>

      <ThemedText style={styles.description}>
        {`Describe something you're unsure about.`}
      </ThemedText>

      {/* Card section containing input and button */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: isDark ? '#1c1c1e' : '#f2f2f7',
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDark ? '#2c2c2e' : '#ffffff',
              color: isDark ? '#fff' : '#000',
            },
          ]}
          placeholder="Describe the situation or question"
          placeholderTextColor={isDark ? '#8e8e93' : '#8e8e93'}
          value={question}
          onChangeText={setQuestion}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={handleCheck}
        >
          <ThemedText style={styles.buttonText}>Check</ThemedText>
        </Pressable>
      </View>

      {result !== null ? (
        <View
          style={[
            styles.card,
            styles.resultCard,
            { backgroundColor: isDark ? '#1c1c1e' : '#f2f2f7' },
          ]}
        >
          <ThemedText type="subtitle" style={styles.resultLevel}>
            {result.level.charAt(0).toUpperCase() + result.level.slice(1)}
          </ThemedText>
          {result.reasons.map((r, i) => (
            <ThemedText key={i} style={styles.resultReason}>
              {r}
            </ThemedText>
          ))}
          {result.nextSteps.map((s, i) => (
            <ThemedText key={i} style={styles.resultStep}>
              {i + 1}. {s}
            </ThemedText>
          ))}
        </View>
      ) : (
        <ThemedText style={styles.guidanceText}>
          This will provide calm guidance in a future version.
        </ThemedText>
      )}
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
  description: {
    fontSize: 17,
    opacity: 0.7,
    lineHeight: 24,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    gap: 16,
    marginTop: 8,
  },
  input: {
    borderRadius: 12,
    padding: 16,
    fontSize: 17,
    minHeight: 120,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  resultCard: {
    marginTop: 0,
  },
  resultLevel: {
    marginBottom: 8,
  },
  resultReason: {
    marginBottom: 8,
    lineHeight: 22,
  },
  resultStep: {
    marginBottom: 4,
    lineHeight: 22,
    opacity: 0.9,
  },
  guidanceText: {
    fontSize: 15,
    opacity: 0.5,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
});
