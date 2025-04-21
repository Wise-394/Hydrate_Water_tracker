import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TodayProgressChart from '@/app/components/TodayProgressChart';
import WeeklyConsumptionChart from '../components/WeeklyConsumptionChart';
import { getDailyCupIntake } from '@/utils/keyValue';
import { getTodayWaterLogs, getWaterLogsLast7Days, initDB } from '@/utils/database';
import { useSQLiteContext } from 'expo-sqlite';
import { useWaterLog } from '@/contexts/WaterLogContext';

const ChartScreen = () => {
  const { refreshKey } = useWaterLog();
  const DEFAULT_DAILY_INTAKE_GOAL = 8;
  const [currentIntake, setCurrentIntake] = useState(0);
  const [intakeGoal, setIntakeGoal] = useState(DEFAULT_DAILY_INTAKE_GOAL);
  const [weeklyData, setWeeklyData] = useState<WeeklyDataItem[]>([]);
  const db = useSQLiteContext();

  type WeeklyDataItem = {
    value: number;
    label: string;
    frontColor: string;
  };
  


  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };


  const getWeekdayLabel = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' }); 
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        await initDB(db);

        const goal = getDailyCupIntake();
        const intake = await getTodayWaterLogs(db);
        const weeklyLogs = await getWaterLogsLast7Days(db);

        const today = new Date();
        const days = Array.from({ length: 7 }, (_, i) => {
          const d = new Date();
          d.setDate(today.getDate() - i); 
          const dateKey = formatDate(d);
          const label = getWeekdayLabel(d);
        
          const match = weeklyLogs.find(item => item.date === dateKey);
        
          return {
            value: match?.count || 0,
            label,
            frontColor: '#5498FF',
          };
        }).reverse();

        setWeeklyData(days);
        setIntakeGoal(goal as number);
        setCurrentIntake(intake);
      } catch (error) {
        console.error("DB Init error:", error);
      }
    };

    initialize();
  }, [refreshKey]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Water Stats</Text>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <TodayProgressChart goal={intakeGoal} current={currentIntake} />
        <WeeklyConsumptionChart goal={intakeGoal} weeklyData={weeklyData} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#5498FF',
  },
  header: {
    backgroundColor: '#5498FF',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('3%'),
  },
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff',
    marginTop: -20,
  },
  contentContainer: {
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('5%'),
  },
  title: {
    fontSize: hp('3%'),
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChartScreen;
