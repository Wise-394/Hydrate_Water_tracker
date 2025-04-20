import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontAwesome6 } from '@expo/vector-icons';

interface WaterLog {
  id: number;
  date: string;
  time: string;
}

interface LogsListProps {
  item: WaterLog;
  visible: boolean;
  onPress: () => void;
}

const handleDeleteButton = (onPress: () => void) => {
  Alert.alert(
    "Delete log",
    "Are you sure you want to Delete this log?",
    [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: onPress, style: "destructive" }
    ]
  );
};

const LogsList = ({ item, visible, onPress }: LogsListProps) => (
  <View style={styles.logItem}>
    <View style={styles.waterDrop}>
      <FontAwesome6 name="glass-water" style={styles.waterDropIcon} size={hp('2.5%')} />
    </View>
    <View style={styles.logContent}>
      <Text style={styles.logTime}>{item.time}</Text>
    </View>
    {visible && (
      <Pressable onPress={() => handleDeleteButton(onPress)}>
        <FontAwesome6 name="trash" style={styles.trashIcon} size={hp('2.5%')} />
      </Pressable>
    )}
  </View>
);

const styles = StyleSheet.create({
  logItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: hp('2%'),
    marginVertical: hp('0.5%'),
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
    marginLeft: wp('2%'),
    flex: 1,
  },
  logTime: {
    fontSize: hp('1.8%'),
    color: '#2c3e50',
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
  waterDropIcon: {
    color: '#00aaff',
  },
  trashIcon: {
    color: '#4682b4',
  }
});

export default LogsList;
