import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface WaterLog {
  id: number;
  date: string;
  time: string;
}


const LogsList = ({ item }: { item: WaterLog }) => (
    <View style={styles.logItem}>
        <View style={styles.logContent}>
            <Text style={styles.logDate}>{item.date}</Text>
            <Text style={styles.logTime}>{item.time}</Text>
        </View>
        <View style={styles.waterDrop}>
            <Text style={styles.waterDropText}>💧</Text>
        </View>
    </View>
);


const styles = StyleSheet.create({
      logItem: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: hp('2%'),
        marginBottom: hp('1.5%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
      },
      logContent: {
        flex: 1,
      },
      logDate: {
        fontSize: hp('2%'),
        color: '#2c3e50',
        fontFamily: 'Inter-SemiBold',
        marginBottom: hp('0.5%'),
      },
      logTime: {
        fontSize: hp('1.8%'),
        color: '#7f8c8d',
        fontFamily: 'Inter-Regular',
      },
      waterDrop: {
        backgroundColor: '#e6f7ff',
        width: hp('5%'),
        height: hp('5%'),
        borderRadius: hp('2.5%'),
        justifyContent: 'center',
        alignItems: 'center',
      },
      waterDropText: {
        fontSize: hp('2.5%'),
      },
})

export default LogsList;