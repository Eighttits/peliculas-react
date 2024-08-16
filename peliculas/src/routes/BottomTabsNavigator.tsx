import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import HomeStackNavigator from './HomeStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import SavedMoviesScreen from '../screens/movies/SavedMoviesScreen';
import ProfileScreen from '../screens/user/UserProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MyTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: 'rgb(128, 128, 128)',  // Gris personalizado para el color primario
      background: 'rgb(0, 0, 0)',    // Negro para el fondo
      card: 'rgb(18, 18, 18)',       // Color para el fondo de la tarjeta
      text: 'rgb(229, 229, 231)',    // Color para el texto
      border: 'rgb(39, 39, 41)',     // Color para los bordes
      notification: 'rgb(255, 69, 58)', // Color para notificaciones (como badges)
    },
};

const BottomTabsNavigator = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  color={color}
                  size={size}
                />
              ),
            headerShown: false, 
          }}
        />
        <Tab.Screen
          name="Guardados"
          component={SavedMoviesScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={focused ? "bookmark" : "bookmark-outline"}
                  color={color}
                  size={size}
                />
            ),
            headerShown: false, // Para ocultar el header duplicado
          }}
        />
        <Tab.Screen
          name="Mi perfil"
          component={ProfileStackNavigator}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  color={color}
                  size={size}
                />
            ),
            headerShown: false, // Para ocultar el header duplicado
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomTabsNavigator;
