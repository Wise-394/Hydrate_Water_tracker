import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';
import { initDB, getAllWaterLogs } from '@/utils/database';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function LogsScreen() {
  const db = useSQLiteContext();
  const [data, setData] = useState<{ id: number; date: string }[]>([]);

  useFocusEffect(
    useCallback(() => {
      const initialize = async () => {
        await initDB(db);
        const logs = await getAllWaterLogs(db) as { id: number; date: string }[];

        // Format each log date into day and time
        const formattedLogs = logs.map(log => {
          const dateObj = new Date(log.date);

          const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          };


          const formattedTime = dateObj.toLocaleString('en-US', options);

          return { ...log, date: `${formattedTime}` };
        });

        setData(formattedLogs);
      };

      initialize();
    }, [db])
  );

  return (
    <View style={{ padding: 16 }}>
      <FlatList
        style={styles.container}
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.border}>{item.date}</Text>}
        ListEmptyComponent={<Text style = {styles.border}>No water logs found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderWidth: 1,
    backgroundColor: '#e0fcfc',
    borderRadius: 15,
  },
  border: {
    padding: hp('3%'),
  },
});
