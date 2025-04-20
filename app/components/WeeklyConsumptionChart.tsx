import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface Props {
    goal : number
    weeklyData: []
}

const WeeklyConsumptionChart = ({ goal, weeklyData } : Props) => {
  // Define legend items
  const legendItems = [
    { color: '#5498FF', label: 'Daily Intake' },
    { color: '#3D7BD9', label: 'Highest Day' },
  ];

  return (
    <View style={styles.container}>
      <BarChart
        data={weeklyData}
        barWidth={wp('10%')}
        frontColor="#5498FF"
        sideColor="#B6DBFF"
        topColor="#3D7BD9"
        yAxisColor="#888"
        xAxisColor="#888"
        noOfSections={4}
        height={hp('22%')}
        width={wp('80%')}
        barBorderRadius={4}
        yAxisTextStyle={{ color: '#666', fontSize: hp('1.4%') }}
        xAxisLabelTextStyle={{ color: '#666', fontSize: hp('1.6%') }}
        showReferenceLine1
        referenceLine1Position={goal}
        referenceLine1Config={{
          color: '#5498FF',
          dashWidth: 2,
          dashGap: 3,
          labelText: 'Goal',
          labelTextStyle: {color: '#5498FF'}
        }}
      />
      {/* Legend built into the chart component */}
      <View style={styles.legendContainer}>
        {legendItems.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, {backgroundColor: item.color}]} />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.chartNote}>Daily goal: {goal}ml</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    overflow: 'hidden',
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
  chartNote: {
    color: '#5498FF',
    fontSize: hp('1.6%'),
    textAlign: 'center',
    marginTop: hp('1%'),
    fontWeight: '500',
  },
});

export default WeeklyConsumptionChart;