import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  instruction: {
    fontSize: 18,
    color: '#202124',
    textAlign: 'center',
    marginBottom: 32,
  },
  imageContainer: {
    marginBottom: 32,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#4285f4',
  },
  placeholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#dadce0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  placeholderText: {
    color: '#5f6368',
    textAlign: 'center',
  },
  captureButton: {
    backgroundColor: '#4285f4',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#34a853',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
});