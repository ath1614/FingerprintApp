import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import LandingScreen from './src/screens/LandingScreen';
import EnrollmentScreen from './src/screens/EnrollmentScreen';
import AuthenticationScreen from './src/screens/AuthenticationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator 
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Enrollment" component={EnrollmentScreen} />
        <Stack.Screen name="Authentication" component={AuthenticationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
