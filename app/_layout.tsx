import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native"; // Import StatusBar and useColorScheme
import { SQLiteProvider } from 'expo-sqlite';
import { WaterLogProvider } from '@/contexts/WaterLogContext';

export default function RootLayout() {
  const scheme = useColorScheme(); 

  return (
    <>

      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={scheme === 'dark' ? '#000' : '#FFF'} 
      />
      
      <WaterLogProvider>
        <SQLiteProvider databaseName="waterLogs">
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SQLiteProvider>
      </WaterLogProvider>
    </>
  );
}
