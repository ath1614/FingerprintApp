import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function AuthenticationScreen({ route }) {
  const { referenceImage } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentication Screen</Text>
      <Text style={styles.subtitle}>Reference image stored: {referenceImage ? 'Yes' : 'No'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  title: {
    ...theme.typography.title,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    ...theme.typography.subtitle,
  },
});