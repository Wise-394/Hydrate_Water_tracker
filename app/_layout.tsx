import { Stack } from "expo-router";
import React from "react";
import { SQLiteProvider } from 'expo-sqlite';
import { WaterLogProvider } from '@/contexts/WaterLogContext';

export default function RootLayout() {
  return (
    <WaterLogProvider>
      <SQLiteProvider databaseName="waterLogs">
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SQLiteProvider>
    </WaterLogProvider>
  );
}
