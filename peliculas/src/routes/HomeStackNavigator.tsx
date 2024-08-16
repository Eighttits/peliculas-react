import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home/HomeScreen';
import MovieDetailsScreen from '../screens/movies/MovieDetailsScreen';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="Details" component={MovieDetailsScreen} options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
