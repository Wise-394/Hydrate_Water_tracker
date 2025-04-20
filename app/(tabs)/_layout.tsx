import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Index from '@/app/(tabs)/index';
import LogsScreen from '@/app/(tabs)/logs';
import SettingsScreen from '@/app/(tabs)/settings';
import ChartScreen from '@/app/(tabs)/charts';
import { Ionicons } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
          backgroundColor: 'transparent',
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
            <Ionicons
              name="home"
              size={hp('3.2%')}
              color={focused ? 'white' : 'rgba(255,255,255,0.7)'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="logs"
        component={LogsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="water"
              size={hp('3.2%')}
              color={focused ? 'white' : 'rgba(255,255,255,0.7)'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="charts"
        component={ChartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="bar-chart"
              size={hp('3.2%')}
              color={focused ? 'white' : 'rgba(255,255,255,0.7)'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings"
              size={hp('3.2%')}
              color={focused ? 'white' : 'rgba(255,255,255,0.7)'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
