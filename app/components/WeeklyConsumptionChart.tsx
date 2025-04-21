import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
  const scrollViewRef = useRef<ScrollView>(null);

  // Scroll to the end after the component mounts or when data changes
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100); // Delay to ensure content is fully rendered
    }
  }, [weeklyData]);

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>Weekly Consumption</Text>

      <ScrollView
        horizontal
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chartContainer}
      >
        <BarChart
          data={weeklyData}
          autoShiftLabels
          isAnimated
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
          showReferenceLine1={true}
          referenceLine1Position={goal}
          referenceLine1Config={{
            color: '#003366', // Dark blue color
            dashWidth: 6,
            dashGap: 2,
            labelText: 'Goal',
            labelTextStyle: {
              color: '#003366', // Dark blue for the label
              fontFamily: 'Inter-SemiBold',
              fontSize: hp('1.6%'),
            },
          }}
        />
      </ScrollView>

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
