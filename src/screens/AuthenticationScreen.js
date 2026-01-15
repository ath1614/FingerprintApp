import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '400',
    color: '#202124',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#5f6368',
  },
});