import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TodayProgressChart from '@/app/components/TodayProgressChart';
import WeeklyConsumptionChart from '../components/WeeklyConsumptionChart';
import { getDailyCupIntake } from '@/utils/keyValue';
import { getTodayWaterLogs, initDB } from '@/utils/database';
import { useSQLiteContext } from 'expo-sqlite';
import { useWaterLog } from '@/contexts/WaterLogContext';

const ChartScreen = () => {
  const { refreshKey } = useWaterLog(); 
  const DEFAULT_DAILY_INTAKE_GOAL = 8
  const [currentIntake, setCurrentIntake] = useState(0);
  const [intakeGoal, setIntakeGoal] = useState(DEFAULT_DAILY_INTAKE_GOAL);
  const db = useSQLiteContext();
  useEffect(() => {

    const initialize = async () => {
      try {
        await initDB(db);
        const goal = getDailyCupIntake()
        const intake = getTodayWaterLogs(db)
        setIntakeGoal(goal as number)
        setCurrentIntake(await intake)
      } catch (error) {
        console.error("DB Init error:", error);
      }
    }
    initialize()
  }, [refreshKey])


  const weeklyData = [
    { value: 8, label: 'Mon', frontColor: '#5498FF' },
    { value: 7, label: 'Tue', frontColor: '#5498FF' },
    { value: 5, label: 'Wed', frontColor: '#5498FF' },
    { value: 4, label: 'Thu', frontColor: '#3D7BD9' },
    { value: 6, label: 'Fri', frontColor: '#5498FF' },
    { value: 7, label: 'Sat', frontColor: '#5498FF' },
    { value: 8, label: 'Sun', frontColor: '#5498FF' },
  ];

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
