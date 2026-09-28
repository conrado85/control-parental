import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import DashBoardScreen from './src/screens/tutor/DashBoardScreen';
import SecurityScreen from './src/screens/tutor/SecurityScreen';
import StatsScreen from './src/screens/tutor/StatsScreen';
import DevicesScreen from './src/screens/tutor/DevicesScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const insets = useSafeAreaInsets(); // Detecta la barra de botones/navegación de Android

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#475569',
        tabBarIcon: ({ focused }) => {
          let icon = '🏠';
          if (route.name === 'Inicio') {
            icon = '🏠';
          } else if (route.name === 'Seguridad') {
            icon = '🛡️';
          }
          return (
            <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.6 }}>
              {icon}
            </Text>
          );
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          // Suma la altura de la barra del celular para que la de la app quede más arriba
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 6,
          elevation: 12,
        },
      })}
    >
      <Tab.Screen
        name="Inicio"
        component={DashBoardScreen}
        options={{ tabBarLabel: 'Inicio' }}
      />
      <Tab.Screen
        name="Seguridad"
        component={SecurityScreen}
        options={{ tabBarLabel: 'Reglas' }}
      />
      <Tab.Screen
        name="Estadísticas"
        component={StatsScreen}
        options={{ tabBarLabel: 'Estadísticas' }}
      />
      <Tab.Screen
        name="Dispositivos"
        component={DevicesScreen}
        options={{ tabBarLabel: 'Dispositivos' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}