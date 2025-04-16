import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Index from '@/app/(tabs)/index';
import LogsScreen from '@/app/(tabs)/logs';
import SettingsScreen from '@/app/(tabs)/settings'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Tab = createMaterialTopTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#5498FF',
        },
        tabBarIndicatorStyle: {
          backgroundColor: 'white'
        },
        tabBarShowLabel: false,
        
      }}
    >
      <Tab.Screen
        name="home"
        component={Index}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('@/assets/images/icon/home.png')}
              style={{
                width: hp('3%'),
                height: hp('3%'),
                tintColor: focused ? 'cyan' : 'white',
                
              }}
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
              style={{
                width: hp('3%'),
                height: hp('3%'),
                tintColor: focused ? 'cyan' : 'white',
              }}
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
              style={{
                width: hp('3%'),
                height: hp('3%'),
                tintColor: focused ? 'cyan' : 'white',
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#5498FF'
  }
});
