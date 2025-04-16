import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Index from '@/app/(tabs)/index';
import LogsScreen from '@/app/(tabs)/logs';
import SettingsScreen from '@/app/(tabs)/settings';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Tab = createMaterialTopTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#5498FF',
          elevation: 0, 
          shadowOpacity: 0,
          height: hp('6%'),
          paddingTop: hp('0.5%'),
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'transparent'
        },
        tabBarShowLabel: false,
        tabBarPressColor: 'rgba(255,255,255,0.2)',
      }}
    >
      <Tab.Screen
        name="home"
        component={Index}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('@/assets/images/icon/home.png')}
              style={[
                styles.tabIcon,
                {
                  tintColor: focused ? 'white' : 'rgba(255,255,255,0.7)',
                  transform: [{ scale: focused ? 1.1 : 1 }],
                },
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="logs"
        component={LogsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('@/assets/images/icon/droplet.png')}
              style={[
                styles.tabIcon,
                {
                  tintColor: focused ? 'white' : 'rgba(255,255,255,0.7)',
                  transform: [{ scale: focused ? 1.1 : 1 }],
                },
              ]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('@/assets/images/icon/settings.png')}
              style={[
                styles.tabIcon,
                {
                  tintColor: focused ? 'white' : 'rgba(255,255,255,0.7)',
                  transform: [{ scale: focused ? 1.1 : 1 }],
                },
              ]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: hp('3.2%'),
    height: hp('3.2%'),
    marginBottom: hp('0.5%'),
  },
});