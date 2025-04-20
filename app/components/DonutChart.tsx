import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface DonutChartProps {
  data: { value: number; color: string }[];
}

const DonutChart = ({ data }: DonutChartProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.chartWrapper}>
        <PieChart
          data={data}
          donut
          innerRadius={hp('10%')}
          radius={hp('12%')}
          innerCircleColor="white" // inner color for center
          centerLabelComponent={() => (
            <Image
              source={require('@/assets/images/water.png')}
              style={styles.centerImage}
            />
          )}
        />
      </View>
    </View>
  );
};

export default DonutChart;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chartWrapper: {
    width: hp('25%'),
    height: hp('25%'),
    borderRadius: hp('12.5%'),
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2, 
  },
  centerImage: {
    width: wp('20%'),
    height: wp('20%'),
    resizeMode: 'contain',
  },
});
