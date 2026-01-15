import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { theme } from '../theme';

export default function EnrollmentScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);

  const captureImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera permission is required');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const saveAndContinue = () => {
    if (!imageUri) {
      Alert.alert('No Image', 'Please capture a fingerprint first');
      return;
    }
    navigation.navigate('Authentication', { referenceImage: imageUri });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.instruction}>Place your finger and capture image</Text>
        
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>No image captured</Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.captureButton} onPress={captureImage}>
          <Text style={styles.buttonText}>
            {imageUri ? 'Retake' : 'Capture Fingerprint'}
          </Text>
        </TouchableOpacity>

        {imageUri && (
          <TouchableOpacity style={styles.saveButton} onPress={saveAndContinue}>
            <Text style={styles.buttonText}>Save Fingerprint & Continue</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: theme.spacing.xl,
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  instruction: {
    fontSize: 18,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  imageContainer: {
    marginBottom: theme.spacing.xl,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
  placeholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
  },
  placeholderText: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  captureButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: 24,
    marginBottom: theme.spacing.md,
  },
  saveButton: {
    backgroundColor: '#34a853',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: 24,
  },
  buttonText: {
    ...theme.typography.button,
    color: theme.colors.background,
    textAlign: 'center',
  },
});