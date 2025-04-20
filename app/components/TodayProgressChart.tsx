import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface Props {
  goal: number;
  current: number;
}

const TodayProgressChart = ({ goal, current }: Props) => {
  const pieData = [
    { value: current, color: '#5498FF', label: 'Drank' },
    { value: goal - current, color: '#e6f2ff', label: 'Remaining' },
  ];
  
  const completionPercentage = Math.floor((current / goal) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.donutWrapper}>
        <PieChart
          data={pieData}
          donut
          radius={hp('10%')}
          innerRadius={hp('5%')}
          innerCircleColor="white"
          showText={false}
          centerLabelComponent={() => (
            <View style={styles.donutCenter}>
              <Text style={styles.donutLabel}>{completionPercentage}%</Text>
              <Text style={styles.donutSubLabel}>Completed</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.legendContainer}>
        {pieData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[
              styles.legendColor, 
              { 
                backgroundColor: item.color,
                ...(item.color === 'white' && {
                  borderWidth: 1,
                  borderColor: '#ccc'
                })
              }
            ]} />
            <Text style={styles.legendText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white', // Added white background for better contrast
    borderRadius: 12,
    padding: wp('5%'),
    marginBottom: hp('2.5%'),
    borderWidth: 1,
    borderColor: '#eee',
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
});

export default TodayProgressChart;