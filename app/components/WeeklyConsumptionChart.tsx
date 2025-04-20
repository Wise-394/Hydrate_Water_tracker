import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface Props {
  goal: number;
  weeklyData: Array<{
    value: number;
    label: string;
    frontColor?: string;
  }>;
}

const WeeklyConsumptionChart = ({ goal, weeklyData }: Props) => {
  const legendItems = [
    { color: '#5498FF', label: 'Daily Intake' },
    { color: '#3D7BD9', label: 'Highest Day' },
  ];

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>Weekly Consumption</Text>

      <View style={styles.chartContainer}>
        <BarChart
          data={weeklyData}
          scrollToEnd
          barWidth={wp('8%')}
          spacing={wp('5%')}
          initialSpacing={wp('3%')}
          endSpacing={wp('6%')}
          frontColor="#5498FF"
          sideColor="#B6DBFF"
          topColor="#3D7BD9"
          noOfSections={4}
          height={hp('20%')}
          barBorderRadius={6}
          yAxisColor="#888"
          xAxisColor="#888"
          yAxisTextStyle={{
            color: '#666',
            fontSize: hp('1.4%'),
            fontFamily: 'Inter-Medium',
          }}
          xAxisLabelTextStyle={{
            color: '#666',
            fontSize: hp('1.6%'),
            fontFamily: 'Inter-Medium',
          }}
          showReferenceLine1
          referenceLine1Position={goal}
          referenceLine1Config={{
            color: '#5498FF',
            dashWidth: 2,
            dashGap: 3,
            labelText: 'Goal',
            labelTextStyle: {
              color: '#5498FF',
              fontFamily: 'Inter-SemiBold',
              fontSize: hp('1.4%'),
            },
          }}
        />
      </View>

      <View style={styles.legendContainer}>
        {legendItems.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.chartNote}>
        Your daily goal: <Text style={styles.goalText}>{goal} glasses</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: wp('5%'),
    marginBottom: hp('2%'),
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: hp('2.2%'),
    color: '#1E293B',
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
    marginBottom: hp('1.5%'),
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: hp('1%'),
    paddingHorizontal: wp('2%'),
    overflow: 'hidden',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp('1.5%'),
    gap: wp('8%'),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    borderRadius: wp('2.5%'),
    marginRight: wp('2%'),
  },
  legendText: {
    color: '#475569',
    fontSize: hp('1.6%'),
    fontFamily: 'Inter-Medium',
  },
  chartNote: {
    color: '#64748B',
    fontSize: hp('1.6%'),
    textAlign: 'center',
    marginTop: hp('1.5%'),
    fontFamily: 'Inter-Regular',
  },
  goalText: {
    color: '#5498FF',
    fontFamily: 'Inter-SemiBold',
  },
});

export default WeeklyConsumptionChart;
