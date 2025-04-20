import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

interface Props {
  text: string;
  onPress?: () => void;
  isLast?: boolean;
  icon: IconName;
}

const SettingsItem = ({ text, icon, onPress, isLast }: Props) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, isLast && styles.lastItem]}
    activeOpacity={0.7}
  >
    <View style={styles.itemContent}>
    <MaterialCommunityIcons name={icon} size={hp('3%')} color="#5498FF" style={styles.icon} />
      <Text style={styles.itemText}>{text}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('4.5%'),
    marginBottom: hp('1.5%'),
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  lastItem: {
    marginBottom: 0,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: wp('4%'),
  },
  itemText: {
    fontSize: hp('2%'),
    color: '#333',
    fontFamily: 'Inter-Medium',
  },
});

export default SettingsItem;
