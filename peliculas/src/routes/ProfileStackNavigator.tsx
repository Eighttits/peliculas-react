import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/user/LoginScreen';
import SignInScreen from '../screens/user/SignInScreen';
import HomeScreen from '../screens/home/HomeScreen'

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'SignIn' }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
