import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native'; // Import Image from react-native

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#008EE5',
        },
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: '#68e1e1',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => (
            <Image source={require('@/assets/images/icon/home.png')} />
          ),
        }}
      />
      <Tabs.Screen name="logs"
        options={{
          tabBarIcon: () => (
            <Image source={require('@/assets/images/icon/droplet.png')} />
          ),
        }} />
      <Tabs.Screen name="settings"
        options={{
          tabBarIcon: () => (
            <Image source={require('@/assets/images/icon/settings.png')} />
          ),
        }} />
    </Tabs>
  );
}
