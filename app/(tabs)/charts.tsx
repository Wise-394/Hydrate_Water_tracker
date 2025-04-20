import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TodayProgressChart from '@/app/components/TodayProgressChart';
import WeeklyConsumptionChart from '../components/WeeklyConsumptionChart';

const ChartScreen = () => {
  const goal = 2000;
  const current = 1200;

  const weeklyData = [
    { value: 1200, label: 'Mon', frontColor: '#5498FF' },
    { value: 1500, label: 'Tue', frontColor: '#5498FF' },
    { value: 1800, label: 'Wed', frontColor: '#5498FF' },
    { value: 2000, label: 'Thu', frontColor: '#3D7BD9' },
    { value: 1700, label: 'Fri', frontColor: '#5498FF' },
    { value: 1900, label: 'Sat', frontColor: '#5498FF' },
    { value: 1600, label: 'Sun', frontColor: '#5498FF' },
  ];

  const pieData = [
    { value: current, color: '#5498FF', label: 'Drank' },
    { value: goal - current, color: '#E6F2FF', label: 'Remaining' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Water Stats</Text>
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressText}>{current}ml</Text>
          <Text style={styles.progressSubText}>of {goal}ml goal</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <TodayProgressChart goal = {goal} current={current}/>
        <WeeklyConsumptionChart goal = {goal} weeklyData={weeklyData}></WeeklyConsumptionChart>
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
  progressTextContainer: {
    marginTop: hp('1%'),
  },
  progressText: {
    fontSize: hp('2.5%'),
    color: 'white',
    fontWeight: '600',
  },
  progressSubText: {
    fontSize: hp('1.6%'),
    color: 'rgba(255,255,255,0.8)',
  },
  sectionTitle: {
    fontSize: hp('2%'),
    color: '#333',
    fontWeight: '600',
    marginBottom: hp('2%'),
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: wp('5%'),
    marginBottom: hp('2.5%'),
    borderWidth: 1,
    borderColor: '#eee',
  },
  elevatedCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  donutWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('22%'),
    marginVertical: hp('1%'),
  },
  donutCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutLabel: {
    fontSize: hp('3.5%'),
    color: '#333',
    fontWeight: 'bold',
  },
  donutSubLabel: {
    fontSize: hp('1.6%'),
    color: '#666',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('1%'),
    gap: wp('6%'),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: wp('4%'),
    height: wp('4%'),
    borderRadius: wp('2%'),
    marginRight: wp('2%'),
  },
  legendText: {
    color: '#666',
    fontSize: hp('1.6%'),
  },
  chartContainer: {
    alignItems: 'center',
    overflow: 'hidden',
  },
  chartNote: {
    color: '#5498FF',
    fontSize: hp('1.6%'),
    textAlign: 'center',
    marginTop: hp('1%'),
    fontWeight: '500',
  },
});

export default ChartScreen;