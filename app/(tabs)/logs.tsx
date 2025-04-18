import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';
import { initDB, getAllWaterLogs } from '@/utils/database';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LogsList from '@/app/components/LogsList';
import { useWaterLog } from '@/contexts/WaterLogContext';

interface WaterLog {
  id: number;
  date: string;
  time: string;
}

const getLogs = async (db: any) => {
  // Fetching all water logs
  const logs = await getAllWaterLogs(db) as { id: number; date: string }[];

  // Formatting the logs
  const formattedLogs = logs.map(log => {
    const dateObj = new Date(log.date);

    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    };

    const formattedDate = dateObj.toLocaleString('en-US', dateOptions);
    const formattedTime = dateObj.toLocaleString('en-US', timeOptions);

    return {
      id: log.id,
      date: formattedDate,
      time: formattedTime,
    };
  });

  return formattedLogs;
};
export default function LogsScreen() {
  const { refreshKey } = useWaterLog();
  const db = useSQLiteContext();
  const [data, setData] = useState<WaterLog[]>([]);

  useEffect(() => {
    const initialize = async () => {
      await initDB(db);
      const logs = await getLogs(db);
      setData(logs);
    };

    initialize();
  }, [db, refreshKey]);
  



  return (
      <><View style={styles.header}>
      <Text style={styles.title}>Hydration Logs</Text>
      <Text style={styles.subtitle}>Your water intake history</Text>
    </View><View style={styles.logsContainer}>
        {data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={LogsList}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false} />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No water logs found</Text>
            <Text style={styles.emptySubtext}>Your hydration history will appear here</Text>
          </View>
        )}
      </View></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: hp('4%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('5%'),
  },
  title: {
    fontSize: hp('3.5%'),
    fontWeight: 'bold',
    color: '#2c3e50',
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: hp('1.8%'),
    color: '#7f8c8d',
    marginTop: hp('0.5%'),
    fontFamily: 'Inter-Regular',
  },
  logsContainer: {
    flex: 1,
    paddingHorizontal: wp('5%'),
    paddingTop: hp('1%'),
  },
  listContent: {
    paddingBottom: hp('3%'),
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp('15%'),
  },
  emptyText: {
    fontSize: hp('2.5%'),
    color: '#2c3e50',
    fontFamily: 'Inter-SemiBold',
    marginBottom: hp('1%'),
  },
  emptySubtext: {
    fontSize: hp('1.8%'),
    color: '#7f8c8d',
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    paddingHorizontal: wp('10%'),
  },
});